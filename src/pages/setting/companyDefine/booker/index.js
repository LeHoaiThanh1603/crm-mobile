import React, { useState, useRef, useEffect } from 'react';
import './booker.less';
import { notification } from '@/components/Notification';
import { buttonList } from '@/components/Button';
import { Table, Row, Col, Space, Button, Input, Popconfirm, message } from 'antd';
import { useIntl, useModel } from 'umi';
import { useFetch } from '@/components/Fetch/useFetch';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { BookerAdd } from './addBooker';
import { FilterColumn, Filter } from '@/components/FilterColumn';

function Booker() {
  const [dataEdit, SetDataEdit] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  });
  const { updateBooker } = useModel('companydata');
  const [pagination, setPagination] = useState({ pageSize: 25 });
  const [columnFilter, setColumnFilter] = useState([]);
  const [showPopup, setshowPopup] = useState(false);
  const intl = useIntl();
  const [filter, setFilter] = useState();
  const [data, setData] = useState();

  const delDataEdit = () => {
    SetDataEdit({
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      note: '',
    });
  };

  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 6, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: '' });
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.id' }),
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.name' }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },

    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.phone' }),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.address' }),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.booker.note' }),
      dataIndex: 'note',
      key: 'note',
    },

    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Popconfirm
          placement="topRight"
          title={intl.formatMessage({ id: 'pages.setting.hotelService.confirm' })}
          onConfirm={() => delData(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <buttonList.form.delete />
        </Popconfirm>
      ),
    },
  ];
  const getData = () => {
    useFetch(
      '/api/Company/GetBooker',
      'GET',
      'application/json',
      null,
      (res) => {
        setData(res);
      },
      (error) => console.log(error),
    );
  };

  const delData = (item) => {
    const formData = new FormData();
    formData.append('id', item);
    useFetch(
      '/api/Company/DeleteBooker',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({ id: 'pages.setting.hotelService.deleteService' }),
          );
          getData();
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }));
        }
      },
      (error) => console.log(error),
    );
  };
  const close = () => {
    setshowPopup(!showPopup);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="hotelService-container">
      <BookerAdd
        dataEdit={dataEdit}
        updateData={getData}
        delDataEdit={delDataEdit}
        visible={showPopup}
        close={close}
      ></BookerAdd>
      <div className="group-bt d-flex justify-content-between" style={{ marginBottom: '16px' }}>
        <buttonList.add onClick={close}></buttonList.add>
        <FilterColumn
          id="pages.setting.companydefine.bookertable"
          onFilter={(data) => {
            setColumnFilter(data);
          }}
          column={columns}
        ></FilterColumn>
      </div>
      <Table
        columns={Filter(columns, columnFilter)}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          pageSize: 25,
        }}
        scroll={{ y: 'calc(100vh - 360px)' }}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'pointer';
            }, // mouse enter row
            onMouseLeave: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'auto';
            }, // mouse leave row
            onClick: (event) => {
              if (event.target.nodeName == 'TD') {
                SetDataEdit(record);
                close();
              }
            }, // click row
          };
        }}
      />
    </div>
  );
}

export { Booker };
