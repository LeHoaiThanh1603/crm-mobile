import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'umi';
import { Tabs } from 'antd'
import './userDefine.less';
import Users from './userTab';

const { TabPane } = Tabs;

const UserDefine = () => {
  const intl = useIntl();
  return (
    <div className="user-define-container">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane
          tab={intl.formatMessage({
            id: 'pages.setting.userdefine.users.title',
          })}
          key="1"
        >
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserDefine;
