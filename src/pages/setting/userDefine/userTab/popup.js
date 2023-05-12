import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Popconfirm } from 'antd';
import { buttonList } from '@/components/Button';
import Modal from '@/components/Popup';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';

import { useIntl, useModel } from 'umi';
import { select } from '@/components/Select';
import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';

export default function Popup({ state, showPopup, addOrEdit, onClose, resetPassword }) {
  const [data, setData] = useState({
    username: '',
    fullName: '',
    role: '',
    isDelete: false,
  });
  const { roles, updateUsers } = useModel('userdata');
  const inputRef = useRef();
  const intl = useIntl();
  const editUser = (data) => {
    useFetch(
      '/api/User/UpdateUser',
      'PUT',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          updateUsers();
          onClose();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  const addUser = (data) => {
    useFetch(
      '/api/User/CreateUser',
      'post',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          updateUsers();
          onClose();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  const resetPass = (data) => {
    const formData = new FormData();
    formData.append('username', data);
    useFetch(
      '/api/User/ResetPasswordUser',
      'PATCH',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  useEffect(() => {
    inputRef.current.focus();
    if (addOrEdit !== 'add') {
      setData({
        username: state.username,
        fullName: state.fullName,
        role: state.role,
        isDelete: state.isDelete,
      });
    } else {
      setData({
        username: '',
        fullName: '',
        role: '',
        isDelete: false,
      });
    }
  }, [showPopup]);

  return (
    <Modal
      onOK={() => (addOrEdit == 'add' ? addUser(data) : editUser(data))}
      visible={showPopup}
      onClose={onClose}
      size={'s'}
      title={intl.formatMessage({
        id:
          addOrEdit == 'add'
            ? 'pages.setting.userdefine.users.add'
            : 'pages.setting.userdefine.users.edit',
      })}
    >
      <div className="content-popup m-4">
        <Row gutter={[38, 14]}>
          <Col span={24}>
            <Row gutter={[0, 14]}>
              <Col span={24}>
                <label.titlesm>
                  {intl.formatMessage({ id: 'pages.setting.userdefine.users.username' })}
                </label.titlesm>
                <input.medium
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                  }}
                  ref={addOrEdit == 'add' ? inputRef : undefined}
                  readOnly={addOrEdit == 'edit'}
                ></input.medium>
              </Col>
              <Col span={24}>
                <label.titlesm>
                  {intl.formatMessage({ id: 'pages.setting.userdefine.users.fullName' })}
                </label.titlesm>
                <input.medium
                  ref={addOrEdit == 'add' ? undefined : inputRef}
                  value={data.fullName}
                  onChange={(e) => {
                    setData({ ...data, fullName: e.target.value });
                  }}
                ></input.medium>
              </Col>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80% auto',
                  width: '100%',
                  gap: '10px',
                }}
              >
                <div>
                  {' '}
                  <label.titlesm>
                    {intl.formatMessage({ id: 'pages.setting.userdefine.users.role' })}
                  </label.titlesm>
                  <input.medium
                    value={data.role}
                    onChange={(e) => {
                      setData({ ...data, role: e.target.value });
                    }}
                  >
                    {' '}
                  </input.medium>
                </div>
                <div>
                  <label.titlesm>
                    {intl.formatMessage({ id: 'pages.setting.userdefine.users.isDelete' })}
                  </label.titlesm>
                  <Switch
                    value={data.isDelete}
                    onClick={(e) => {
                      setData({ ...data, isDelete: e });
                    }}
                  >
                    {' '}
                  </Switch>
                </div>
              </div>

              <Col span={24}></Col>
            </Row>
            {addOrEdit == 'add' ? undefined : (
              <Popconfirm
                title={intl.formatMessage({ id: 'pages.setting.userdefine.users.confirm' })}
                onConfirm={() => {
                  resetPass(data.username);
                }}
                okText={intl.formatMessage({ id: 'pages.setting.userdefine.users.yes' })}
                cancelText={intl.formatMessage({ id: 'pages.setting.userdefine.users.No' })}
              >
                <buttonList.normal title={'Reset Password'}></buttonList.normal>
              </Popconfirm>
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
