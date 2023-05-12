import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import 'antd/dist/antd.css';
import './setting.less';
import ModuleHeader from '../../components/ModuleHeader';
import hotelDefine from './asset/hotelDefine.svg';
import roomDefine from './asset/roomDefine.svg';
import userDefine from './asset/userDefine.svg';
import LanguageSetting from '@/components/LanguageSetting';
import systemDefine from './asset/systemDefine.svg';
import other from './asset/other.svg';
import group from './asset/group.svg';
import adcam from './asset/adcam.svg';
import message from './asset/messageIcon.svg';
import { Provider } from 'react-redux';


import SettingHeader from '@/components/SettingHeader';
import store from '@/store/store';

function Setting({ location, children }) {
  const intl = useIntl();
  const data = [
    {
      img: hotelDefine,
      name: intl.formatMessage({
        id: 'pages.setting.hoteldefine.title',
      }),
      path: '/setting/hoteldefine',
    },
    {
      img: roomDefine,
      name: intl.formatMessage({
        id: 'pages.setting.guestlist.title',
      }),
      path: '/setting/guestlist',
    },
    {
      img: userDefine,
      name: intl.formatMessage({
        id: 'pages.setting.userdefine.title',
      }),
      path: '/setting/userdefine',
    },
    {
      img: systemDefine,
      name: intl.formatMessage({
        id: 'pages.setting.templatemessage.title',
      }),
      path: '/setting/templatemessage',
    },
    {
      img: other,
      name: intl.formatMessage({
        id: 'pages.setting.companydefine.title',
      }),
      path: '/setting/companydefine',
    },
    {
      img: group,
      name: intl.formatMessage({
        id: 'pages.setting.groups.title',
      }),
      path: '/setting/groups',
    },
    {
      img: adcam,
      name: intl.formatMessage({
        id: 'pages.setting.adsCampaign.title',
      }),
      path: '/setting/adsCampaign',
    },


    // {
    //   img: adcam,
    //   name: intl.formatMessage({
    //     id: 'pages.setting.adsCampaign.title',
    //   }),
    //   path: '/inbox',
    // },

    // {
    //   img: group,
    //   name: intl.formatMessage({
    //     id: 'pages.setting.group.title',
    //   }),
    //   path: '/groups',
    // },
    {
      img: message,
      name: intl.formatMessage({
        id: 'pages.setting.inboxchat.title',
      }),
      path: '/setting/InboxChat',
    },


    // {
    //   img: message,
    //   name: intl.formatMessage({
    //     id: 'pages.setting.inboxchat.title',
    //   }),
    //   path: '/vote',
    // },
  ];
  return (
    <Provider store={store}>

      <div style={{ height: '100vh', overflowX: 'hidden',width:"425px"}}>
        <LanguageSetting pageId="" />
        <ModuleHeader />
        {location.pathname == '/setting' || location.pathname == '/setting/' ? (
          <div style={{ minHeight: 'calc(100vh - 5rem)' }} className="d-flex align-items-center">
            <div className="setting-define-container d-flex align-items-center justify-content-center">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="define-item d-flex flex-column align-items-center justify-content-center"
                    onClick={() => history.push(item.path)}
                  >
                    <div className="image mb-3">
                      <img src={item.img} />
                    </div>
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="setting-children" >{children}</div>
          </>
        )}
      </div>
    </Provider>
  );
}
export default Setting;
