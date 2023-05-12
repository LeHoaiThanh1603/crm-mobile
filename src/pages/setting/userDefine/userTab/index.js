import React, { useRef, useEffect, useState } from 'react';
import { Table, Row, Col, Space, Button, Input, Popconfirm, message } from 'antd';
import { buttonList } from '@/components/Button';
import { useFetch } from '@/components/Fetch/useFetch';
import { SearchOutlined } from '@ant-design/icons';
import { notification } from '@/components/Notification';
import { useIntl, useModel } from 'umi';

import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import Highlighter from 'react-highlight-words';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import Popup from './popup';

export default function Users() {
  const [pagination, setPagination] = useState({ pageSize: 25 });
  const [edit, setEdit] = useState();
  const [showPopup, setshowPopup] = useState(false);
  const intl = useIntl();
  const [columnFilter, setColumnFilter] = useState([]);
  const { users, updateUsers } = useModel('userdata');

  const [addOrEdit, setAddOrEdit] = useState('add');
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [groupUsers, setGroupUser] = useState([]);
  const [searchUsername, setSearchUsername] = useState(null);
  const [searchFullName, setSearchFullName] = useState(null);

  const filterDataGroupUsers = (username, fullname) => {
    let data = [...users];

    if (username) {
      data = data.filter((x) =>
        x.username.toString().toLowerCase().includes(username.toString().toLowerCase()),
      );
    }

    if (fullname) {
      data = data.filter((x) =>
        x.fullName.toString().toLowerCase().includes(fullname.toString().toLowerCase()),
      );
    }

    let arr = [...new Set(data.map((item) => item.department))];

    let group = [];
    arr.forEach((department) => {
      let children = data.filter((x) => x.department == department);

      children.forEach((item) => {
        item.key = item.username;
      });

      group.push({
        key: department,
        department: department,
        children: children,
      });
    });

    if ((username || fullname) && group.length > 0) {
      setExpandedRowKeys([group[0].key]);
    }

    setGroupUser(group);
  };

  useEffect(() => {
    filterDataGroupUsers();
  }, [users]);

  const deleteProduct = (id) => {
    const formData = new FormData();
    formData.append('username', id);
    useFetch(
      '/api/User/DeleteUser',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          getProduct();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'pages.setting.userdefine.users.username' }),
      dataIndex: 'username',
      key: 'username',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters = true }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search here"
            style={{ height: 30, marginBottom: 8, display: 'block' }}
            value={searchUsername}
            onChange={(e) => {
              setSearchUsername(e.target.value);
            }}
            onPressEnter={() => {
              confirm();
              filterDataGroupUsers(searchUsername, searchFullName);
            }}
          />
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 140, height: 30 }}
              onClick={() => {
                confirm();
                filterDataGroupUsers(searchUsername, searchFullName);
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSearchUsername(null);
                confirm();
                filterDataGroupUsers(null, searchFullName);
              }}
              size="small"
              style={{ width: 100, height: 30 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => <SearchOutlined style={{ color: searchUsername ? '#1890ff' : '' }} />,
      render: (text, record) =>
        record.username ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchUsername]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          <>{department.find((item) => item.ma == record.department)?.boPhan}</>
        ),
    },

    {
      title: intl.formatMessage({ id: 'pages.setting.userdefine.users.fullName' }),
      dataIndex: 'fullName',
      key: 'fullName',
    },

    {
      title: intl.formatMessage({ id: 'pages.setting.userdefine.users.role' }),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.userdefine.users.isDelete' }),
      dataIndex: 'isDelete',
      render: (value, record) => (record.username ? <Switch value={value} readOnly={true} /> : ''),
      key: 'isDelete',
    },
  ];

  const showUpdate = (record) => {
    setAddOrEdit('edit');

    setData({
      username: record.username,
      password: '',
      fullName: record.fullName,
      email: record.email,
      cellPhone: record.cellPhone,
      department: record.department,
      role: record.role,
      changeShift: record.changeShift,
      isLock: record.isLock,
    });

    setshowPopup(!showPopup);
  };

  return (
    <div>
      <Popup
        showPopup={showPopup}
        addOrEdit={addOrEdit}
        state={edit}
        onClose={() => setshowPopup(!showPopup)}
      />

      <Row>
        <Col span={24} className="mb-3 d-flex justify-content-between">
          <buttonList.add
            onClick={() => {
              setAddOrEdit('add');
              setshowPopup(!showPopup);
            }}
          />
          <FilterColumn
            id="pages.setting.userdefine.users.tableusers"
            onFilter={setColumnFilter}
            column={columns}
          ></FilterColumn>
        </Col>
        <Col span={24}>
          <Table
            scroll={{ y: 'calc(100vh - 360px)' }}
            columns={Filter(columns, columnFilter)}
            dataSource={users}
            rowKey={(record) => record.username}
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
                    setEdit(record);
                    setshowPopup(true);
                    setAddOrEdit('edit');
                    close();
                  }
                }, // click row
              };
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
