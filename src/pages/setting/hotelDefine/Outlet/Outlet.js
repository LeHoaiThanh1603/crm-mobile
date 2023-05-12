import React, { useEffect, useState, useRef } from 'react';
import { Table, Row, Col, Space, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import OutletPopup from './popup/OutletPopup';

export default function Outlet() {
  const { outlet, department, service } = useModel('hoteldata');
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
        id: 'pages.setting.hotelDefine.outlet.id',
      }),
      dataIndex: 'olMaSo',
      key: 'olMaSo',
      ...columnSearch('olMaSo'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelDefine.outlet.name',
      }),
      dataIndex: 'olTen',
      key: 'olTen',
      ...columnSearch('olTen'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelDefine.outlet.department',
      }),
      dataIndex: 'olBoPhan',
      key: 'olBoPhan',
      render: (record) => {
        const value = department.find((item) => item.ma == record)?.boPhan;
        return value;
      },
      ...columnSearch('olBoPhan'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelDefine.outlet.services',
      }),
      dataIndex: 'olDichVu',
      key: 'olDichVu',
      render: (record) => {
        const value = service.find((item) => item.ma == record)?.dichVu;
        return value;
      },
      ...columnSearch('olDichVu'),
    },
    // {
    //   title: intl.formatMessage({
    //     id: 'pages.setting.companydefine.tableaction',
    //   }),
    //   dataIndex: '',
    //   key: 'action',
    //   render: (record) => (
    //     <Popconfirm
    //       placement="leftTop"
    //       title={intl.formatMessage({ id: 'pages.setting.hotelDefine.outlet.confirmdelete' })}
    //       okText={intl.formatMessage({ id: 'pages.setting.hotelDefine.outlet.yes' })}
    //       cancelText={intl.formatMessage({ id: 'pages.setting.hotelDefine.outlet.no' })}
    //       onConfirm={() => {
    //         deleteBranch(record.ma);
    //       }}
    //     >
    //       <buttonList.form.delete />
    //     </Popconfirm>
    //   ),
    // },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
  });
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('');
  const [recordUpdate, setRecordUpdate] = useState({
    olMaSo: '',
    olTen: '',
    olBoPhan: '',
    olDichVu: '',
  });

  const handleShowAddOutlet = () => {
    setAddOrUpdate('add');
    setIsShowModal(true);
  };
  const handleShowUpdateOutlet = () => {
    setAddOrUpdate('update');
    setIsShowModal(true);
  };
  return (
    <Row className="outlet-container" gutter={[16, 16]}>
      <OutletPopup
        isShowModal={isShowModal}
        addOrUpdate={addOrUpdate}
        setIsShowModal={setIsShowModal}
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
        <buttonList.add onClick={handleShowAddOutlet} />
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
          className="outlet-table"
          columns={columns}
          pagination={pagination}
          loading={loading}
          dataSource={outlet}
          rowKey={(record) => record.olMaSo}
          //   onChange={handleTableChange}
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
                  setRecordUpdate({
                    olMaSo: record.olMaSo,
                    olTen: record.olTen,
                    olBoPhan: record.olBoPhan,
                    olDichVu: record.olDichVu,
                  });
                  handleShowUpdateOutlet();
                }
              }, // click row
            };
          }}
        />
      </Col>
    </Row>
  );
}
