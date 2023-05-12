import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import 'antd/dist/antd.css';
import './report.less';
import ModuleHeader from '../../components/ModuleHeader';
import dailyOther from './asset/dailyoder.svg';
import topchannel from './asset/topchannel.svg';
import tvstatus from './asset/tvstatus.svg';
import tvusetime from './asset/tvusetime.svg';
import userrating from './asset/userrating.svg';
import LanguageSetting from '@/components/LanguageSetting';

import ReportHeader from './../../components/ReportHeader/index';
import { label } from '@/components/Label';

function Report({ location, children }) {
  const intl = useIntl();
  const data = [
    {
      img: tvstatus,
      name: intl.formatMessage({
        id: 'pages.report.televisionstatus.title',
      }),
      path: '/report/televisionstatus',
    },

    {
      img: tvusetime,
      name: intl.formatMessage({
        id: 'pages.report.televisionusetime.title',
      }),
      path: '/report/televisionusetime',
    },
    {
      img: topchannel,
      name: intl.formatMessage({
        id: 'pages.report.topchannel.title',
      }),
      path: '/report/topchannel',
    },
    {
      img: dailyOther,
      name: intl.formatMessage({
        id: 'pages.report.dailyorder.title',
      }),
      path: '/report/dailyorder',
    },
    {
      img: userrating,
      name: intl.formatMessage({
        id: 'pages.report.userrating.title',
      }),
      path: '/report/userrating',
    },
  ];
  return (
    <div style={{ height: '100vh', overflow: 'auto' }} className="report">
      <LanguageSetting pageId="" />
      <ModuleHeader />
      {location.pathname == '/report' || location.pathname == '/report/' ? (
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
                    {' '}
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
          <ReportHeader
            name={intl.formatMessage({
              id: `pages.report.${location.pathname.split('/')[2]}.title`,
            })}
          />
          <div className="report-children">{children}</div>
        </>
      )}
    </div>
  );
}
export default Report;
