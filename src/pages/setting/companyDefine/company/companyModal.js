import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Popup';
import { useIntl, useModel } from 'umi';
import { label } from '@/components/Label';
import { Row, Col } from 'antd';
import { useFetch } from '@/components/Fetch/useFetch';
import { input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import { select } from '@/components/Select';
import { notification } from '@/components/Notification';
import MarketSegmentPopup from '../companyTab/popup/MarketSegmentPopup';
import BranchPopup from '../companyTab/popup/BranchPopup';
import SourceCodePopup from '../companyTab/popup/SourceCodePopup';
import TypePopup from '../companyTab/popup/TypePopup';
import IndustryModal from './industryModal';
import { BookerAdd } from '../booker/addBooker';
import addressIcon from './asset/address.svg';
import emailIcon from './asset/email.svg';
import phoneIcon from './asset/phone.svg';
import './company.less';

const CompanyModal = ({
  state,
  isModalVisible,
  handleModalVisible,
  popupType,
  resetData,
  fetchData,
  pagination,
  searchText,
}) => {
  const {
    company,
    sourceCode,
    margetSegment,
    companyType,
    companyIndustry,
    branch,
    booker,
    rateCode,
    updateMarketSegment,
    updateBranch,
    updateSourceCode,
    updateCompanyType,
    updateCompany,
  } = useModel('companydata');
  const intl = useIntl();
  const focusRef = useRef();
  const idRef = useRef();
  const open = useRef(false);
  const nameRef = useRef();
  const [marketSegmentPopupVisible, setMarketSegmentPopupVisible] = useState(false);
  const [branchPopupVisible, setBranchPopupVisible] = useState(false);
  const [sourceCodePopupVisible, setSourceCodePopupVisible] = useState(false);
  const [isDropdownIdOpen, setIsDropdownIdOpen] = useState(false);
  const [isDropdownNameOpen, setIsDropdownNameOpen] = useState(false);
  const [typePopupVisible, setTypePopupVisible] = useState(false);
  const [bookerPopupVisible, setBookerPopupVisible] = useState(false);
  const [industryPopupVisible, setIndustryPopupVisible] = useState(false);
  const [industryRender, setIndustryRender] = useState('');
  const [data, setData] = useState(
    state
      ? state
      : {
          hang: 1,
          isUse: 0,
          ota: 0,
          id: '',
          congty: '',
          tenGiaoDich: '',
          loai: null,
          industry: '',
          dienthoai: '',
          email: '',
          diaChi: '',
          booker: null,
          taiKhoanNganHang: '',
          maSoThue: '',
          sourceCode: null,
          marketSegment: null,
          branch: null,
          arAcount: false,
          reCreditLimit: null,
          rateCode: null,
        },
  );
  const [recordUpdate] = useState({
    ma: 0,
    marketSegment: '',
    branch: '',
    sourceCode: '',
    loaiCongTy: '',
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  });

  const companyIndustrySimple = [].concat.apply(
    [],
    companyIndustry.map((item) => item.children),
  );

  const closeBookerPopup = () => {
    setBookerPopupVisible(!bookerPopupVisible);
  };

  const onIndustryOK = (value) => {
    setIndustryPopupVisible(false);
    setData({ ...data, industry: value });
  };

  const createCompany = () => {
    useFetch(
      '/api/Company/CreateCompany',
      'POST',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          updateCompany();
          handleModalVisible();
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          resetData();
          fetchData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: '',
            sortOrder: '',
            searchInfo: searchText,
          });
        } else if (res.success == 0) {
          notification.warning(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const editCompany = () => {
    useFetch(
      '/api/Company/UpdateCompany',
      'PUT',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          updateCompany();
          handleModalVisible();
          resetData();
          fetchData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: '',
            sortOrder: '',
            searchInfo: searchText,
          });
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
        } else if (res.success == 0) {
          notification.warning(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const onClick = (e) => {
    if (!idRef.current?.contains(e.target)) {
      setIsDropdownIdOpen(false);
    }
    if (!nameRef.current?.contains(e.target)) {
      setIsDropdownNameOpen(false);
    }
  };

  useEffect(() => {
    let renderArray = [];
    const idArray = data.industry?.split(',');
    idArray?.forEach((item) => {
      renderArray.push(
        companyIndustrySimple.find((industry) => {
          return industry.ma == item;
        })?.tenNganh,
      );
    });
    setIndustryRender(renderArray.join('; '));
  }, [data.industry]);

  useEffect(() => {
    if (data.id !== '' && open.current) {
      setIsDropdownIdOpen(true);
    } else {
      setIsDropdownIdOpen(false);
    }
  }, [data.id]);

  useEffect(() => {
    if (data.congty !== '' && open.current) {
      setIsDropdownNameOpen(true);
    } else {
      setIsDropdownNameOpen(false);
    }
  }, [data.congty]);

  useEffect(() => {
    if (state) {
      if (!isModalVisible) {
        setData({
          hang: 1,
          isUse: 0,
          ota: 0,
          id: '',
          congty: '',
          tenGiaoDich: '',
          loai: null,
          industry: '',
          dienthoai: '',
          email: '',
          diaChi: '',
          booker: null,
          taiKhoanNganHang: '',
          maSoThue: '',
          sourceCode: null,
          marketSegment: null,
          branch: null,
          arAcount: false,
          reCreditLimit: null,
          rateCode: null,
        });
      } else {
        setData(state);
        focusRef.current.focus();
      }
    } else {
      setData({
        hang: 1,
        isUse: 0,
        ota: 0,
        id: '',
        congty: '',
        tenGiaoDich: '',
        loai: null,
        industry: '',
        dienthoai: '',
        email: '',
        diaChi: '',
        booker: null,
        taiKhoanNganHang: '',
        maSoThue: '',
        sourceCode: null,
        marketSegment: null,
        branch: null,
        arAcount: false,
        reCreditLimit: null,
        rateCode: null,
      });
      focusRef.current.focus();
    }
    if (isModalVisible) {
      const timeout = () => {
        open.current = true;
      };
      setTimeout(timeout, 200);
      return () => clearTimeout(timeout);
    } else {
      open.current = false;
    }
  }, [isModalVisible]);

  useEffect(() => {
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  return (
    <Modal
      onOK={popupType === 'add' ? createCompany : editCompany}
      visible={isModalVisible}
      onClose={() => {
        handleModalVisible();
      }}
      size="sm"
      title={intl.formatMessage({
        id: `pages.setting.companydefine.company.${
          popupType === 'add' ? 'addcompany' : 'editcompany'
        }`,
      })}
    >
      <MarketSegmentPopup
        isShowModal={marketSegmentPopupVisible}
        setIsShowModal={setMarketSegmentPopupVisible}
        addOrUpdate="add"
        updateMarketSegment={updateMarketSegment}
        recordUpdate={recordUpdate}
      />
      <BranchPopup
        isShowModal={branchPopupVisible}
        setIsShowModal={setBranchPopupVisible}
        addOrUpdate="add"
        updateBranch={updateBranch}
        recordUpdate={recordUpdate}
      />
      <SourceCodePopup
        isShowModal={sourceCodePopupVisible}
        setIsShowModal={setSourceCodePopupVisible}
        addOrUpdate="add"
        updateSourceCode={updateSourceCode}
        recordUpdate={recordUpdate}
      />
      <TypePopup
        isShowModal={typePopupVisible}
        setIsShowModal={setTypePopupVisible}
        addOrUpdate="add"
        updateCompanyType={updateCompanyType}
        recordUpdate={recordUpdate}
      />
      <BookerAdd
        dataEdit={recordUpdate}
        updateData={() => {}}
        delDataEdit={() => {}}
        visible={bookerPopupVisible}
        close={closeBookerPopup}
      />
      <IndustryModal
        industryValueProps={data.industry}
        onOK={onIndustryOK}
        isModalVisible={industryPopupVisible}
        setIsModalVisible={setIndustryPopupVisible}
      />
      <div className="add-company-container py-1">
        <label.titlemd>
          {intl.formatMessage({
            id: 'pages.setting.companydefine.company.info',
          })}
          <span style={{ color: 'red' }}>*</span>
        </label.titlemd>
        <div className="py-1 px-3">
          <Row>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.id',
                  })}
                </label.titlesm>
                <div
                  className="position-relative"
                  ref={idRef}
                  onClick={() => {
                    if (data.id != '') {
                      setIsDropdownIdOpen(!isDropdownIdOpen);
                    }
                  }}
                >
                  <input.medium
                    required={true}
                    value={data.id}
                    onChange={(e) => {
                      setData({ ...data, id: e.target.value });
                    }}
                    ref={focusRef}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.companydefine.company.code',
                    })}
                    style={{ borderRadius: isDropdownIdOpen ? '10px 10px 0 0' : '10px' }}
                  />
                  {isDropdownIdOpen && (
                    <div
                      className={`position-absolute  dropdown-container w-100 d-flex flex-column`}
                      // ${isDropdownIdOpen ? 'd-flex flex-column' : 'd-none' }
                    >
                      {company.filter((companyItem) =>
                        companyItem.id.toUpperCase().includes(data.id.toUpperCase()),
                      ).length === 0 ? (
                        <div>
                          {intl.formatMessage({ id: 'pages.setting.companydefine.id.nofound' })}
                        </div>
                      ) : (
                        company
                          .filter((companyItem) =>
                            companyItem.id.toUpperCase().includes(data.id.toUpperCase()),
                          )
                          .map((item) => {
                            return (
                              <div key={item.ma}>
                                <label.titlelg>{item.id}</label.titlelg>
                              </div>
                            );
                          })
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.name',
                  })}
                </label.titlesm>
                <div
                  className="position-relative"
                  ref={nameRef}
                  onClick={() => {
                    if (data.congty != '') {
                      setIsDropdownNameOpen(!isDropdownNameOpen);
                    }
                  }}
                >
                  <input.medium
                    required={true}
                    value={data.congty}
                    onChange={(e) => {
                      setData({ ...data, congty: e.target.value });
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.companydefine.company.name',
                    })}
                    style={{ borderRadius: isDropdownNameOpen ? '10px 10px 0 0' : '10px' }}
                  />
                  {isDropdownNameOpen && (
                    <div
                      className={`position-absolute  dropdown-container w-100 d-flex flex-column`}
                      // ${isDropdownNameOpen ? 'd-flex flex-column' : 'd-none'}
                    >
                      {company.filter((companyItem) =>
                        companyItem.congTy.toUpperCase().includes(data.congty.toUpperCase()),
                      ).length === 0 ? (
                        <div>
                          {intl.formatMessage({ id: 'pages.setting.companydefine.name.nofound' })}
                        </div>
                      ) : (
                        company
                          .filter((companyItem) =>
                            companyItem.congTy.toUpperCase().includes(data.congty.toUpperCase()),
                          )
                          .map((item) => {
                            return (
                              <div key={item.ma}>
                                <label.titlelg>{item.congTy}</label.titlelg>
                              </div>
                            );
                          })
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.legalname',
                  })}
                </label.titlesm>
                <input.medium
                  required={true}
                  value={data.tenGiaoDich}
                  onChange={(e) => {
                    setData({ ...data, tenGiaoDich: e.target.value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.legalname',
                  })}
                />
              </div>
              <div
                className="input-item-container d-flex flex-column"
                style={{ gap: '4px', height: '52px', paddingTop: '3px' }}
              >
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.creditlimit',
                  })}
                </label.titlesm>
                <input.number
                  value={data.reCreditLimit}
                  onChange={(value) => {
                    setData({ ...data, reCreditLimit: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.creditlimit',
                  })}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  className="w-100"
                />
              </div>

              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.booker',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setBookerPopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, booker: value });
                  }}
                  value={data.booker}
                  onChange={(value) => {
                    setData({ ...data, booker: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.booker',
                  })}
                >
                  {booker.map((item) => {
                    return (
                      <select.option value={item.id} key={item.id}>
                        {item.name}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>

              <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.ar',
                  })}
                </label.titlesm>
                <Switch
                  value={data.arAcount}
                  onClick={(value) => {
                    setData({ ...data, arAcount: value });
                  }}
                />
              </div>
            </Col>
            <Col span={12} className="d-flex flex-column align-items-end" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.address',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.diaChi}
                  onChange={(e) => {
                    setData({ ...data, diaChi: e.target.value });
                  }}
                  prefix={<img src={addressIcon} />}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.address',
                  })}
                />
              </div>

              <div className="input-item-container d-flex justify-content-between align-items-end">
                <div className="d-flex flex-column" style={{ width: '48%', gap: '4px' }}>
                  <label.titlesm>
                    {intl.formatMessage({
                      id: 'pages.setting.companydefine.company.tax',
                    })}
                  </label.titlesm>
                  <input.number
                    className="w-100"
                    value={data.maSoThue}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.companydefine.company.tax',
                    })}
                    onChange={(value) => {
                      setData({ ...data, maSoThue: value ? value.toString() : '' });
                    }}
                  />
                </div>

                <div style={{ width: '48%' }}>
                  <label.titlesm>
                    {intl.formatMessage({
                      id: 'pages.setting.companydefine.company.phone',
                    })}
                  </label.titlesm>
                  <input.medium
                    value={data.dienthoai}
                    onChange={(e) => {
                      setData({ ...data, dienthoai: e.target.value });
                    }}
                    prefix={<img src={phoneIcon} />}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.companydefine.company.phone',
                    })}
                  />
                </div>
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.email',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  prefix={<img src={emailIcon} />}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.email',
                  })}
                />
              </div>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.bankaccount',
                  })}
                </label.titlesm>
                <input.medium
                  value={data.taiKhoanNganHang}
                  onChange={(e) => {
                    setData({
                      ...data,
                      taiKhoanNganHang: e.target.value,
                    });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.bankaccount',
                  })}
                />
              </div>

              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.ratecode',
                  })}
                </label.titlesm>
                <select.group
                  value={data.rateCode}
                  onChange={(value) => {
                    setData({ ...data, rateCode: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.ratecode',
                  })}
                >
                  {rateCode.map((item) => {
                    return (
                      <select.option key={item.ma} value={item.ma}>
                        {item.ma}
                      </select.option>
                    );
                  })}
                </select.group>
              </div>
            </Col>
          </Row>
        </div>
        <hr className="m-2" />

        <label.titlemd>
          {intl.formatMessage({
            id: 'pages.setting.companydefine.company.statictis',
          })}
          <span style={{ color: 'red' }}>*</span>
        </label.titlemd>
        <div className="py-2 px-3">
          <Row>
            <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.sourcecode',
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
                    id: 'pages.setting.companydefine.company.sourcecode',
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
                    id: 'pages.setting.companydefine.company.marketsegment',
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
                    id: 'pages.setting.companydefine.company.marketsegment',
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
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.industrycompany',
                  })}
                </label.titlesm>
                <div
                  onClick={() => {
                    setIndustryPopupVisible(true);
                  }}
                  className="cursor-pointer"
                >
                  <input.medium
                    className="industry-company-cursor"
                    readOnly
                    value={industryRender}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.companydefine.company.industrycompany',
                    })}
                  />
                </div>
              </div>
            </Col>
            <Col span={12} className="d-flex flex-column align-items-end" style={{ gap: '12px' }}>
              <div className="input-item-container">
                <label.titlesm>
                  {intl.formatMessage({
                    id: 'pages.setting.companydefine.company.type',
                  })}
                </label.titlesm>
                <select.group
                  allowAdd
                  onAdd={() => {
                    setTypePopupVisible(true);
                  }}
                  onAddComplete={(value) => {
                    setData({ ...data, loai: value });
                  }}
                  value={data.loai}
                  onChange={(value) => {
                    setData({ ...data, loai: value });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.setting.companydefine.company.type',
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
                    id: 'pages.setting.companydefine.company.branch',
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
                    id: 'pages.setting.companydefine.company.branch',
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
};

export default CompanyModal;
