import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'umi';
import { Row, Col, Tabs } from 'antd';
import { GuestList } from './guestList';

const tableDefine = () => {
  const intl = useIntl();
  const { TabPane } = Tabs;

  return (
    <div className="hotel-define-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'pages.setting.tabledefine.tab' })} key="1">
          <GuestList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default tableDefine;
