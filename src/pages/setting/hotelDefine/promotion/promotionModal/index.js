import Modal from '@/components/Popup';
import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';

const PromotionModal = ({ visible, setVisible, state, addOrUpdate, updateData }) => {
  const intl = useIntl();
  const [data, setData] = useState(state);
  const focusRef = useRef();
  const [date, setDate] = useState('');
  console.log(data);
  const handleOkButton = () => {
    useFetch(
      '/api/Defines/CreatePromotion',
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
  const handleUpdatePromotion = ()=>{

    useFetch(
      '/api/Defines/UpdatePromotion',
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
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

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
              id: 'pages.setting.hoteldefine.promotionmodal.add',
            })
          : intl.formatMessage({
              id: 'pages.setting.hoteldefine.promotionmodal.update',
            })
      }
      onClose={() => {
        setVisible(false);
      }}
      onOK={() => addOrUpdate == 'add' ?
        handleOkButton() : handleUpdatePromotion()
      }
    >
      <Row className="px-2 py-3">
        <Col span={11} className="d-flex flex-column" style={{ gap: '18px' }}>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.promotionmodal.startDate',
              })}
            </label.titlemd>
            <DatePicker
            className="w-100"
              readOnly={addOrUpdate === 'add' ? false : true}
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.promotionmodal.startDate',
              })}
              ref={addOrUpdate === 'add' ? focusRef : undefined}
              value={data?.startDate ? moment(data.startDate, 'YYYY-MM-DD') : ''}
              onChange={(value) => {
                if (value) {
                  setData({...data,startDate: value.format('YYYY-MM-DD')});
                }
              }}
            />
          </div>
          <div>
            <label.titlemd>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.promotionmodal.endDate',
              })}
            </label.titlemd>
            <DatePicker
             className="w-100"
              ref={addOrUpdate === 'add' ? undefined : focusRef}
              placeholder={intl.formatMessage({
                id: 'pages.setting.hoteldefine.promotionmodal.endDate',
              })}
              value={data?.endDate ? moment(data.endDate, 'YYYY-MM-DD') : ''}
              onChange={(value) => {
                if (value) {
                  setData({...data,endDate: value.format('YYYY-MM-DD')});
                } 
              }}
            />
          </div>
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <label.titlemd>
            {intl.formatMessage({
              id: 'pages.setting.hoteldefine.promotionmodal.description',
            })}
          </label.titlemd>
          <input.comment
            placeholder={intl.formatMessage({
              id: 'pages.setting.hoteldefine.promotionmodal.description',
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

export default PromotionModal;
