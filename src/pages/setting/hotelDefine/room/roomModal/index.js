import Modal from '@/components/Popup';
import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { Row, Col } from 'antd';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';

const RoomModal = ({ visible, setVisible, state, addOrUpdate, updateData }) => {
  const intl = useIntl();
  const [data, setData] = useState(state);
  const focusRef = useRef();

  const createRoomHotel = () => {
    useFetch(
      '/api/Defines/CreateRoomHotel',
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
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const updateRoomHotel = () => {
    useFetch(
      '/api/Defines/UpdateRoomHotel',
      'PUT',
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
              id: 'pages.setting.hoteldefine.roommodal.add',
            })
          : intl.formatMessage({
              id: 'pages.setting.hoteldefine.roommodal.update',
            })
      }
      onClose={() => {
        setVisible(false);
      }}
      onOK={addOrUpdate === 'add' ? createRoomHotel : updateRoomHotel}
    >
      <Row className="px-2 py-3">
        <Col span={11} className="d-flex flex-column" style={{ gap: '10px' }}>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.room',
              })}
            </label.titlemd>
            <input.medium
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.room',
              })}
              ref={focusRef}
              value={data.room}
              onChange={(e) => {
                setData({ ...data, room: e.target.value });
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.tvcode',
              })}
            </label.titlemd>
            <input.medium
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.tvcode',
              })}
              value={data.tiviCode}
              onChange={(e) => {
                setData({ ...data, tiviCode: e.target.value });
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.passwifi',
              })}
            </label.titlemd>
            <input.medium
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.passwifi',
              })}
              value={data.passWifi}
              onChange={(e) => {
                setData({ ...data, passWifi: e.target.value });
              }}
            />
          </div>
        </Col>
        <Col span={2}></Col>
        <Col span={11} className="d-flex flex-column" style={{ gap: '10px' }}>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.xaxes',
              })}
            </label.titlemd>
            <input.number
              className="d-block w-100"
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.xaxes',
              })}
              value={data.xaxes}
              onChange={(e) => {
                setData({ ...data, xaxes: e });
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.yaxes',
              })}
            </label.titlemd>
            <input.number
              className="d-block w-100"
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.yaxes',
              })}
              value={data.yaxes}
              onChange={(e) => {
                setData({ ...data, yaxes: e });
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.floorname',
              })}
            </label.titlemd>
            <input.medium
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.roommodal.floorname',
              })}
              value={data.tenTang}
              onChange={(e) => {
                setData({ ...data, tenTang: e.target.value });
              }}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default RoomModal;
