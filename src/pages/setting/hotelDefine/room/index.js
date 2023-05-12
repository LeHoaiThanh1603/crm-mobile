import { useState, useEffect, useRef } from 'react';
import { buttonList } from '@/components/Button';
import { useIntl } from 'umi';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetch } from '@/components/Fetch/useFetch';
import RoomModal from './roomModal';
import Highlighter from 'react-highlight-words';
import { notification } from '@/components/Notification';
import { FilterColumn, Filter } from '@/components/FilterColumn';

const Room = () => {
  const [columnFilter, setColumnFilter] = useState([]);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modalData, setModalData] = useState({
    room: '',
    tiviCode: '',
    passWifi: '',
    xaxes: '',
    yaxes: '',
    tenTang: '',
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
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="d-flex align-items-center"
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    let text = '';
    if (selectedKeys[0]) {
      text = selectedKeys[0];
    }
    setSearchText(text);
    setSearchedColumn(dataIndex);
    const searchResult = data.filter((item) => {
      return item[dataIndex] && item[dataIndex].toLowerCase().includes(text.toLowerCase());
    });
    setTableData(searchResult);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    setTableData(data);
    confirm();
  };

  const updateRoom = () => {
    useFetch(
      '/api/Defines/GetRoomHotel',
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
      '/api/Defines/DeleteRoomHotel',
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
          updateRoom();
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

  const handleSyncData = () => {
    useFetch(
      '/api/Defines/SyncRoomFromHotel',
      'GET',
      'application/json',
      null,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          updateRoom();
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

  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.room',
      }),
      dataIndex: 'room',
      key: 'room',
      width: '10%',
      ...getColumnSearchProps('room'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.tvcode',
      }),
      dataIndex: 'tiviCode',
      key: 'tiviCode',
      ...getColumnSearchProps('tiviCode'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.passwifi',
      }),
      dataIndex: 'passWifi',
      key: 'passWifi',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.xaxes',
      }),
      dataIndex: 'xaxes',
      key: 'xaxes',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.yaxes',
      }),
      dataIndex: 'yaxes',
      key: 'yaxes',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.floorname',
      }),
      dataIndex: 'tenTang',
      key: 'tenTang',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.room.action',
      }),
      key: 'action',
      width: '10%',
      render: (record) => (
        <Popconfirm
          placement="topRight"
          title={intl.formatMessage({ id: 'pages.setting.hoteldefine.room.confirm' })}
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

  useEffect(() => {
    updateRoom();
  }, []);

  return (
    <>
      <RoomModal
        visible={modalVisible}
        setVisible={setModalVisible}
        state={modalData}
        addOrUpdate={addOrUpdate}
        updateData={updateRoom}
      />
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center" style={{ gap: '10px' }}>
          <buttonList.add
            onClick={() => {
              setModalData({
                room: '',
                tiviCode: '',
                passWifi: '',
                xaxes: '',
                yaxes: '',
                tenTang: '',
              });
              setAddOrUpdate('add');
              setModalVisible(true);
            }}
          />
          <Popconfirm
            placement="topRight"
            title={intl.formatMessage({ id: 'pages.setting.hoteldefine.room.confirmsyncdata' })}
            onConfirm={() => {
              handleSyncData();
            }}
            okText="Yes"
            cancelText="No"
          >
            <buttonList.normal
              title={intl.formatMessage({
                id: 'pages.setting.hoteldefine.room.syncdata',
              })}
            />
          </Popconfirm>
        </div>

        <FilterColumn
          id="pages.setting.hoteldefine.room.filtercolumn"
          onFilter={setColumnFilter}
          column={columns}
        ></FilterColumn>
      </div>
      <Table
        scroll={{ x: 1500, y: 'calc(100vh - 360px)' }}
        rowKey={(record) => record.id}
        className="mt-3"
        columns={Filter(columns, columnFilter)}
        dataSource={tableData}
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
                setModalData({
                  id: record.id,
                  room: record.room,
                  tiviCode: record.tiviCode ?? '',
                  passWifi: record.passWifi ?? '',
                  xaxes: record.xaxes ?? '',
                  yaxes: record.yaxes ?? '',
                  tenTang: record.tenTang ?? '',
                });
                setAddOrUpdate('update');
                setModalVisible(true);
              }
            }, // click row
          };
        }}
      />
    </>
  );
};

export default Room;
