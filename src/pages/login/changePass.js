import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import './changePass.less';
import { Row, Col } from 'antd';
import { Table } from '@/components/Table';
import { input } from '@/components/Input';
import Modal from '@/components/Popup';
import { useModel, history, useIntl } from 'umi';
import { URL_API } from '@/e2e/configSystem';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import { EyeInvisibleOutlined, EyeTwoTone, CloseOutlined } from '@ant-design/icons';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import { select } from '@/components/Select';
import { ChangePass } from '@/pages/login/changePass';
import { log } from 'lodash-decorators/utils';

export default function ChangePassForm({ state, close }) {
  const [changepass, setchangepass] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });

  const [statusNewpass, setStatusNewpass] = useState('');

  const [statusOldpass, setStatusOldpass] = useState('');

  const [statusConfirmpass, setStatusConfirmpass] = useState('');

  const [statusErr, setStatusErr] = useState('');

  const intl = useIntl();
  const { systemUser } = useModel('systemuser');
  const refFocus = useRef();
  const onCloseChangePass = () => {
    document.querySelector('.changePass').style.display = 'none';
    setchangepass({
      oldPass: '',
      newPass: '',
      confirmPass: '',
    });
  };

  const onSubmitPass = (e) => {
    e.preventDefault();

    setStatusOldpass(`${changepass.oldPass == '' ? 'err' : 'normal'}`);
    setStatusNewpass(`${changepass.newPass == '' ? 'err' : 'normal'}`);
    setStatusConfirmpass(`${changepass.confirmPass == '' ? 'err' : 'normal'}`);

    if (changepass.confirmPass != '' && changepass.newPass != '' && changepass.oldPass != '') {
      try {
        let data = new FormData();
        data.append('userEncrypt', systemUser.ssid);
        data.append('oldPassword', changepass.oldPass);
        data.append('newPassword', changepass.newPass);
        useFetch(
          '/api/User/ChangePassword',
          'PATCH',
          null,
          data,
          (result) => {
            if (result.success == '1') {
              const defaultChangePasswordSuccessMessage = intl.formatMessage({
                id: result.mess,
                defaultMessage: 'Change password success!',
              });
              notification.success(defaultChangePasswordSuccessMessage);
              Cookies.remove('userlogin');
              history.push('/login');
            } else if (result.success == '0') {
              const defaultChangePasswordFailMessage = intl.formatMessage({
                id: result.mess,
                defaultMessage: 'Change password fail!',
              });
              notification.error(defaultChangePasswordFailMessage);
              setStatusErr(true);
            }
          },
          (error) => {
            console.log(error);
          },
        );
      } catch (error) {
        const defaultloginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！',
        });
        message.error(defaultloginFailureMessage);
      }
    }
  };

  useEffect(() => {
    refFocus.current.focus();
  }, []);

  return (
    <form>
      <Modal
        onOK={onSubmitPass}
        onClose={close}
        width={'420px'}
        visible={state}
        title={intl.formatMessage({
          id: 'pages.changepass.title',
          defaultMessage: 'Change Password',
        })}
        size="xs"
      >
        <Row gutter={[0, 30]} className="change-f ">
          <Col className="input d-flex justify-content-center " span={24}>
            <Col span={10} className='d-flex align-items-center'>
              <label.titlelg>{intl.formatMessage({
                id: 'pages.changepass.oldpass',
                defaultMessage: 'Old Pass',
              })}</label.titlelg>
            </Col>

            <Col span={14}>
              <input.medium
                ref={refFocus}
                blur={() => setStatusOldpass(`${changepass.oldPass == '' ? 'err' : 'normal'}`)}
                status={statusOldpass}
                value={changepass.oldPass}
                onChange={(e) => {
                  setchangepass({ ...changepass, oldPass: e.target.value });
                }}
                type="password"
              ></input.medium>
            </Col>
          </Col>
          <Col className=" input d-flex justify-content-center " span={24}>
            <Col span={10} className='d-flex align-items-center'>
              <label.titlelg>{intl.formatMessage({
                id: 'pages.changepass.newpass',
                defaultMessage: 'New Pass',
              })}</label.titlelg>
            </Col>
            <Col span={14}>
              <input.medium
                blur={() => setStatusNewpass(`${changepass.newPass == '' ? 'err' : 'normal'}`)}
                status={statusNewpass}
                onChange={(e) => {
                  setchangepass({ ...changepass, newPass: e.target.value });
                }}
                value={changepass.newPass}
                type="password"
              ></input.medium>
            </Col>
          </Col>
          <Col className="input d-flex justify-content-center " span={24}>
            <Col span={10} className='d-flex align-items-center'>
              <label.titlelg>{intl.formatMessage({
                id: 'pages.changepass.confirmpass',
                defaultMessage: 'Confirm Pass',
              })}</label.titlelg>
            </Col>
            <Col span={14}>
              <input.medium
                blur={() =>
                  setStatusConfirmpass(`${changepass.confirmPass == '' ? 'err' : 'normal'}`)
                }
                status={statusConfirmpass}
                onChange={(e) => {
                  setchangepass({ ...changepass, confirmPass: e.target.value });
                }}
                value={changepass.confirmPass}
                type="password"
              ></input.medium>
            </Col>
          </Col>
          {statusErr ? (
            <Col span={24} className="d-flex justify-content-end" style={{ color: '#A93838' }}>
              The password is not the same or the old password is wrong
            </Col>
          ) : (
            ''
          )}

          {/* <Col
            className="d-flex justify-content-end"
            style={{ gap: '10px', borderTop: '1px solid rgb(0,0,0,0.3)', paddingTop: '15px' }}
            span={24}
          >
            <buttonList.cancel
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
              title={intl.formatMessage({
                id: 'pages.changepass.cancel',
                defaultMessage: 'Cancel',
              })}
            ></buttonList.cancel>
            <buttonList.normal
              onSubmit={onSubmitPass}
              title={intl.formatMessage({
                id: 'pages.changepass.button',
                defaultMessage: 'Change',
              })}
            ></buttonList.normal>
          </Col> */}
        </Row>
      </Modal>
    </form>
  );
}
