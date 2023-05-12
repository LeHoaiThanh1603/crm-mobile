import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import icon from './twogirlcircleframe.svg';
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import arrayMove from 'array-move';
import { Table } from '@/components/Table';
import Hotline from './hotline';
import './modules.less';
import moment from 'moment';
import Cookies from 'js-cookie';
import Version from './version';
import Chat from './chat';
import Clock from './clock';
import MenuItem from 'antd/lib/menu/MenuItem';
import ChangePass from '@/pages/login/changePass';
import { styles } from './../../components/CropImage/styles';
import Header from '@/components/ModuleHeader';
function Modules() {
  let [userLogin, setUserLogin] = useState({});

  return (
    <Row className="Modules-container">
      <Header />
      <Chat />
      {/* <Hotline />
      <Version /> */}
    </Row>
  );
}
export default Modules;
