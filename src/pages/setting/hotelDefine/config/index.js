import { useState, useEffect, useRef } from 'react';
import { buttonList } from '@/components/Button';
import { useIntl } from 'umi';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetch } from '@/components/Fetch/useFetch';
import ConfigModal from './configModal';
import Highlighter from 'react-highlight-words';

const Config = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState({
    name: '',
    value: '',
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
      return item.name.toLowerCase().includes(text.toLowerCase());
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
        id: 'pages.setting.hoteldefine.config.name',
      }),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.config.value',
      }),
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hoteldefine.config.description',
      }),
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const updateConfig = () => {
    useFetch(
      '/api/Defines/GetConfig',
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

  useEffect(() => {
    updateConfig();
  }, []);

  return (
    <>
      <ConfigModal
        visible={modalVisible}
        setVisible={setModalVisible}
        state={modalData}
        addOrUpdate={addOrUpdate}
        updateData={updateConfig}
      />
      <div>
        <buttonList.add
          onClick={() => {
            setModalData({
              name: '',
              value: '',
              description: '',
            });
            setAddOrUpdate('add');
            setModalVisible(true);
          }}
        />
      </div>
      <Table
        scroll={{ x: 1500, y: 'calc(100vh - 360px)' }}
        rowKey={(record) => record.name}
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
            onClick: (event) => {
              if (event.target.nodeName == 'TD') {
                setModalData({
                  name: record.name,
                  value: record.value,
                  description: record.description ? record.description : '',
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

export default Config;
