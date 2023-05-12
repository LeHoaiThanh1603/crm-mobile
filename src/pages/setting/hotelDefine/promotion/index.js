import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import { buttonList } from '@/components/Button';
import { SearchOutlined } from '@ant-design/icons';
import { useFetch } from '@/components/Fetch/useFetch';
import PromotionModal from './promotionModal';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { notification } from '@/components/Notification';

const Promotion = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState({
    startDate: '',
    endDate: '',
    description: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('add');
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef();
  const intl = useIntl();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search name`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="d-flex align-items-center"
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
    render: (text) => {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      );
    },
  });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    let text = '';
    if (selectedKeys[0]) {
      text = selectedKeys[0];
    }
    setSearchText(text);
    const searchResult = data.filter((item) => {
      return item.startDate.toLowerCase().includes(text.toLowerCase());
    });
    setTableData(searchResult);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    setTableData(data);
    confirm();
  };

  const columns = [

    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.promotion.startDate',
      }),
      dataIndex: 'startDate',
      key: 'startDate',
      ...getColumnSearchProps('startDate'),
      render: (text) => <>{moment(text).format('YYYY-MM-DD')}</>
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.promotion.endDate',
      }),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => <>{moment(text).format('YYYY-MM-DD')}</>
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.promotion.description',
      }),
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.promotion.action',
      }),
      key: 'action',
      width: '10%',
      render: (record) => (
        <Popconfirm
          placement="topRight"
          title={intl.formatMessage({ id: 'pages.setting.hoteldefine.promotion.confirm' })}
          onConfirm={() => {
            handleDelete(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <buttonList.form.delete />
        </Popconfirm>
      ),
    },

  ];

  const updatePromotion = () => {
    useFetch(
      '/api/Defines/GetPromotion',
      'GET',
      'application/json',
      null,
      (res) => {
        setData(res);
        setTableData(res);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const handleDelete = (id) => {
    const formData = new FormData();
    formData.append('id', id);
    useFetch(
      '/api/Defines/DeletePromotion',
      'DELETE',
      null,
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          updatePromotion();
        } else if (res.success == 0) {
          notification.warning(
            intl.formatMessage({
              id: res.mess,
            }),
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    updatePromotion();
  }, []);

  return (
    <div className='promotion-container'>
      <PromotionModal
        visible={modalVisible}
        setVisible={setModalVisible}
        state={modalData}
        addOrUpdate={addOrUpdate}
        updateData={updatePromotion}
      />
      <div>
        <buttonList.add
          onClick={() => {
            setModalData({
              startDate: '',
              endDate: '',
              description: '',
            });
            setAddOrUpdate('add');
            setModalVisible(true);
          }}
        />
      </div>
      <Table
        scroll={{ x: 1500, y: 'calc(100vh - 360px)' }}
        rowKey='id'
        className="mt-3"
        columns={columns}
        dataSource={tableData}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'pointer';
            }, // mouse enter row
            onMouseLeave: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'auto';
            }, // mouse leave row
            onClick: (e) => {
              if (e.target.nodeName == 'TD') {
                setModalData({
                  id: record.id,
                  startDate: record.startDate,
                  endDate: record.endDate,
                  description: record.description ? record.description : '',
                });
                setAddOrUpdate('update');
                setModalVisible(true);
              }
            }, // click row
          };
        }}
      />
    </div>
  );
};

export default Promotion;
