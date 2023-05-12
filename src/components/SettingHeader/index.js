import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import backIcon from './asset/back.svg';
import { label } from '@/components/Label';
import './settingHeader.less';

const SettingHeader = ({ name }) => {
  return (
    <div
      className="setting-header-container d-flex align-items-center"
      onClick={() => history.push('/setting')}
    >
      <img src={backIcon} />
      <label.titlexl>{name}</label.titlexl>
    </div>
  );
};

export default SettingHeader;
