import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col, Popconfirm } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { buttonList } from '@/components/Button';
import './MenuPopup.less';
export default function MenuPopup(props) {
  let { isShowModal, setIsShowModal, addOrUpdate, parent, updateMessageType, oldDataUpdate } =
    props;
  const intl = useIntl();
  const inputRef = useRef();
  const [dataAdd, setDataAdd] = useState({
    id: '',
    name: '',
  });

  console.log(dataAdd)
  const [dataUpdate, setDataUpdate] = useState({
    id: '',
    name: '',
  });

  const handleAdd = () => {
    useFetch(
      '/api/Defines/CreateMessageType',
      'post',
      'application/json',
      JSON.stringify(dataAdd),
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateMessageType();
          setIsShowModal(false);
          setDataAdd({
            id: '',
            name: '',
          });
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const handleUpdate = () => {
    useFetch(
      '/api/Defines/UpdateMessageType',
      'put',
      'application/json',
      JSON.stringify(dataUpdate),
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateMessageType();
          setIsShowModal(false);
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const handleDelete = (id) => {
    const formData = new FormData();
    formData.append('id', id);
    useFetch(
      '/api/Defines/DeleteMessageType',
      'DELETE',
      null,
      formData,
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateMessageType();
          setIsShowModal(false);
        } else {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    inputRef.current.focus();
    setDataUpdate(oldDataUpdate);
  }, [isShowModal]);

  return (
    <Modal
      width={'400px'}
      visible={isShowModal}
      title={intl.formatMessage({
        id:
          addOrUpdate == 'add'
            ? 'pages.setting.templatemessage.menu.addmessagetype'
            : 'pages.setting.templatemessage.menu.updatemessagetype',
      })}
      groupButton={
        <div className="d-flex align-items-center" style={{ gap: '5px' }}>
          {addOrUpdate == 'update' && (
            <Popconfirm
              title={intl.formatMessage({
                id: 'pages.setting.templatemessage.deletewarning',
              })}
              onConfirm={() => {
                handleDelete(dataUpdate.id);
              }}
              okText={intl.formatMessage({
                id: 'pages.setting.templatemessage.deletewarning.yes',
              })}
              cancelText={intl.formatMessage({
                id: 'pages.setting.templatemessage.deletewarning.no',
              })}
            >
              <buttonList.delete />
            </Popconfirm>
          )}
          <buttonList.cancel
            onClick={() => {
              setIsShowModal(false);
              setDataAdd({
                id: '',
                name: '',
              });
            }}
          />
          <buttonList.normal onClick={addOrUpdate == 'add' ? handleAdd : handleUpdate} />
        </div>
      }
      children={
        <Row gutter={[32, 16]} className="px-2 py-3">
          <Col span={24}>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.templatemessage.messagetype.id',
              })}
            </label.titlemd>
            <input.medium
              readOnly={addOrUpdate == 'add' ? false : true}
              value={addOrUpdate == 'add' ? dataAdd.id : dataUpdate.id}
              ref={inputRef}
              onChange={(e) => {
                if (addOrUpdate == 'add') {
                  setDataAdd({ ...dataAdd, id: e.target.value });
                } else {
                  setDataUpdate({ ...dataUpdate, id: e.target.value });
                }
              }}
            />
          </Col>
          <Col span={24}>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.templatemessage.messagetype.name',
              })}
            </label.titlemd>
            <input.medium
              value={addOrUpdate == 'add' ? dataAdd.name : dataUpdate.name}
              onChange={(e) => {
                if (addOrUpdate == 'add') {
                  setDataAdd({ ...dataAdd, name: e.target.value });
                } else {
                  setDataUpdate({ ...dataUpdate, name: e.target.value });
                }
              }}
            />
          </Col>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        setDataAdd({
          id: '',
          name: '',
        });
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
