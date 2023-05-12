import Modal from '@/components/Popup';
import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { Row, Col } from 'antd';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';

const ConfigModal = ({ visible, setVisible, state, addOrUpdate, updateData }) => {
  const intl = useIntl();
  const [data, setData] = useState(state);
  const focusRef = useRef();

  const handleOkButton = () => {
    useFetch(
      '/api/Defines/CreateUpdateConfig',
      'POST',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          setVisible(false);
          updateData();
        } else if (res.success == 0) {
          notification.warning(
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
    setData(state);
    focusRef.current.focus();
  }, [state]);

  return (
    <Modal
      size={'sm'}
      visible={visible}
      title={
        addOrUpdate === 'add'
          ? intl.formatMessage({
              id: 'pages.setting.hoteldefine.configmodal.add',
            })
          : intl.formatMessage({
              id: 'pages.setting.hoteldefine.configmodal.update',
            })
      }
      onClose={() => {
        setVisible(false);
      }}
      onOK={() => {
        handleOkButton();
      }}
    >
      <Row className="px-2 py-3">
        <Col span={11} className="d-flex flex-column" style={{ gap: '18px' }}>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.configmodal.name',
              })}
            </label.titlemd>
            <input.medium
              readOnly={addOrUpdate === 'add' ? false : true}
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.configmodal.name',
              })}
              ref={addOrUpdate === 'add' ? focusRef : undefined}
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.configmodal.value',
              })}
            </label.titlemd>
            <input.medium
              ref={addOrUpdate === 'add' ? undefined : focusRef}
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.configmodal.value',
              })}
              value={data.value}
              onChange={(e) => {
                setData({ ...data, value: e.target.value });
              }}
            />
          </div>
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <label.titlemd>
            {intl.formatMessage({
              id: 'pages.setting.hoteldefine.configmodal.description',
            })}
          </label.titlemd>
          <input.comment
            placeholder={intl.formatMessage({
              id: 'pages.setting.hoteldefine.configmodal.description',
            })}
            rows={4}
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfigModal;
