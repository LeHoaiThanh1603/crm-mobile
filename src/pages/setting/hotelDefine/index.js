import React from 'react';
import { useIntl } from 'umi';
import { Tabs } from 'antd';
import HotelInfo from '@/pages/setting/hotelDefine/hotelinfo';
import Config from './config';
import Room from './room';

const HotelDefine = () => {
  const intl = useIntl();
  const { TabPane } = Tabs;

  return (
    <div className="hotel-define-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'pages.setting.hotelDefine.hotelInfo' })} key="1">
          <HotelInfo></HotelInfo>
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'pages.setting.hoteldefine.room' })} key="2">
          <Room />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'pages.setting.hoteldefine.config' })} key="3">
          <Config />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HotelDefine;
