import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Button,
  message,
  Input,
  Space,
  Table,
  Popconfirm,
  Modal,
  Radio,
  List,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { deleteAdCampaign, getListAdCampaign, getTemplateIncom } from '@/untils/request';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { TiThMenu } from 'react-icons/ti';
import './index.css';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import SidebarMenu from '../../../components/SidebarMenu/SidebarMenu';
import ViewCampaign from './ViewCampaign';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useIntl, useModel } from 'umi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const { default: AddCampaign } = require('./AddCampaign');

const AdsCampaign = () => {
  const [a, setA] = useState(false);
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [refectDel, setRefectDel] = useState(false);
  const handleClickHideSidebar = (e) => {
    console.log('click ', e);
  };

  useEffect(() => {
    getListAdCampaign().then((res) => {
      setData(res.data);
      setRefectDel(false);
    });
  }, [a, refectDel]);

  useEffect(() => {
    // getTemplateIncom(res => console.log(res.data))
    const element = document.querySelectorAll('.ant-table-row');
    element.forEach((item, i) => {
      if (i % 2 !== 0) {
        item.classList.add('custom');
      }
    });
  }, []);

  const dataTable = data.map((item, i) => {
    let statusText;
    switch (item.status) {
      case 0:
        statusText = 'Đang xử lý';
        break;
      case 1:
        statusText = 'Gửi thành công';
        break;
      case 2:
        statusText = 'Gửi thất bại';
        break;
      default:
        statusText = '';
    }
    return {
      campaignName: item.campaignName,
      groups: item.group,
      time: moment(item.sendTime).format('DD-MM-YYYY, HH:mm'),
      mode: item.template,
      status: statusText,
      id: item.id,
    };
  });

  const [openView, setOpenView] = React.useState(false);

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
  const [dataView, setDataView] = useState();
  const [style, setStyle] = useState(false);

  const handleHideSidebar = () => {
    setStyle(!style);
  };

  const handleCreate = () => {
    setA(true);
  };

  // ===========tab===========
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    setActiveTab('tab1');
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const onDeleteAdsCampaign = async (e, item) => {
    // console.log(item.id)
    e.stopPropagation(); // stop propagation to prevent triggering onClick for parent elements
    try {
      await deleteAdCampaign(item.id);
      setData(data.filter((AdsCampaign) => AdsCampaign.id !== item.id));
    } catch (error) {
      console.error(error);
    }
  };

  // ===========/tab===========

  return (
    <div className="tab-content">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={10} md={8} lg={6} xxl={4} className="MenuHide">
          <div className="tabs">
            <h5>{intl.formatMessage({ id: 'pages.setting.adsCampaign.titleMenuAdsCampaign' })}</h5>
            <div
              className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
              onClick={() => handleTabChange('tab1')}
            >
              <span>{intl.formatMessage({ id: 'pages.setting.adsCampaign.listAdsCampaign' })}</span>
            </div>
            <div
              className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
              onClick={() => handleTabChange('tab2')}
            >
              <span>{intl.formatMessage({ id: 'pages.setting.groups.AddGroupCustomer' })}</span>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={13} md={15} lg={17} xl={17} xxl={19}>
          <div className="tab-panels menuHideWidth">
            {activeTab === 'tab1' && (
              <div className="tab-panel">
                {a ? (
                  <>
                    <AddCampaign closeCreate={setA} />
                  </>
                ) : (
                  <div>
                    {openView ? (
                      <ViewCampaign closeView={setOpenView} data={dataView} refect={setRefectDel} />
                    ) : (
                      <div style={{ marginTop: '35px' }}>
                        <button
                          className="btnCreate"
                          onClick={handleCreate}
                          style={{
                            position: 'fixed',
                            zIndex: '999',
                            marginLeft: '228px',
                            marginTop: '-50px',
                          }}
                        >
                          {intl.formatMessage({
                            id: 'pages.setting.adsCampaign.btnAddAdsCampaign',
                          })}
                        </button>
                        <List
                          style={{ width: '420px', marginLeft: '-40px',marginTop: "170px" }}
                          dataSource={dataTable}
                          renderItem={(item) => (
                            <List.Item
                              className="itemAdsCampaignMain"
                              actions={[
                                <div style={{ display: 'flex', marginLeft: '228%',marginTop: "10px"}}>
                                  <button className="btnCreate" onClick={(e) => {setOpenView(true);setDataView(item);}}>
                                    Xem
                                  </button>
                                  <button className="btnCreate" style={{ marginLeft: '10px' }}>
                                    <Popconfirm
                                      placement="left"
                                      title={`Bạn có chắc chắn muốn xóa nhóm?`}
                                      onConfirm={(e) => onDeleteAdsCampaign(e, item)}
                                      okText="Có"
                                      cancelText="Không"
                                    >
                                      Xóa
                                    </Popconfirm>
                                  </button>
                                </div>,
                              ]}
                              style={{
                                boxShadow: '2px 2px 5px #ccc',
                                marginBottom: '10px',
                                display: 'block',
                                height: "200px"
                              }}
                            >
                              <div style={{ marginLeft: '10px',height:"130px" }}>
                                <p>Tên chiến dịch: {item.campaignName}</p>
                                <div style={{ display: 'flex'}}>
                                  <p style={{width: "180px" }}>Nhóm: {item.groups}</p>
                                  <p style={{marginLeft:'15px'}}>teamplate: {item.mode}</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <p style={{width: "180px" }}>Thời gian: {item.time}</p>
                                  <p style={{marginLeft:'15px'}}>Trạng thái: {item.status}</p>
                                </div>
                              </div>
                              <div style={{width: "100%",height: "1px",borderBottom: "1px solid #c7c2c2"}}></div>
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className="tab-panel">
                <AddCampaign closeCreate={setA} />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdsCampaign;
