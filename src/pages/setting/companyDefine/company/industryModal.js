import Modal from '@/components/Popup';
import { Table, Input, Space, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useIntl, useModel } from 'umi';

import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const IndustryModal = ({ isModalVisible, setIsModalVisible, onOK, industryValueProps }) => {
  const intl = useIntl();
  const { companyIndustry } = useModel('companydata');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [dataIndustry, setDataIndustry] = useState([]);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef();

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const filterDataIndustry = (industryName) => {
    let data = [...companyIndustry];

    if (industryName) {
      data = [];
      companyIndustry.forEach((item) => {
        data.push({
          ...item,
          children: item.children.filter((childrenItem) =>
            childrenItem.tenNganh.toLowerCase().includes(industryName.toLowerCase()),
          ),
        });
      });
      data = data.filter((item) => item.children.length !== 0);
    }

    let group = [];

    data.forEach((item) => {
      group.push({
        key: item.code,
        industry: item.ten,
        children: item.children.map((childrenItem) => {
          return {
            key: childrenItem.ma,
            ...childrenItem,
          };
        }),
      });
    });

    if (industryName && group.length > 0) {
      setExpandedRowKeys([group[0].key]);
    }

    setDataIndustry(group);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    checkStrictly: false,
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, zIndex: '10000' }}>
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
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    filterDataIndustry(selectedKeys[0]);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
    filterDataIndustry(null);
    setExpandedRowKeys([]);
  };

  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.industry',
      }),
      dataIndex: 'tenNganh',
      key: 'tenNganh',
      render: (text, record) =>
        record.ma ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          <>{companyIndustry.find((item) => item.code == record.key)?.ten}</>
        ),
      ...getColumnSearchProps('tenNganh'),
    },
  ];

  // useEffect(() => {
  //   filterDataIndustry(null);
  // }, []);

  useEffect(() => {
    if (industryValueProps?.split(',')[0] === '' || !industryValueProps) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(industryValueProps?.split(',').map((item) => parseInt(item)));
    }
  }, [industryValueProps]);

  useEffect(() => {
    setExpandedRowKeys([]);
    filterDataIndustry(null);
  }, [isModalVisible]);

  return (
    <Modal
      onOK={() => {
        const industryValue = selectedRowKeys
          .filter((item) => {
            return typeof item === 'number';
          })
          .join(', ');
        onOK(industryValue);
      }}
      size={'xxl'}
      visible={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
      }}
      title={intl.formatMessage({
        id: 'pages.setting.companydefine.company.industry',
      })}
    >
      <Table
        style={{ minHeight: '70vh' }}
        scroll={{ y: '60vh' }}
        columns={columns}
        dataSource={dataIndustry}
        pagination={{ pageSize: 12 }}
        rowSelection={rowSelection}
        onRow={(record) => {
          return {
            onClick: (e) => {
              if (e.target.nodeName == 'TD') {
                let index = expandedRowKeys.indexOf(record.key);
                if (index == -1) {
                  setExpandedRowKeys([...expandedRowKeys, record.key]);
                } else {
                  let expand = [...expandedRowKeys];
                  expand.splice(index, 1);
                  setExpandedRowKeys(expand);
                }
              }
            },
            onMouseEnter: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'pointer';
            }, // mouse enter row
            onMouseLeave: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'auto';
            }, // mouse leave row
          };
        }}
        expandedRowKeys={expandedRowKeys}
        onExpandedRowsChange={(expandedRows) => {
          setExpandedRowKeys(expandedRows);
        }}
      />
    </Modal>
  );
};

export default IndustryModal;
