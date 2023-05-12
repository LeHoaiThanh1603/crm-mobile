import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
export default function MarketSegmentPopup(props) {
  let { isShowModal, setIsShowModal, addOrUpdate, updateMarketSegment, recordUpdate } = props;
  const intl = useIntl();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    setDataUpdate({ ma: recordUpdate.ma, marketSegment: recordUpdate.marketSegment });
  }, [isShowModal]);

  const [dataAdd, setDataAdd] = useState({
    marketSegment: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    ma: 0,
    marketSegment: '',
  });
  const handleAdd = () => {
    useFetch(
      '/api/Company/CreateMarketSegment',
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
          updateMarketSegment();
          setIsShowModal(false);
          setDataAdd({ marketSegment: '' });
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
      '/api/Company/UpdateMarketSegment',
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
          updateMarketSegment();
          setIsShowModal(false);
          setDataAdd({ marketSegment: '' });
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
  return (
    <Modal
      height={'350px'}
      width={'350px'}
      visible={isShowModal}
      title={intl.formatMessage({
        id:
          addOrUpdate == 'add'
            ? 'pages.setting.companydefine.addmarketsegment'
            : 'pages.setting.companydefine.updatemarketsegment',
      })}
      children={
        <Row gutter={[4, 4]} style={{ height: '100px' }}>
          <Col className=" d-flex align-items-end" span={24}>
            {label.titlemd({
              children: intl.formatMessage({
                id: 'pages.setting.companydefine.tablename',
              }),
            })}
          </Col>
          <Col span={24}>
            <input.medium
              ref={inputRef}
              value={addOrUpdate == 'add' ? dataAdd.marketSegment : dataUpdate.marketSegment}
              onChange={
                addOrUpdate == 'add'
                  ? (e) => setDataAdd({ ...dataAdd, marketSegment: e.target.value })
                  : (e) => setDataUpdate({ ...dataUpdate, marketSegment: e.target.value })
              }
            />
          </Col>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        setDataAdd({ marketSegment: '' });
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
