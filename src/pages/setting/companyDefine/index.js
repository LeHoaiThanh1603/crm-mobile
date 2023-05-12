import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'umi';
import { Table, Tabs } from 'antd';
import './companyDefine.less';
import MarketSegment from './companyTab/MarketSegment';
import Company from './company';
import SourceCode from './companyTab/SourceCode';
import Branch from './companyTab/Branch';
import Type from './companyTab/Type';
import { Booker } from '@/pages/setting/companyDefine/booker';
import IndustryCompany from './companyTab/IndustryCompany';

const CompanyDefine = () => {
  const intl = useIntl();
  const { TabPane } = Tabs;
  return (
    <div>
      <div className="company-define-container">
        <Tabs defaultActiveKey="1" size="large">
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.company',
            })}
            key="1"
          >
            <Company />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.marketsegment',
            })}
            key="2"
          >
            <MarketSegment />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.sourcecode',
            })}
            key="3"
          >
            <SourceCode />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.branch',
            })}
            key="4"
          >
            <Branch />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.type',
            })}
            key="5"
          >
            <Type />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.industrycompany',
            })}
            key="6"
          >
            <IndustryCompany />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'pages.setting.companydefine.company.booker',
            })}
            key="7"
          >
            <Booker></Booker>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDefine;
