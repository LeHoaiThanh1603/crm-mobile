import React, { useState, useRef, useEffect } from 'react';
import './iconexplain.less';
import { useIntl } from 'umi';

import checkinIcon from '../asset/checkin.svg';
import checkoutIcon from '../asset/checkout.svg';
import dirtyIcon from '../asset/dirtyblack.svg';
import extrabedIcon from '../asset/extrabedblack.svg';
import honeymoonIcon from '../asset/honeymoonblack.svg';
import birthdayIcon from '../asset/birthdayblack.svg';
import walkinIcon from '../asset/walkin.svg';
import priorityIcon from '../asset/priorityblack.svg';
import lockoooIcon from '../asset/lockooo.svg';
import lockoosIcon from '../asset/lockoosblack.svg';
import connectingRoomIcon from '../asset/connectingroom.svg';
import houseUseIcon from '../asset/houseuse.svg';

const IconExplain = (props) => {
  const intl = useIntl();
  return (
    <>
      <div className={`icon-explain-container ${props.visible ? 'd-flex' : 'd-none'} `}>
        <div className="icon-explain">
          <div className="icon-explain-img ">
            <img className="small-icon" src={checkinIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.checkin',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img className="small-icon" src={checkoutIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.checkout',
            })}
          </p>
        </div>
        <div className="icon-explain border-icon-explain">
          <div className="icon-explain-img">
            <img className="small-icon" src={walkinIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.walkin',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={dirtyIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.dirty',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={lockoooIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.outoforder',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={lockoosIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.outofservice',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={priorityIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.priority',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={extrabedIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.extrabed',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={birthdayIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.birthday',
            })}
          </p>
        </div>
        <div className="icon-explain border-icon-explain">
          <div className="icon-explain-img">
            <img src={honeymoonIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.honeymoon',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={connectingRoomIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.connectingroom',
            })}
          </p>
        </div>
        <div className="icon-explain">
          <div className="icon-explain-img">
            <img src={houseUseIcon} />
          </div>
          <p className="icon-explain-text">
            {intl.formatMessage({
              id: 'pages.roommap.iconexplain.houseuse',
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default IconExplain;
