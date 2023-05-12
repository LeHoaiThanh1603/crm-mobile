import React, { useState, useRef, useEffect } from 'react';
import '../hotline/hotline.less';
import phone from './asset/phone.svg';
import {
  StepBackwardOutlined,
  LogoutOutlined,
  PhoneOutlined,
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
export default function hotline() {
  return (
    <div className="hotline-container">
      {' '}
      <div className="hotline">
        <img src={phone}></img>
      </div>
      <div ref={hotline} className="phone">
        019.586.705
      </div>
    </div>
  );
}
