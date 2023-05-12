import { SearchOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { Input, List, message, Popconfirm, Space, Table } from 'antd';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useIntl } from 'umi';
import '../ViewGroups/index';

import { deleteGroup, getListGroups } from '@/untils/request';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const { default: AddGroups } = require('../addGroups/index');
const { ContextProvider } = require('../context/ContextProvider');

const { default: ViewGroups } = require('../ViewGroups/index');
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

function ListGroups() {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOkMethod = () => {
    setIsModalOpen(false);
    setA(true);
  };
  const handleCancelMethod = () => {
    setIsModalOpen(false);
  };
  //=================lấy data===========
  const [data, setData] = useState([]);
  useEffect(() => {
    getListGroups().then((res) => setData(res.data));
  }, []);
  const dataTable = data.map((item, i) => {
    return {
      id: item.id,
      groupName: item.groupName,
      groupDescription: item.groupDescription,
    };
  });

  //=================lấy data===========

  //==============View Group============
  const [openView, setOpenView] = useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = (e, item) => {
    console.log(item.id);
    setId(item.id);
    setOpenView(true);
  };
  //==============/View Group============
  const onDeleteGroup = async (e, item) => {
    e.stopPropagation(); // stop propagation to prevent triggering onClick for parent elements
    try {
      await deleteGroup(item.id);
      setData(data.filter((group) => group.id !== item.id));
    } catch (error) {
      console.error(error);
    }
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [open, setOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        setOpenView(false);
        resolve(null);
        success;
      }, 3000);
    });
  // ===========color row table===========
  const rowClassName = (record, rowIndex) => {
    if (rowIndex % 2 === 0) {
      return 'row-even';
    }
    return 'row-odd';
  };
  // ===========/color row table===========
  const [showList, setShowList] = useState(true);
  if (!showList) {
    return null;
  }

  //=================Thêm nhóm==========
  const [showAddGroups, setShowAddGroups] = useState(false);
  const handleShowAddGroups = () => {
    setShowAddGroups(!showAddGroups);
  };
  const handleBackList = () => {
    setOpenView(false);
    console.log(openView);
  };
  //=================Thêm nhóm==========
  return (
    <div>
      {openView ? (
        <div>
          <ViewGroups id={id} />
          <Button variant="contained" onClick={handleBackList} style={{ marginLeft: '0px' }}>
            {intl.formatMessage({ id: 'pages.setting.groups.btnBack' })}
          </Button>
        </div>
      ) : (
        <>
          {showAddGroups ? (
            <AddGroups handleShowAddGroups={handleShowAddGroups} />
          ) : (
            <div style={{ marginTop: '35px' }}>
              <button
                className="btnCreate"
                onClick={handleShowAddGroups}
                style={{
                  position: 'fixed',
                  zIndex: '700',
                  marginLeft: '264px',
                  marginTop: '-50px',
                }}
              >
                {intl.formatMessage({ id: 'pages.setting.groups.btnAddGroup' })}
              </button>
              <List
                style={{ width: '420px', marginLeft: '-40px',marginTop: "170px" }}
                dataSource={dataTable}
                renderItem={(item) => (
                  <List.Item
                    className="item"
                    actions={[
                      <div style={{ display: 'flex',marginLeft: "234%",marginTop: "8px" }}>
                        <button
                          className="btnCreate"
                          onClick={(e) => {
                            handleClickOpen(e, item);
                            setOpenView(true);
                          }}
                        >
                          Xem
                        </button>
                        <button className="btnCreate" style={{marginLeft: "10px"}}>
                          <Popconfirm
                            placement="left"
                            title={`Bạn có chắc chắn muốn xóa nhóm?`}
                            onConfirm={(e) => onDeleteGroup(e, item)}
                            okText="Có"
                            cancelText="Không"
                          >
                            Xóa
                          </Popconfirm>
                        </button>
                      </div>,
                    ]}
                    style={{ boxShadow: '2px 2px 5px #ccc', marginBottom: '10px',display: "block",height: "140px"}}
                  >
                    <div style={{ marginLeft: '10px' }}>
                      <p>Tên nhóm: {item.groupName}</p>
                      <p>Mô tả: {item.groupDescription}</p>
                    </div>
                    <div style={{ width: "100%",height: "1px",borderBottom: "1px solid #c7c2c2"}}></div>
                  </List.Item>
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListGroups;
