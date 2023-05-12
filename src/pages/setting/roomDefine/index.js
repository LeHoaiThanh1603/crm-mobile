import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'umi';
import './roomDefine.less';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const RoomDefine = () => {
  const intl = useIntl();
  return <div className="room-define-container">Content</div>;
};

export default RoomDefine;
