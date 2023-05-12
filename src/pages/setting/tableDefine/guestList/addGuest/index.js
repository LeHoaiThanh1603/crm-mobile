import React, { useRef, useEffect, useState } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import './addGuest.less';
import { input } from '@/components/Input';
import { useIntl } from 'umi';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';
import { select } from '@/components/Select';
import { Row, Col } from 'antd';
import { Switch } from '@/components/Switch';
import phoneIcon from '@/pages/setting/companyDefine/company/asset/phone.svg';
import addressIcon from '@/pages/setting/companyDefine/company/asset/address.svg';
import emailIcon from '@/pages/setting/companyDefine/company/asset/email.svg';
import { useModel } from 'umi';
import Modal from '@/components/Popup';
import { formatNumber } from '@/e2e/extensionMethod';
import { log } from 'lodash-decorators/utils';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

function AddGuest({ addOrEdit, visible, close, dataEdit, updateData }) {
  const intl = useIntl();
  const ref = useRef();

  const [data, setData] = useState({
    id: 0
  });
  console.log(data.tag)
  const [isDropdownNameOpen, setIsDropdownNameOpen] = useState(false);
  const { guest } = useModel('guestdata');
  const {
    sourceCode,
    margetSegment,
    companyType,
    branch,
  } = useModel('companydata');

  useEffect(() => {
    if (visible) {
      if (addOrEdit == 'add')
        setData({
          id: 0,
          maKhach: '',
          maDangKy: null,
          danhXung: '',
          ten: '',
          tenDangKy: '',
          ngayDen: '',
          ngayDi: '',
          maPhongThue: '',
          birthday: '',
          quocTich: '',
          diaChi: '',
          dienThoai: '',
          email: '',
          congTy: null,
          margetSegment: null,
          sourceCode: null,
          type: null,
          branch: null,
          tag: ''
        });
      else
        setData(dataEdit);

      ref.current.focus();
    }
  }, [visible, dataEdit]);

  const editRoomService = () => {
    event.preventDefault();
    useFetch(
      '/api/Guest/UpdateGuest',
      'PUT',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({ id: res.mess }),
          );
          updateData();
          close();

        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const addRoomService = () => {
    event.preventDefault();
    useFetch(
      '/api/Guest/CreateGuest',
      'POST',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({ id: res.mess }),
          );
          updateData();
          close();

        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => {
        console.log(error)
        notification.error('Vui lòng nhập đầy đủ thông tin')
      },
    );
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <Modal
      size="xl"
      title={intl.formatMessage({ id: 'pages.setting.guestlist.modal.title' })}
      onOK={dataEdit.id == 0 ? addRoomService : editRoomService}
      visible={visible}
      onClose={close}
    >
      <div className="add-company-container py-1">
        <label.titlemd>
          {intl.formatMessage({
            id: 'pages.setting.guestlist.info',
          })}
          <span style={{ color: 'red' }}>*</span>
        </label.titlemd>
        <div className="py-1 px-3">
          <Row gutter={[25, 0]}>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.id',
                  })}
                </label.titlesm>
                <input.medium
                  required={true}
                  value={data.maKhach}
                  onChange={(e) => {
                    setData({ ...data, maKhach: e.target.value });
                  }}
                  ref={ref}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.id',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.madangky',
                  })}
                </label.titlesm>
                <input.number
                  value={data.maDangKy}
                  onChange={(value) => {
                    setData({ ...data, maDangKy: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.madangky',
                  })}
                  className="w-100"
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.name',
                  })}
                </label.titlesm>
                <div
                  className="position-relative"
                  onClick={() => {
                    if (data.ten != '') {
                      setIsDropdownNameOpen(!isDropdownNameOpen);
                    }
                  }}
                >
                  <input.medium
                    required={true}
                    value={data.ten}
                    onChange={(e) => {
                      setData({ ...data, ten: e.target.value });
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.guestlist.name',
                    })}
                    style={{ borderRadius: isDropdownNameOpen ? '10px 10px 0 0' : '10px' }}
                  />
                  {/* {isDropdownNameOpen && (
                    <div
                      className={`position-absolute  dropdown-container w-100 d-flex flex-column`}
                    // ${isDropdownNameOpen ? 'd-flex flex-column' : 'd-none'}
                    >
                      {guest.filter(x => x.ten.toUpperCase().includes(data.ten.toUpperCase()),
                      ).length === 0 ? (
                        <div>
                          {intl.formatMessage({ id: 'pages.setting.guestlist.name.nofound' })}
                        </div>
                      ) : (
                        guest.filter(x => x.ten.toUpperCase().includes(data.ten.toUpperCase()))
                          .map((item) => {
                            return (
                              <div key={item.ma}>
                                <label.titlelg>{item.ten}</label.titlelg>
                              </div>
                            );
                          })
                      )}
                    </div>
                  )} */}
                </div>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.tendangky',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.tenDangKy}
                  onChange={(e) => {
                    setData({ ...data, tenDangKy: e.target.value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.tendangky',
                  })}
                />
              </div>



              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.ngayden',
                  })}
                </label.titlesm>
                <Space
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <DatePicker
                    value={data.ngayDen ? moment(data.ngayDen) : null}

                    onChange={(date, dateString) => {
                      setData({ ...data, ngayDen: dateString })
                    }}
                    style={{
                      width: '100%',
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.guestlist.ngayden',
                    })}
                  />
                </Space>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.ngaydi',
                  })}
                </label.titlesm>
                <Space
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <DatePicker
                    value={data.ngayDi ? moment(data.ngayDi) : null}
                    // value={null}
                    onChange={(date, dateString) => {
                      setData({ ...data, ngayDi: dateString })
                    }}
                    style={{
                      width: '100%',
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.guestlist.ngaydi',
                    })}
                  />
                </Space>
              </div>
            </Col>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.address',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.diaChi}
                  onChange={(e) => {
                    setData({ ...data, diaChi: e.target.value });
                  }}
                  prefix={<img src={addressIcon} />}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.address',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.birthday',
                  })}
                </label.titlesm>
                <input.medium
                  type='date'
                  value={data.birthday}
                  onChange={(e) => {
                    setData({ ...data, birthday: e.target.value });
                  }}
                  // prefix={<img src={addressIcon} />}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.birthday',
                  })}
                />

                {/* <Space
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <DatePicker
                    value={data.birthday ? moment(data.birthday) : null}

                    onChange={(date, dateString) => {
                      setData({ ...data, birthday: dateString })
                    }}
                    style={{
                      width: '100%',
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.guestlist.birthday',
                    })}
                  />
                </Space> */}

              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.phone',
                  })}
                </label.titlesm>
                <input.medium
                  prefix={<img src={phoneIcon} />}
                  value={data.dienThoai}
                  onChange={(e) => {
                    setData({ ...data, dienThoai: e.target.value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.phone',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.email',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  prefix={<img src={emailIcon} />}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.email',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.national',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.quocTich}
                  onChange={(e) => {
                    setData({
                      ...data,
                      quocTich: e.target.value,
                    });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.national',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.tags',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.tag === null ? '' : data.tag}
                  onChange={(e) => {
                    setData({ ...data, tag: e.target.value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.tags',
                  })}
                />
              </div>
            </Col>
          </Row>
        </div>
        <hr className="m-2" />

        <label.titlemd>
          {intl.formatMessage({
            id: 'pages.setting.guestlist.statictis',
          })}
          <span style={{ color: 'red' }}>*</span>
        </label.titlemd>
        <div className="py-2 px-3">
          <Row gutter={[25, 0]}>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.sourcecode',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setSourceCodePopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, sourceCode: value });
                  }}
                  value={data.sourceCode}
                  onChange={(value) => {
                    setData({ ...data, sourceCode: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.sourcecode',
                  })}
                >
                  {sourceCode.map((item) => {
                    return (
                      <select.option value={item.ma} key={item.ma}>
                        {item.sourceCode}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.marketsegment',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setMarketSegmentPopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, marketSegment: value });
                  }}
                  value={data.marketSegment}
                  onChange={(value) => {
                    setData({ ...data, marketSegment: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.marketsegment',
                  })}
                >
                  {margetSegment.map((item) => {
                    return (
                      <select.option value={item.ma} key={item.ma}>
                        {item.marketSegment}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>
            </Col>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.type',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setTypePopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, type: value });
                  }}
                  value={data.loai}
                  onChange={(value) => {
                    setData({ ...data, type: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.type',
                  })}
                >
                  {companyType.map((item) => {
                    return (
                      <select.option value={item.ma} key={item.ma}>
                        {item.loaiCongTy}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.guestlist.branch',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setBranchPopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, branch: value });
                  }}
                  value={data.branch}
                  onChange={(value) => {
                    setData({ ...data, branch: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.guestlist.branch',
                  })}
                >
                  {branch.map((item) => {
                    return (
                      <select.option value={item.ma} key={item.ma}>
                        {item.branch}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export { AddGuest };
