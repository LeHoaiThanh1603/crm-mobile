import React, { useRef, useEffect, useState } from 'react';
import { Table, Row, Col, Space, Button, Input, Popconfirm, message } from 'antd';
import '../companyDefine.less';
import { buttonList } from '@/components/Button';
import { useFetch } from '@/components/Fetch/useFetch';
import { SearchOutlined } from '@ant-design/icons';
import { notification } from '@/components/Notification';
import { useIntl, useModel } from 'umi';
import MarketSegmentPopup from './popup/MarketSegmentPopup';

const MarketSegment = () => {
  const { margetSegment, updateMarketSegment } = useModel('companydata');
  const intl = useIntl();
  const columnSearch = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters = true }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search here"
          style={{ height: 30, marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 140, height: 30 }}
            onClick={() => confirm()}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters(clearFilters)}
            size="small"
            style={{ width: 100, height: 30 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });
  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.tableid',
      }),
      dataIndex: 'ma',
      key: 'ma',
      ...columnSearch('ma'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.tablename',
      }),
      dataIndex: 'marketSegment',
      key: 'marketSegment',
      ...columnSearch('marketSegment'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.tableaction',
      }),
      dataIndex: '',
      key: 'action',
      render: (record) => (
        <Popconfirm
          placement="leftTop"
          title={intl.formatMessage({ id: 'pages.setting.companydefine.confirmdelete' })}
          okText={intl.formatMessage({ id: 'pages.setting.companydefine.yes' })}
          cancelText={intl.formatMessage({ id: 'pages.setting.companydefine.no' })}
          onConfirm={() => {
            deleteMarketSegment(record.ma);
          }}
        >
          <buttonList.form.delete />
        </Popconfirm>
      ),
    },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
  });
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('');
  const [recordUpdate, setRecordUpdate] = useState({ ma: 0, marketSegment: '' });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({ ...pagination, total: margetSegment.length });
    updateMarketSegment();
  };
  const handleShowPopup = () => {
    setIsShowModal(true);
  };

  const showAddMarketSegment = () => {
    setAddOrUpdate('add');
    handleShowPopup();
  };

  const showUpdateMarketSegment = () => {
    setAddOrUpdate('update');
    handleShowPopup();
  };

  const deleteMarketSegment = (idDelete) => {
    const formData = new FormData();
    formData.append('id', idDelete);
    useFetch(
      '/api/Company/DeleteMarketSegment',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
          updateMarketSegment();
          setPagination({ ...pagination, total: margetSegment.length - 1 });
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  return (
    <Row className="market-segment-container" gutter={[16, 16]}>
      <MarketSegmentPopup
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        addOrUpdate={addOrUpdate}
        updateMarketSegment={updateMarketSegment}
        recordUpdate={recordUpdate}
      />
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 24 }}
        xxl={{ span: 24 }}
      >
        <buttonList.add className="btn-add" onClick={showAddMarketSegment} />
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 15 }}
        xxl={{ span: 15 }}
      >
        <Table
          className="company-table"
          columns={columns}
          pagination={pagination}
          loading={loading}
          dataSource={margetSegment}
          rowKey={(record) => record.ma}
          onChange={handleTableChange}
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
                  setRecordUpdate({ ma: record.ma, marketSegment: record.marketSegment });
                  showUpdateMarketSegment();
                }
              }, // click row
            };
          }}
        />
      </Col>
    </Row>
  );
};

export default MarketSegment;
