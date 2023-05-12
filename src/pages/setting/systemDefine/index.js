import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'umi';
import './systemDefine.less';
import { Row, Col, Tabs } from 'antd';
import MenuDefine from './MenuDefine/MenuDefine';
import TemplateMessageACP from './TemplateMessageACP';

const SystemDefine = () => {
  const intl = useIntl();
  const { TabPane } = Tabs;
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'Mẫu tin nhắn - Sproud' })} key="1">
          <MenuDefine />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'Mẫu tin nhắn - Chiến dịch' })} key="2">
          <TemplateMessageACP/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemDefine;
