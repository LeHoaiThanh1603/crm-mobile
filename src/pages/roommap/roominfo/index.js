import React, { useState, useRef, useEffect } from 'react';
import { Col, Row } from 'antd';
import './roominfo.less';
import checkinIcon from '../asset/checkin.svg';
import checkoutIcon from '../asset/checkout.svg';
import dirtywhiteIcon from '../asset/dirtywhite.svg';
import dirtyblackIcon from '../asset/dirtyblack.svg';
import extrabedIcon from '../asset/extrabed.svg';
import honeymoonIcon from '../asset/honeymoon.svg';
import birthdayIcon from '../asset/birthday.svg';
import walkinIcon from '../asset/walkin.svg';
import priorityIcon from '../asset/priority.svg';
import lockoooIcon from '../asset/lockooo.svg';
import lockoosWhiteIcon from '../asset/lockooswhite.svg';
import lockoosBlackIcon from '../asset/lockoosblack.svg';
import connectingroomIcon from '../asset/connectingroom.svg';
import checkinAndCheckoutIcon from '../asset/checkinandcheckout.svg';

import { formatNumber } from '@/e2e/extensionMethod';

const RoomInfo = ({ roomInfo }) => {
  return roomInfo.Phong ? (
    <div className={`roominfo-container ${roomInfo.isInHouse ? 'room-in-use' : ''}`}>
      {roomInfo.ConnectRoom && (
        <div className="connection-room">
          <img src={connectingroomIcon} />
        </div>
      )}
      <div className="room-number-special-container">
        <div className="room-number-icon-container">
          <p className="room-number">{roomInfo.Phong}</p>
          {roomInfo.Walkin && <img className="small-size-icon me-1" src={walkinIcon} />}
        </div>
        <div className="checkin-checkout-container">
          {roomInfo.isCheckin && roomInfo.isCheckout ? (
            <img
              className={`small-size-icon ${roomInfo.TinhTrangPhong === 16 ? 'me-4' : ''}`}
              src={checkinAndCheckoutIcon}
            />
          ) : (
            <div className={roomInfo.TinhTrangPhong === 16 ? 'me-4' : ''}>
              {roomInfo.isCheckin !== 0 && <img className="small-size-icon" src={checkinIcon} />}
              {roomInfo.isCheckout !== 0 && <img className="small-size-icon" src={checkoutIcon} />}
            </div>
          )}
          {roomInfo.TinhTrangPhong === 16 && <img className="priority-icon" src={priorityIcon} />}
        </div>
      </div>
      <p className="content">
        {roomInfo.isInHouse !== 0 && `${formatNumber(roomInfo.Gia)} - ${roomInfo.LoaiPhong}`}
      </p>
      <div className="icon-container">
        {roomInfo.isInHouse ? (
          <Row style={{ height: '100%' }}>
            <Col span={20}>
              <div className="service-group-icon">
                {roomInfo.TinhTrangPhong === 5 && (
                  <img
                    style={{ marginRight: '0.5rem' }}
                    className="size-icon"
                    src={lockoosWhiteIcon}
                  />
                )}
                {/* {service && ( */}
                <div className="service-icon">
                  {roomInfo.IsExtraBed !== 0 && (
                    <img className="small-size-icon" src={extrabedIcon} />
                  )}
                  {roomInfo.IsBirthDay && (
                    <img style={{ height: '0.75rem', width: '0.75rem' }} src={birthdayIcon} />
                  )}
                  {roomInfo.Col3 && <img className="small-size-icon" src={honeymoonIcon} />}
                </div>
                {/* )} */}
              </div>
            </Col>
            <Col span={4}>
              {roomInfo.TinhTrangPhong === 2 && <img className="size-icon" src={dirtywhiteIcon} />}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={5}>
              {roomInfo.TinhTrangPhong === 5 && (
                <img className="size-icon" src={lockoosBlackIcon} />
              )}
            </Col>
            <Col span={9}></Col>
            <Col
              span={10}
              className="d-flex align-items-center justify-content-end"
              style={{ gap: '0.3125rem' }}
            >
              {roomInfo.TinhTrangPhong === 2 && <img className="size-icon" src={dirtyblackIcon} />}
              {roomInfo.TinhTrangPhong === 4 && <img className="size-icon" src={lockoooIcon} />}
            </Col>
          </Row>
        )}
      </div>
    </div>
  ) : (
    <div className="roominfo-container roominfo-no-display"></div>
  );
};

export default RoomInfo;
