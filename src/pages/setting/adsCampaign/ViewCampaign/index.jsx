import { message, Input, Space, Table, Popconfirm, Modal, Radio, List } from 'antd';

import Button from '@mui/material/Button';
import './index.css';
import { deleteAdCampaign, getAdcampaignDetail, getListAdCampaign } from '@/untils/request';
import { notification } from '@/components/Notification';
import { useEffect, useRef, useState } from 'react';
import { useCallApi } from '@/hooks/useCallApi';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
function ViewCampaign({ closeView, data, refect }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  // const [detailData] = useCallApi(
  //   `http://api.cm.onexus.net/api/CRM/CampaignDetail?campaignId=${data.id}`,
  //   'get',
  // );
  const [detailData, setDetailData] = useState({});
  console.log(detailData);
  console.log(data.id);

  useEffect(() => {
    console.log(data.id);

    let idDetail = data.id;
    getAdcampaignDetail(idDetail).then((res) => setDetailData(res.data));
  }, [data.id]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      //api delete
      deleteAdCampaign(data.id).then((res) => {
        refect(true);
        closeView(false);
        notification.success(`Xóa ${data.campaignName} thành công`);
        setConfirmLoading(false);
        setOpen(false);
      });
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleCloseView = () => {
    closeView(false);
  };

  const handleStatus = () => {
    let statusText;
    switch (detailData.status) {
      case 0:
        statusText = 'Đang xử lý';
        break;
      case 1:
        statusText = 'Gửi thành công';
        break;
      case 2:
        statusText = 'Gửi thất bại';
        break;
    }
    return statusText;
  };

  const dataTable = detailData?.campaignHistories?.map((item, i) => {
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
    }
    return {
      name: item.ten,
      sdt: item.dienThoai,
      time: moment(item.sendTime).format('DD-MM-YYYY, HH:mm'),
      email: item.email,
      status: statusText,
      id: item.id,
    };
  });

  return (
    <div>
      <div style={{ marginTop: '90px' }}>
        <h2 style={{marginLeft: "100px"}}>Xem chiến dịch</h2>

        <div>
          <div className="mb">
            <span className="tb">Tên Chiến Dịch: </span>
            <span>{detailData.name}</span>
          </div>
          <div className="mb">
            <span className="tb">Phương Thức: </span>
            <span>{detailData.channel}</span>
          </div>
          <div className="mb">
            <span className="tb">Thời Gian: </span>
            <span>{detailData.sendTime}</span>
          </div>
          <div className="mb">
            <span className="tb">Template: </span>
            <span>{detailData.template}</span>
          </div>
          <div className="mb">
            <span className="tb">Trạng thái gửi: </span>
            {handleStatus()}
          </div>
        </div>
        <div className="mb">
          <span className="tb">Lịch sử chiến dịch: </span>
        </div>
        <div>
          {dataTable?.length !== 0 ? (
            <List
              style={{ width: '378px', marginLeft: '-14px' }}
              dataSource={dataTable}
              renderItem={(item) => (
                <List.Item
                  className="itemAdsCampaignMain"
                  style={{
                    boxShadow: '2px 2px 5px #ccc',
                    marginBottom: '10px',
                    display: 'block',
                  }}
                >
                  <div style={{ marginLeft: '10px' }}>
                    <p>Tên khách hàng: {item.name}</p>
                    <p>Số điện thoại: {item.sdt}</p>
                    <p>Email: {item.email}</p>
                    <p>Thời gian: {item.time}</p>
                    <p>Trạng thái: {item.status}</p>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <span className="history-campaign">Khách hàng chưa có lịch sử chiến dịch</span>
          )}

          <div style={{ marginLeft: '43%' }}>
            <Button variant="contained" onClick={handleCloseView}>
              Hủy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCampaign;
