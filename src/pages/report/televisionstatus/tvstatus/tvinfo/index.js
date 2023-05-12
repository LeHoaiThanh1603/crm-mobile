import React, { useState, useRef, useEffect } from 'react';
import { label } from '@/components/Label';
import './tvinfo.less';

import { formatNumber } from '@/e2e/extensionMethod';

const TVInfo = ({ roomInfo }) => {
  return (
    <>
      {!roomInfo.room ? (
        <div className="roominfo-container roominfo-no-display"></div>
      ) : (
        <div
          className={`roominfo-container d-flex align-items-center justify-content-center ${
            roomInfo.tinhTrang ? 'roominfo-on' : 'roominfo-off'
          }`}
        >
          <label.h5>{roomInfo.room}</label.h5>
        </div>
      )}
    </>
  );
};

export default TVInfo;
