import React, { useState, useRef, useEffect } from 'react';
import './login.less';
import { Row, Col, Input, Button, Radio } from 'antd';
import {
  UserOutlined,
  KeyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import {} from 'antd';
import Hotline from '@/pages/modules/hotline';
import Version from '@/pages/modules/version';
import Cookies from 'js-cookie';
import hotel from './asset/hotel.svg';
import Clock from '@/pages/modules/clock';
import { FormattedMessage, setLocale, history, useIntl, useModel } from 'umi';
import { inputAdornmentClasses } from '@mui/material';
import { URL_API } from '@/e2e/configSystem';
import key from './asset/keyLogin.svg';
import userImg from './asset/userLogin.svg';
import Logo from '@/pages/modules/logo';
import login from './asset/loginButton.svg';
import loading from './asset/loading.svg';
import { notification } from '@/components/Notification';
import { useFetch } from '@/components/Fetch/useFetch';
import { input } from '@/components/Input';
import Lang from '@/components/Lang';
import { SelectComponent, select } from '@/components/Select';
import { type } from './../../.umi/plugin-model/useModel';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';

function Login() {
  const ref = useRef();

  useEffect(() => {
    re.current.focus();
  }, []);

  const { updateSystemUser } = useModel('systemuser');
  const intl = useIntl();
  const [hiden, setHiden] = useState(true);
  const [eye, setEye] = useState('password');
  const container = useRef([]);
  const re = useRef();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [loadingUser, setLoadingUser] = useState(false);
  const [err, setErr] = useState(false);
  const [styleUser, setStyleUser] = useState('normal');
  const [stylePass, setStylePass] = useState('normal');
  const [isDisabled, setIsDisable] = useState({ value: false });

  // useEffect(() => {
  //   ref.current.focus();
  //   setIsDisable({ value: false });

  //   const defaultTitle = intl.formatMessage({
  //     id: 'menu.login',
  //     defaultMessage: 'Proud PMS',
  //   });

  //   document.title = defaultTitle;
  // }, []);

  const goto = () => {
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query;
    history.push(redirect || '/setting/groups');
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (user.password == '') {
      document.querySelector(`.l-pass label`).style.color = '#A93838';
      setStylePass('err');
    } else {
      document.querySelector(`.l-pass label`).style.color = '#3e5c76';
      setStylePass('normal');
    }
    if (user.username == '') {
      document.querySelector(`.l-user label`).style.color = '#A93838';
      setStyleUser('err');
    } else {
      setStyleUser('normal');
      document.querySelector(`.l-user label`).style.color = '#3e5c76';
    }
    if (user.password == '' || user.username == '') {
      return;
    }
    if (isDisabled.value) {
      return;
    }
    isDisabled.value = true;

    setLoadingUser(!loadingUser);

    useFetch(
      '/api/User/getCurrentUser',
      'POST',
      'application/json',
      JSON.stringify(user),
      (result) => {
        if (result.success == '1') {
          const defaultloginSuccessMessage = intl.formatMessage({
            id: result.mess,
            defaultMessage: 'Login success!',
          });
          notification.success(defaultloginSuccessMessage);
          Cookies.set('userlogin', JSON.stringify(result.data), { expires: 1 });
          updateSystemUser();

          setTimeout(() => {
            goto();
          }, 500);
        } else if (result.success == '0') {
          const defaultloginErrorMessage = intl.formatMessage({
            id: result.mess,
            defaultMessage: 'Login fail!',
          });
          setErr(true);
          setLoadingUser(false);
          notification.error(defaultloginErrorMessage, 'error');
          isDisabled.value = false;
        }
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          goto();
        }, 500);
      },
    );
  };

  return (
    <form onSubmit={onLogin}>
      <Row className="login-container">
        <Logo readOnly={true}></Logo>

        <div className="bg1"></div>
        <div className="bg2"></div>
        <Version></Version>
        <Hotline></Hotline>
        <Lang></Lang>
        <Col span={24}>
          <Col
            style={{marginLeft: "4px"}}
            className="login-f"
            xxl={{ span: 5, offset: 15 }}
            xl={{ span: 8, offset: 14 }}
            lg={{ span: 8, offset: 8 }}
            md={{ span: 12, offset: 8 }}
            sm={{ span: 15, offset: 5 }}
            xs={{ span: 20, offset: 2 }}
          >
            <Col span={24} className="head">
              {intl.formatMessage({
                id: 'pages.login',
                default: 'not found',
              })}
            </Col>

            <Col span={24} className="l-user">
              <label>
                {intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  default: 'not found',
                })}
              </label>

              <input.large
                status={styleUser}
                blur={() => {
                  if (user.username != '') {
                    setStyleUser('normal');
                    document.querySelector(`.l-user label`).style.color = '#3e5c76';
                  }
                }}
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                ref={re}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  default: 'not found',
                })}
              ></input.large>
            </Col>
            <Col span={24} className="l-pass">
              <label>
                {intl.formatMessage({
                  id: 'pages.login.password',
                  default: 'not found',
                })}
              </label>

              <input.pass
                status={stylePass}
                blur={() => {
                  if (user.password != '') {
                    setStylePass('normal');
                    document.querySelector(`.l-pass label`).style.color = '#3e5c76';
                  }
                }}
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  default: 'not found',
                })}
              ></input.pass>

              {err ? (
                <p style={{ fontSize: '16px', color: '#8F2020', marginBottom: '0' }}>
                  {intl.formatMessage({
                    id: 'pages.login.accountLogin.errorMessage',
                    default: 'not found',
                  })}
                </p>
              ) : (
                ''
              )}
            </Col>

            <Col span={24} className="l-button d-flex justify-content-center">
              {!loadingUser ? (
                <button onSubmit={onLogin}>
                  {intl.formatMessage({
                    id: 'pages.login.submit',
                    default: 'not found',
                  })}
                </button>
              ) : (
                <button style={{ background: '#55AEC6' }}>
                  <img src={loading}></img>
                </button>
              )}
            </Col>
          </Col>
        </Col>
      </Row>{' '}
    </form>
  );
}

export default Login;
