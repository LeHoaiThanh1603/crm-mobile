import React, { useState, useRef, useEffect } from 'react';
import './guestList.less';
import { notification } from '@/components/Notification';
import { buttonList } from '@/components/Button';
import { Table, Row, Col, Space, Button, Input, Popconfirm, Select } from 'antd';
import { Switch } from '@/components/Switch';
import { AddGuest } from './addGuest';
import { useIntl, useModel } from 'umi';
import { useFetch } from '@/components/Fetch/useFetch';
import { Deposit } from '@/pages/booking/deposit';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { UploadFile } from './uploadFile/index';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import moment from 'moment';

function GuestList() {
  const [addOrEdit, setAddOrEdit] = useState('add');
  const [dataEdit, setDataEdit] = useState({
    id: 0
  });
  const [pagination, setPagination] = useState({ pageSize: 25 });
  const [columnFilter, setColumnFilter] = useState([]);
  const [showPopup, setshowPopup] = useState(false);
  const intl = useIntl();
  const inputRef = useRef();
  const [filter, setFilter] = useState();
  const [data, setData] = useState();
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

  const openModal = (action) => {
    setAddOrEdit(action);
    setVisible(true);
  }

  const sendZalo = (maKhach) => {
    const formData = new FormData();
    formData.append('id', maKhach);
    formData.append('action', '');
    useFetch(
      '/api/CRM/SendZaloByGuestId',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  const sendEmail = (maKhach) => {
    const formData = new FormData();
    formData.append('id', maKhach);
    formData.append('action', '');
    useFetch(
      '/api/CRM/SendEmailByGuestId',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  const sendSMS = (maKhach) => {
    const formData = new FormData();
    formData.append('id', maKhach);
    formData.append('action', 'birthday');
    useFetch(
      '/api/CRM/SendSMSByGuestId',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }
  const columns = [
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.madangky' }),
      dataIndex: 'maDangKy',
      key: 'maDangKy',
      ...getColumnSearchProps('maDangKy'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.danhxung' }),
      dataIndex: 'danhXung',
      key: 'danhXung',
      ...getColumnSearchProps('danhXung'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.tenkhach' }),
      dataIndex: 'ten',
      key: 'ten',
      ...getColumnSearchProps('ten'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.tendangky' }),
      dataIndex: 'tenDangKy',
      key: 'tenDangKy',
      ...getColumnSearchProps('tenDangKy'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.ngayden' }),
      dataIndex: 'ngayDen',
      key: 'ngayDen',
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.ngaydi' }),
      dataIndex: 'ngayDi',
      key: 'ngayDi',
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.birthday' }),
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.dienthoai' }),
      dataIndex: 'dienThoai',
      key: 'dienThoai',
      ...getColumnSearchProps('dienThoai'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.email' }),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.address' }),
      dataIndex: 'diaChi',
      key: 'diaChi',
      ...getColumnSearchProps('diaChi'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.congty' }),
      dataIndex: 'tenCongTy',
      key: 'tenCongTy',
      ...getColumnSearchProps('tenCongTy'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.sourcecode' }),
      dataIndex: 'sourceCodeName',
      key: 'sourceCodeName',
      ...getColumnSearchProps('sourceCodeName'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.marketsegment' }),
      dataIndex: 'marketSegmentName',
      key: 'marketSegmentName',
      ...getColumnSearchProps('marketSegmentName'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.type' }),
      dataIndex: 'tenLoai',
      key: 'tenLoai',
      ...getColumnSearchProps('tenLoai'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.guestlist.branch' }),
      dataIndex: 'branchName',
      key: 'branchName',
      ...getColumnSearchProps('branchName'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Popconfirm
          placement="topRight"
          title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm' })}
          onConfirm={() => delData(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <buttonList.form.delete />
        </Popconfirm>
      ),
    },
    {
      title: 'Send',
      key: 'Send',
      fixed: 'right',
      render: (record) => (

        <Space wrap>
          <Select
            defaultValue="Channel"
            style={{
              width: 120,
            }}
            dropdownRender={() =>
              <>
                <Popconfirm
                  placement="topRight"
                  title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendemail' })}
                  onConfirm={() => sendEmail(record.maKhach)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className='itemSelectChannelSend'>
                    {intl.formatMessage({
                      id: 'pages.setting.guestlist.sendemail',
                    })}
                  </div>
                </Popconfirm>
                <Popconfirm
                  placement="topRight"
                  title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendzalo' })}
                  onConfirm={() => sendZalo(record.maKhach)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className='itemSelectChannelSend'>
                    {intl.formatMessage({
                      id: 'pages.setting.guestlist.sendzalo',
                    })}
                  </div>
                </Popconfirm>
                <Popconfirm
                  placement="topRight"
                  title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendsms' })}
                  onConfirm={() => sendSMS(record.maKhach)}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className='itemSelectChannelSend'>
                    {intl.formatMessage({
                      id: 'pages.setting.guestlist.sendsms',
                    })}
                  </div>
                </Popconfirm>
              </>
            }
          />
        </Space>
        // <>
        //   <Popconfirm
        //     placement="topRight"
        //     title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendemail' })}
        //     onConfirm={() => sendEmail(record.maKhach)}
        //     okText="Yes"
        //     cancelText="No"
        //   >
        //     <buttonList.normal
        //       title={intl.formatMessage({
        //         id: 'pages.setting.guestlist.sendemail',
        //       })}
        //     />
        //   </Popconfirm>
        //   <Popconfirm
        //     placement="topRight"
        //     title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendzalo' })}
        //     onConfirm={() => sendZalo(record.maKhach)}
        //     okText="Yes"
        //     cancelText="No"
        //   >
        //     <buttonList.normal
        //       title={intl.formatMessage({
        //         id: 'pages.setting.guestlist.sendzalo',
        //       })}
        //     />
        //   </Popconfirm>
        //   <Popconfirm
        //     placement="topRight"
        //     title={intl.formatMessage({ id: 'pages.setting.guestlist.confirm.sendsms' })}
        //     onConfirm={() => sendSMS(record.maKhach)}
        //     okText="Yes"
        //     cancelText="No"
        //   >
        //     <buttonList.normal
        //       title={intl.formatMessage({
        //         id: 'pages.setting.guestlist.sendsms',
        //       })}
        //     />
        //   </Popconfirm>
        // </>
      ),
    },
  ];

  const delData = (item) => {
    const formData = new FormData();
    formData.append('id', item);
    useFetch(
      '/api/Guest/Delete',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          getData();
          notification.success(
            intl.formatMessage({ id: res.mess }),
          );
        } else if (res.success == 0) {
          notification.error(
            intl.formatMessage({ id: res.mess })
          )
        }
      },
      (error) => console.log(error),
    );
  };
  const [upload, setUpload] = useState(false);
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
  };

  const getData = () => {
    useFetch(
      '/api/Guest/GetGuest',
      'GET',
      'application/json',
      null,
      (res) => {
        setData(res);
      },
      (error) => console.log(error),
    );
  };

  const onDeleteAllChannelList = () => {
    useFetch(
      '/api/Guest/DeleteAll',
      'DELETE',
      'application/json',
      null,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          getData();
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
    getData();
  }, []);

  return (
    <div className="hotelService-container">
      <UploadFile
        visible={upload}
        updateData={getData}
        close={() => {
          setUpload(false);
        }}
      ></UploadFile>
      <AddGuest
        addOrEdit={addOrEdit}
        updateData={getData}
        dataEdit={dataEdit}
        visible={visible}
        close={close}
      />
      <div className="group-bt d-flex justify-content-between" style={{ marginBottom: '16px' }}>
        <div className="d-flex" style={{ flexDirection: 'row', gap: '10px' }}>
          <buttonList.add onClick={() => { openModal('add') }}></buttonList.add>
          <buttonList.normal
            title={intl.formatMessage({
              id: 'pages.setting.guestlist.importfile',
            })}
            onClick={() => {
              setUpload(true);
            }}
          ></buttonList.normal>
          <Popconfirm
            title={intl.formatMessage({ id: 'pages.setting.guestlist.deleteall.confirm' })}
            onConfirm={() => onDeleteAllChannelList()}
            okText="Yes"
            cancelText="No"
          >
            <buttonList.delete
              className="delete-all-btn"
              title={intl.formatMessage({
                id: 'pages.setting.channellist.deleteall',
              })}
            />
          </Popconfirm>
        </div>
        <FilterColumn
          id="pages.setting.guestlist.table"
          onFilter={(data) => {
            setColumnFilter(data);
          }}
          column={columns}
        ></FilterColumn>
      </div>
      <Table
        scroll={{ x: 1500, y: 'calc(100vh - 360px)' }}
        columns={Filter(columns, columnFilter)}
        dataSource={data}
        rowKey={(record) => record.maKhach}
        pagination={{
          pageSize: 25,
        }}
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
                setDataEdit(record);
                openModal('edit');
              }
            }, // click row
          };
        }}
      />
    </div>
  );
}

export { GuestList };
