import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { select } from '@/components/Select';

export default function OutletPopup(props) {
  let { isShowModal, setIsShowModal, addOrUpdate, recordUpdate } = props;
  const { updateOutlet, department, service } = useModel('hoteldata');
  const intl = useIntl();
  const inputRef = useRef();
  const [dataAdd, setDataAdd] = useState({
    olMaSo: '',
    olTen: '',
    olBoPhan: '',
    olDichVu: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    olMaSo: '',
    olTen: '',
    olBoPhan: '',
    olDichVu: '',
  });
  useEffect(() => {
    inputRef.current.focus();
    setDataUpdate({
      olMaSo: recordUpdate.olMaSo,
      olTen: recordUpdate.olTen,
      olBoPhan: recordUpdate.olBoPhan,
      olDichVu: recordUpdate.olDichVu,
    });
  }, [isShowModal]);

  const handleAdd = () => {
    useFetch(
      '/api/Defines/CreateOutlet',
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
          updateOutlet();
          setIsShowModal(false);
          setDataAdd({ olMaSo: '', olTen: '', olBoPhan: '', olDichVu: '' });
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
      '/api/Defines/UpdateOutlet',
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
          updateOutlet();
          setIsShowModal(false);
          setDataAdd({ olMaSo: '', olTen: '', olBoPhan: '', olDichVu: '' });
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
      size={'s'}
      visible={isShowModal}
      title={intl.formatMessage({
        id:
          addOrUpdate == 'add'
            ? 'pages.setting.hotelDefine.outlet.addoutlet'
            : 'pages.setting.hotelDefine.outlet.updateoutlet',
      })}
      children={
        <Row gutter={[6, 16]}>
          <Row className="w-100 pt-2">
            <Col className=" d-flex align-items-end pb-1" span={24}>
              {label.titlemd({
                children: intl.formatMessage({
                  id: 'pages.setting.hotelDefine.outlet.id',
                }),
              })}
            </Col>
            <Col span={24}>
              <input.medium
                ref={inputRef}
                value={addOrUpdate == 'add' ? dataAdd.olMaSo : dataUpdate.olMaSo}
                onChange={
                  addOrUpdate == 'add'
                    ? (e) => setDataAdd({ ...dataAdd, olMaSo: e.target.value })
                    : (e) => setDataUpdate({ ...dataUpdate, olMaSo: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="w-100">
            <Col className=" d-flex align-items-end pb-1" span={24}>
              {label.titlemd({
                children: intl.formatMessage({
                  id: 'pages.setting.hotelDefine.outlet.name',
                }),
              })}
            </Col>
            <Col span={24}>
              <input.medium
                value={addOrUpdate == 'add' ? dataAdd.olTen : dataUpdate.olTen}
                onChange={
                  addOrUpdate == 'add'
                    ? (e) => setDataAdd({ ...dataAdd, olTen: e.target.value })
                    : (e) => setDataUpdate({ ...dataUpdate, olTen: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="w-100">
            <Col className=" d-flex align-items-end pb-1" span={24}>
              {label.titlemd({
                children: intl.formatMessage({
                  id: 'pages.setting.hotelDefine.outlet.department',
                }),
              })}
            </Col>
            <Col span={24}>
              <select.group
                value={addOrUpdate == 'add' ? dataAdd.olBoPhan : dataUpdate.olBoPhan}
                onChange={
                  addOrUpdate == 'add'
                    ? (value) => setDataAdd({ ...dataAdd, olBoPhan: value })
                    : (value) => setDataUpdate({ ...dataUpdate, olBoPhan: value })
                }
              >
                {department.map((item) => {
                  return (
                    <select.option value={item.ma} key={item.ma}>
                      {item.boPhan}
                    </select.option>
                  );
                })}
              </select.group>
            </Col>
          </Row>
          <Row className="w-100">
            <Col className=" d-flex align-items-end pb-1" span={24}>
              {label.titlemd({
                children: intl.formatMessage({
                  id: 'pages.setting.hotelDefine.outlet.services',
                }),
              })}
            </Col>
            <Col span={24} className="pb-3">
              <select.group
                value={addOrUpdate == 'add' ? dataAdd.olDichVu : dataUpdate.olDichVu}
                onChange={
                  addOrUpdate == 'add'
                    ? (value) => setDataAdd({ ...dataAdd, olDichVu: value })
                    : (value) => setDataUpdate({ ...dataUpdate, olDichVu: value })
                }
              >
                {service.map((item) => {
                  return (
                    <select.option value={item.ma} key={item.ma}>
                      {item.dichVu}
                    </select.option>
                  );
                })}
              </select.group>
            </Col>
          </Row>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        setDataAdd({ olMaSo: '', olTen: '', olBoPhan: '', olDichVu: '' });
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
