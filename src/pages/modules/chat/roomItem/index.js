import { Avatar, Col, Row, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { label } from '@/components/Label';
import './roomItem.less';
import moment from 'moment';

const RoomItem = ({ info, onClick }) => {
  const { id, context, roomId, guestName, isUser, lastUpdateTime, isActive, isRead, booking } =
    info;
  return (
    <Row
      className={`p-3 d-flex align-items-center roomitem-container ${
        isActive ? 'roomitem-active' : ''
      }`}
      style={{ height: '85px' }}
      onClick={() => {
        if (onClick) {
          onClick(roomId, id, guestName, isRead, booking);
        }
      }}
    >
      <Col xs={24} sm={12} md={8} lg={6} xl={5} xxl={4} className="d-flex justify-content-center">
        <Tooltip title={`BK: ${booking}`}>
          <Avatar size={50}>{roomId} </Avatar>
        </Tooltip>
      </Col>
      <Col xs={0} sm={12} md={16} lg={12} xl={14} xxl={15}>
        <div className="d-flex flex-column" style={{ gap: '5px' }}>
          <div className="w-100 guest-name">
            <label.h6 bold={isRead ? false : true}>{guestName}</label.h6>
          </div>
          <div
            className="w-100"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <label.titlemd>{`${isUser ? 'You:' : ''} ${
              typeof context == 'string' ? context : 'Picture'
            }`}</label.titlemd>
          </div>
        </div>
      </Col>
      <Col xs={0} sm={0} lg={6} xl={5} className="h-100">
        <div
          className="d-flex align-items-start justify-content-end h-100"
          style={{ textAlign: 'right' }}
        >
          <label.titlemd>
            {moment().diff(moment(lastUpdateTime), 'days') > 30
              ? moment(lastUpdateTime).format('DD/MM/YYYY')
              : moment(lastUpdateTime).locale('en').fromNow(true)}
          </label.titlemd>
        </div>
      </Col>
    </Row>
  );
};

export default RoomItem;
