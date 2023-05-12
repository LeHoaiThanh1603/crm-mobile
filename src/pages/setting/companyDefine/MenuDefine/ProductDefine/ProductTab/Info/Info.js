import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Row, Col } from 'antd';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { select } from '@/components/Select';
import { LanguageSelect } from '@/components/LanguageSelect';
import Modal from '@/components/Popup';
import { Switch } from '@/components/Switch';
import { formatNumber } from '@/e2e/extensionMethod';
import './Info.less';
import UploadMenuImage from '../../../MenuPopup/UploadMenuImage/uploadImage';
import { pull, set } from 'lodash';
import { memo } from 'react';
import { URL_API } from '../../../../../../../e2e/configSystem';

const ProductInfo = ({
  activeKey,
  addOrUpdateProduct,
  Product,
  setDataInfo,
  setDataInfoUpdate,
  isShowModalProduct,
  recordUpdateProduct,

  dataInfo,
  isShowModal,
  setIsShowModal,
  language,

  parent,
  edit,
  updateCategory,
  oldDataUpdate,
}) => {
  const intl = useIntl();
  const inputRef = useRef();
  const { typeService } = useModel('productdata');
  const [dataAdd, setDataAdd] = useState({
    id: 0,
    typeService: '',
    image: '',
    price: '',
    imageData: '',
    serviceCode: '',
    nameByLang: [
      {
        id: 0,
        language: language,
        name: '',
        description: '',
      },
    ],
  });
  const [languageChoose, setLanguageChoose] = useState(language);
  const [dataUpdate, setDataUpdate] = useState({
    id: 0,
    typeService: '',
    image: '',
    serviceCode: '',
    imageData: '',
    price: '',
    nameByLang: [
      {
        id: 0,
        language: language,
        name: '',
        description: '',
      },
    ],
  });
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleShowModalPreview = () => {
    setShowPreviewImg(true);
  };
  const handlePreviewImg = (img) => {
    setPreviewImage(img);

    setDataAdd({ ...dataAdd, imageData: img });
  };

  useEffect(() => {
    addOrUpdateProduct == 'update' ? setDataAdd(edit) : undefined;
  }, []);

  const handleAdd = () => {
    useFetch(
      '/api/Defines/CreateServiceItem',
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
          setIsShowModal(false);
          updateCategory();
          setLanguageChoose(language);
          setDataAdd({
            id: 0,
            typeService: '',
            image: '',
            imageData: '',
            serviceCode: '',
            nameByLang: [
              {
                id: 0,
                language: language,
                name: '',
                description: '',
              },
            ],
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
      '/api/Defines/UpdateServiceItem',
      'put',
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
          setIsShowModal(false);
          updateCategory();
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
    // inputRef.current.focus();
    setLanguageChoose(language);
    if (addOrUpdateProduct == 'update') {
      if (edit.nameByLang.filter((i) => i.language == language).length == 0) {
        setDataAdd({
          id: 0,
          typeService: edit.typeService,
          image: edit.image,
          imageData: edit.image,
          price: edit.price,
          serviceCode: edit.serviceCode,
          nameByLang: [
            ...edit.nameByLang,
            { id: 0, language: language, name: '', description: '' },
          ],
        });
      } else {
        setDataAdd(edit);
      }

      setPreviewImage(oldDataUpdate.lspImage);
    } else {
      setPreviewImage(null);
      setDataAdd({
        id: 0,
        typeService: '',
        image: '',
        price: '',
        imageData: '',
        serviceCode: '',
        nameByLang: [
          {
            id: 0,
            language: language,
            name: '',
            description: '',
          },
        ],
      });
    }
    setDataUpdate(oldDataUpdate);
  }, [isShowModal]);
  return (
    <div className="info-container">
      <Modal
        size={'sm'}
        visible={showPreviewImg}
        title={intl.formatMessage({
          id: 'pages.setting.systemdefine.menu.image',
        })}
        children={
          <div className="uploader-wrapper">
            <img src={previewImage} className="uploader-img" />
          </div>
        }
        onClose={() => {
          setShowPreviewImg(false);
        }}
        visibleOK={false}
        cancelTitle={intl.formatMessage({
          id: 'pages.setting.systemdefine.menu.ok',
          defaultMessage: 'OK',
        })}
      />
      <Row gutter={[32, 16]}>
        {console.log(JSON.stringify(dataAdd))}
        <Modal
          size={'s'}
          visible={showPreviewImg}
          title={intl.formatMessage({
            id: 'pages.setting.systemdefine.image',
          })}
          children={
            <div className="uploader-wrapper">
              <img src={previewImage} className="uploader-img" />
            </div>
          }
          onClose={() => {
            setShowPreviewImg(false);
          }}
          visibleOK={false}
          cancelTitle={intl.formatMessage({
            id: 'pages.setting.systemdefine.menu.ok',
            defaultMessage: 'OK',
          })}
        />
        <Col span={10} style={{ paddingTop: '0.5rem' }}>
          <LanguageSelect
            value={languageChoose}
            onChange={(value) => {
              setLanguageChoose(value);
              dataAdd.nameByLang.filter((i) => i.language == value).length == 0
                ? setDataAdd({
                    ...dataAdd,
                    nameByLang: [
                      ...dataAdd.nameByLang,
                      {
                        language: value,
                        id: 0,
                        name: '',
                        description: '',
                      },
                    ],
                  })
                : undefined;
            }}
            style={{
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'start !important',
            }}
          ></LanguageSelect>
          <br></br>
          <UploadMenuImage
            handleShowModalPreview={handleShowModalPreview}
            handlePreviewImg={handlePreviewImg}
            logo={
              dataAdd.image != '' ? `${URL_API}/assets/images/groupservice/${dataAdd.image}` : ''
            }
            isShowModal={isShowModal}
          />
        </Col>
        <Col span={14}>
          <Row gutter={[16, 16]}>
            <Row className="w-100 pt-2">
              <Col className=" d-flex align-items-end pb-1" span={24}>
                {label.titlemd({
                  children: intl.formatMessage({
                    id: 'pages.setting.systemdefine.type',
                  }),
                })}
              </Col>
              <Col span={24}>
                <select.group
                  value={dataAdd.typeService}
                  onChange={(value) => setDataAdd({ ...dataAdd, typeService: value })}
                >
                  {typeService.map((i, index) => (
                    <select.option key={index} value={i.id}>
                      {i.name}
                    </select.option>
                  ))}
                </select.group>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className=" d-flex align-items-end pb-1" span={24}>
                {label.titlemd({
                  children: intl.formatMessage({
                    id: 'pages.setting.systemdefine.servicecode',
                  }),
                })}
              </Col>
              <Col span={24}>
                <input.medium
                  value={dataAdd.serviceCode}
                  onChange={(e) => {
                    setDataAdd({ ...dataAdd, serviceCode: e.target.value });
                  }}
                ></input.medium>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className=" d-flex align-items-end pb-1" span={24}>
                {label.titlemd({
                  children: intl.formatMessage({
                    id: 'pages.setting.systemdefine.name',
                  }),
                })}
              </Col>
              <Col span={24}>
                <input.medium
                  value={
                    dataAdd.nameByLang.filter((i) => i.language == languageChoose).length != 0
                      ? dataAdd.nameByLang.filter((i) => i.language == languageChoose)[0].name
                      : ''
                  }
                  onChange={(e) => {
                    dataAdd.nameByLang.map((i, index) => {
                      if (i.language == languageChoose) {
                        let arr = [...dataAdd.nameByLang];
                        let arr2 = { ...arr[index] };
                        arr2.name = e.target.value;
                        arr[index] = arr2;
                        return setDataAdd({ ...dataAdd, nameByLang: arr });
                      }
                    });
                  }}
                ></input.medium>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className=" d-flex align-items-end pb-1" span={24}>
                {label.titlemd({
                  children: intl.formatMessage({
                    id: 'pages.setting.systemdefine.price',
                  }),
                })}
              </Col>
              <Col span={24}>
                <input.number
                  value={dataAdd.price}
                  onChange={(e) => {
                    setDataAdd({ ...dataAdd, price: e });
                  }}
                ></input.number>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className=" d-flex align-items-end pb-1" span={24}>
                {label.titlemd({
                  children: intl.formatMessage({
                    id: 'pages.setting.systemdefine.description',
                  }),
                })}
              </Col>
              <Col className=" d-flex align-items-end" span={24}>
                <input.comment
                  rows={4}
                  value={
                    dataAdd.nameByLang.filter((i) => i.language == languageChoose).length != 0
                      ? dataAdd.nameByLang.filter((i) => i.language == languageChoose)[0]
                          .description
                      : ''
                  }
                  onChange={(e) => {
                    dataAdd.nameByLang.map((i, index) => {
                      if (i.language == languageChoose) {
                        let arr = [...dataAdd.nameByLang];
                        let arr2 = { ...arr[index] };
                        arr2.description = e.target.value;
                        arr[index] = arr2;
                        return setDataAdd({ ...dataAdd, nameByLang: arr });
                      }
                    });
                  }}
                />
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProductInfo);
