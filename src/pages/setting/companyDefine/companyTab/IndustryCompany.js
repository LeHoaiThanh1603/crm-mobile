import React, { useRef, useEffect, useState } from 'react';
import { Table, Row, Col, Space, Button, Input, Popconfirm, message } from 'antd';
import '../companyDefine.less';
import { buttonList } from '@/components/Button';
import { useFetch } from '@/components/Fetch/useFetch';
import { SearchOutlined } from '@ant-design/icons';
import Modal from '@/components/Popup';
import { notification } from '@/components/Notification';
import { input } from '@/components/Input';
import { useIntl, useModel } from 'umi';
import { select } from '@/components/Select';
import { label } from '@/components/Label';
import Popup from './popup/BranchPopup';
import Highlighter from 'react-highlight-words';

export default function () {
  const { companyIndustry, setCompanyIndustry } = useModel('companydata');
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchTen, setSearchTen] = useState(null);
  const [searchTenNganh, setSearchTenNganh] = useState(null);
  const intl = useIntl();
  const filterDataGroupIndustry = (ten, tenNganh) => {
    if ((ten || tenNganh) && companyIndustry.length > 0) {
      setExpandedRowKeys([companyIndustry[0].code]);
    }
  };

  useEffect(() => {
    filterDataGroupIndustry();
  }, [companyIndustry]);
  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.industry',
      }),
      key: 'tenNganh',
      render: (record) => (record.children ? record.ten : record.tenNganh),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters = true }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search here"
            style={{ height: 30, marginBottom: 8, display: 'block' }}
            value={searchTenNganh}
            onChange={(e) => {
              setSearchTenNganh(e.target.value);
            }}
            onPressEnter={() => {
              confirm();
              filterDataGroupIndustry(searchTen, searchTenNganh);
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
                filterDataGroupIndustry(searchTen, searchTenNganh);
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                setSearchTenNganh(null);
                confirm();
                filterDataGroupIndustry(searchTen, null);
              }}
              size="small"
              style={{ width: 100, height: 30 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => <SearchOutlined style={{ color: searchTenNganh ? '#1890ff' : '' }} />,
      render: (text, record) => (
        <Highlighter
          style={{ cursor: 'auto' }}
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchTenNganh]}
          autoEscape
          textToHighlight={record.children ? record.ten : record.tenNganh}
        />
      ),
    },
  ];
  const [pagination, setPagination] = useState({ current: 1, pageSize: 25 });

  const handleShowUpdate = (record) => {
    console.log('updata');
  };
  return (
    <Row className="industry-company-container" gutter={[16, 16]}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 19 }}
        xl={{ span: 17 }}
        xxl={{ span: 15 }}
      >
        <Table
          dataSource={companyIndustry}
          rowKey={(record) => (record.children != null ? record.code : record.ma)}
          columns={columns}
          pagination={pagination}
          scroll={{ y: 'calc(100vh - 320px)' }}
          onRow={(record) => {
            return {
              onClick: (e) => {
                if (e.target.nodeName == 'TD') {
                  if (record.tenNganh) handleShowUpdate(record);
                  else {
                    let index = expandedRowKeys.indexOf(record.code);
                    if (index == -1) {
                      setExpandedRowKeys([...expandedRowKeys, record.code]);
                    } else {
                      let expand = [...expandedRowKeys];
                      expand.splice(index, 1);
                      setExpandedRowKeys(expand);
                    }
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
          onExpand={(expandedRows) => {
            setExpandedRowKeys(expandedRows);
          }}
        />
      </Col>
    </Row>
  );
}
