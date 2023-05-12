import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import './hotelDefine.less';
import { Row, Col } from 'antd';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import UploadSingleImage from './uploadImage/uploadImage';
import { notification } from '@/components/Notification';
import { buttonList } from '@/components/Button';
import Modal from '@/components/Popup';
import { useFetch } from '@/components/Fetch/useFetch';
import { URL_API } from '@/e2e/configSystem';
import UploadMultipleImage from './uploadMultipleImage';
import UploadVideo from './uploadVideo';
import RichTextEditor from '@/components/Editor';
import loading from './assets/loading.svg';

const HotelDefine = () => {
  const intl = useIntl();
  const focusRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    address: '',
    faccebook: '',
    website: '',
    googleMap: '',
    tripadvisor: '',
    traveloka: '',
    agoda: '',
    bookingCom: '',
    backgrounds: [],
    logoData: '',
    passwifi: '',
    videoIntro: null,
    pinCode: '',
  });
  const [imageData, setImageData] = useState({
    logo: '',
    backgrounds: [],
  });
  const [checkExistHotel, setCheckExistHotel] = useState(false);
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const [showPreviewBackgroundImg, setShowPreviewBackgroundImg] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewBackgroundImage, setPreviewBackgroundImage] = useState('');
  const [previewHotel] = useState({ block: null });

  useEffect(() => {
    useFetch(
      '/api/Defines/GetHotel',
      'get',
      '',
      null,
      (res) => {
        if (res) {
          previewHotel.block = res.preview;

          setHotelData({
            ...hotelData,
            ...res,
          });
          setImageData({
            logo: URL_API + '/assets/images/hotelinfo/' + res.logo,
            backgrounds: res.backgrounds,
          });
          setPreviewImage(URL_API + '/assets/images/hotelinfo/' + res.logo);
          setCheckExistHotel(true);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  const handleShowModalPreview = () => {
    setShowPreviewImg(true);
  };
  const handlePreviewImg = (img) => {
    setPreviewImage(img);
    setHotelData({ ...hotelData, logoData: img });
  };

  const handleUpdated = (res) => {
    res.success == '1'
      ? notification.success(
          intl.formatMessage({
            id: res.mess,
            defaultMessage: 'Update success!',
          }),
          res.mess,
        )
      : notification.error(
          intl.formatMessage({
            id: res.mess,
            defaultMessage: 'Update error!',
          }),
          res.mess,
        );
  };

  const handleUploadBuild = (e) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(e.target.files).forEach((item) => {
      formData.append('formFile', item[1]);
    });
    useFetch(
      '/api/Defines/UploadBuildIPTV',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        } else if (res.success == 0) {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
        setIsLoading(false);
      },
      (err) => {
        console.log(err);
        setIsLoading(false);
      },
    );
  };

  const handleUpdateHotelData = () => {
    let data = {
      ...hotelData,
      preview: previewHotel.block,
    };

    if (checkExistHotel) {
      useFetch(
        '/api/Defines/UpdateHotel',
        'put',
        'application/json',
        JSON.stringify(data),
        handleUpdated,
        (err) => {
          console.log(err);
        },
      );
    } else {
      useFetch(
        '/api/Defines/CreateHotel',
        'post',
        'application/json',
        JSON.stringify(data),
        (res) => {
          if (res.success == '1') {
            notification.success(
              intl.formatMessage({
                id: res.mess,
                defaultMessage: 'Create success!',
              }),
              res.mess,
            );
          } else if (res.success == 0) {
            notification.error(
              intl.formatMessage({
                id: res.mess,
                defaultMessage: 'Create error!',
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
  };

  const onSaveEditor = (value) => {
    previewHotel.block = JSON.stringify(value);
  };

  return (
    <div className="hotel-define-container">
      <div className="setting">
        <Modal
          height={'350px'}
          width={'350px'}
          visible={showPreviewImg}
          title={intl.formatMessage({
            id: 'pages.setting.hoteldefine.logo',
          })}
          children={
            <div className="uploader-wrapper">
              <img src={previewImage} alt="logo" className="uploader-img" />
            </div>
          }
          onClose={() => {
            setShowPreviewImg(false);
          }}
          visibleOK={false}
          cancelTitle={intl.formatMessage({
            id: 'pages.setting.hoteldefine.ok',
            defaultMessage: 'OK',
          })}
        />
        <Modal
          height={'500px'}
          width={'500px'}
          visible={showPreviewBackgroundImg}
          title={intl.formatMessage({
            id: 'pages.setting.hoteldefine.logo',
          })}
          children={
            <div className="uploader-wrapper">
              <img src={previewBackgroundImage} alt="logo" className="uploader-img" />
            </div>
          }
          onClose={() => {
            setShowPreviewBackgroundImg(false);
          }}
          visibleOK={false}
          cancelTitle={intl.formatMessage({
            id: 'pages.setting.hoteldefine.ok',
            defaultMessage: 'OK',
          })}
        />
        <div className="d-flex align-items-center mb-3" style={{ gap: '10px' }}>
          <buttonList.save className="btn-setting-save" onClick={handleUpdateHotelData} />
          {/*<div className="uploadFile">*/}
          {/*  {!isLoading ? (*/}
          {/*    <buttonList.normal*/}
          {/*      title={intl.formatMessage({*/}
          {/*        id: 'pages.setting.hoteldefine.uploadbuild',*/}
          {/*      })}*/}
          {/*      className="btn-upload"*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <buttonList.icon className="loading" img={loading}></buttonList.icon>*/}
          {/*    // <button className="loading" style={{ background: '#55AEC6' }}>*/}
          {/*    //   <img src={loading}></img>*/}
          {/*    // </button>*/}
          {/*  )}*/}

          {/*  <input*/}
          {/*    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}*/}
          {/*    disabled={isLoading}*/}
          {/*    multiple*/}
          {/*    type="file"*/}
          {/*    onClick={(e) => (e.target.value = null)}*/}
          {/*    onChange={(e) => {*/}
          {/*      if (e.target.files.length !== 2) {*/}
          {/*        notification.warning(*/}
          {/*          intl.formatMessage({*/}
          {/*            id: 'systemalert.uploadbuild.wrongnumberoffiles',*/}
          {/*          }),*/}
          {/*        );*/}
          {/*        return;*/}
          {/*      }*/}
          {/*      let xmlFile = 0;*/}
          {/*      let wgtFile = 0;*/}
          {/*      Object.entries(e.target.files).forEach((item) => {*/}
          {/*        const nameArray = item[1].name.split('.');*/}
          {/*        const extension = nameArray[nameArray.length - 1];*/}
          {/*        if (extension === 'xml') xmlFile++;*/}
          {/*        if (extension === 'wgt') wgtFile++;*/}
          {/*      });*/}
          {/*      if (xmlFile != 1 || wgtFile != 1) {*/}
          {/*        notification.warning(*/}
          {/*          intl.formatMessage({*/}
          {/*            id: 'systemalert.uploadbuild.wrongformat',*/}
          {/*          }),*/}
          {/*        );*/}
          {/*        return;*/}
          {/*      }*/}
          {/*      handleUploadBuild(e);*/}
          {/*    }}*/}
          {/*  ></input>*/}
          {/*</div>*/}
        </div>
        <Row className="setting-content" gutter={[8, 8]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 10 }}
            xxl={{ span: 8 }}
          >
            <div className="setting-content-info d-flex flex-column py-4" style={{ gap: '30px' }}>
              <div className="d-flex align-items-center" style={{ height: '40px' }}>
                <div className="setting-content-info-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.namehotel/resort',
                    }),
                  })}
                </div>
                <div className="setting-content-info-row-input">
                  <input.medium
                    value={hotelData.hotelName}
                    onChange={(e) => setHotelData({ ...hotelData, hotelName: e.target.value })}
                    ref={focusRef}
                  />
                </div>
              </div>
              <div className="setting-content-info-address d-flex align-items-center">
                <div className="setting-content-info-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.address',
                    }),
                  })}
                </div>
                <div className="setting-content-info-input">
                  <input.medium
                    value={hotelData.address}
                    onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-info-tax d-flex align-items-center">
                <div className="setting-content-info-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.website',
                      defaultMessage: 'Website',
                    }),
                  })}
                </div>
                <div className="setting-content-info-input">
                  <input.medium
                    value={hotelData.website}
                    onChange={(e) => setHotelData({ ...hotelData, website: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-info-phone d-flex align-items-center">
                <div className="setting-content-info-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.facebook',
                      defaultMessage: 'Facebook',
                    }),
                  })}
                </div>
                <div className="setting-content-info-input">
                  <input.medium
                    value={hotelData.faccebook}
                    onChange={(e) => setHotelData({ ...hotelData, faccebook: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-info-fax d-flex align-items-center">
                <div className="setting-content-info-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.googlemap',
                      defaultMessage: 'Google Maps',
                    }),
                  })}
                </div>
                <div className="setting-content-info-input">
                  <input.medium
                    value={hotelData.googleMap}
                    onChange={(e) => setHotelData({ ...hotelData, googleMap: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 10 }}
            xxl={{ span: 8 }}
          >
            <div className="setting-content-price d-flex flex-column py-4" style={{ gap: '30px' }}>
              <div className="setting-content-price-adult d-flex align-items-center">
                <div className="setting-content-price-label-longlb">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.tripadvisor',
                      defaultMessage: 'Trip Advisor',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.tripadvisor}
                    onChange={(e) => setHotelData({ ...hotelData, tripadvisor: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-price-child d-flex align-items-center">
                <div className="setting-content-price-label-longlb">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.traveloka',
                      defaultMessage: 'Traveloka',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.traveloka}
                    onChange={(e) => setHotelData({ ...hotelData, traveloka: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-price-exctrabed d-flex align-items-center">
                <div className="setting-content-price-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.agoda',
                      defaultMessage: 'Agoda',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.agoda}
                    onChange={(e) => setHotelData({ ...hotelData, agoda: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-price-roomnumber d-flex align-items-center">
                <div className="setting-content-price-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.bookingcom',
                      defaultMessage: 'Booking.com',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.bookingCom}
                    onChange={(e) => setHotelData({ ...hotelData, bookingCom: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-price-roomnumber d-flex align-items-center">
                <div className="setting-content-price-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.passwifi',
                      defaultMessage: 'Pass Wifi',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.passwifi}
                    onChange={(e) => setHotelData({ ...hotelData, passwifi: e.target.value })}
                  />
                </div>
              </div>
              <div className="setting-content-price-roomnumber d-flex align-items-center">
                <div className="setting-content-price-label">
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.pincode',
                      defaultMessage: 'PIN Code',
                    }),
                  })}
                </div>
                <div className="setting-content-price-input">
                  <input.medium
                    value={hotelData.pinCode}
                    onChange={(e) => setHotelData({ ...hotelData, pinCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 4 }}
            xxl={{ span: 4 }}
          >
            <div className="setting-content-upload">
              <UploadSingleImage
                handleShowModalPreview={handleShowModalPreview}
                handlePreviewImg={handlePreviewImg}
                logo={imageData.logo ? imageData.logo : hotelData.logoData}
              />
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 20 }}
            xxl={{ span: 16 }}
          >
            <div className="setting-content-upload">
              <UploadMultipleImage
                data={imageData.backgrounds}
                onChange={(value) => {
                  setHotelData({
                    ...hotelData,
                    backgrounds: value,
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        {/*<Row className="my-4">*/}
        {/*  <Col*/}
        {/*    xs={{ span: 24 }}*/}
        {/*    sm={{ span: 24 }}*/}
        {/*    md={{ span: 24 }}*/}
        {/*    lg={{ span: 24 }}*/}
        {/*    xl={{ span: 20 }}*/}
        {/*    xxl={{ span: 16 }}*/}
        {/*  >*/}
        {/*    <div className="setting-content-upload">*/}
        {/*      <UploadVideo value={hotelData.videoIntro} />*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row className="my-4">*/}
        {/*  <Col*/}
        {/*    xs={{ span: 24 }}*/}
        {/*    sm={{ span: 24 }}*/}
        {/*    md={{ span: 24 }}*/}
        {/*    lg={{ span: 24 }}*/}
        {/*    xl={{ span: 20 }}*/}
        {/*    xxl={{ span: 16 }}*/}
        {/*  >*/}
        {/*    <div className="setting-content-upload">*/}
        {/*      <Row className="d-flex justify-content-center py-4">*/}
        {/*        <Col span={22} className="d-flex align-items-center justify-content-between">*/}
        {/*          <div className="d-flex align-items-center" style={{ gap: '10px' }}>*/}
        {/*            <label.titlelg>*/}
        {/*              {intl.formatMessage({*/}
        {/*                id: 'pages.setting.hoteldefine.introhotel',*/}
        {/*              })}*/}
        {/*              :*/}
        {/*            </label.titlelg>*/}
        {/*          </div>*/}
        {/*        </Col>*/}
        {/*        <div className="w-100 mt-3">*/}
        {/*          {previewHotel.block && (*/}
        {/*            <RichTextEditor onChange={onSaveEditor} value={previewHotel.block} />*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*      </Row>*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </div>
  );
};

export default HotelDefine;
