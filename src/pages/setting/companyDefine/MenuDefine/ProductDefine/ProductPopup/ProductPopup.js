import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { LanguageSelect } from '@/components/LanguageSelect';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { formatNumber } from '@/e2e/extensionMethod';
import { select } from '@/components/Select';
import UploadMenuImage from '../../MenuPopup/UploadMenuImage/uploadImage';
import { URL_API } from '@/e2e/configSystem';
import { Switch } from '@/components/Switch';
import { Tabs } from 'antd';
import './ProductPopup.less';
import ProductInfo from '../ProductTab/Info/Info';
import { update } from 'lodash';
import noImg from './noimage.svg';
import Combo from '../ProductTab/Combo/combo';
export function ProductPopup({
  setIsShowModalProduct,
  addOrUpdateProduct,
  isShowModalProduct,
  updateCategory,
  isShowModal,
  language,
  id,
  parent,
  edit,
  oldDataUpdate,
}) {
  const intl = useIntl();
  const inputRef = useRef();
  const [img, setImg] = useState();
  const [dataAdd, setDataAdd] = useState({
    id: 0,
    groupService: id,
    image: '',
    price: 0,
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
  const { groupService } = useModel('productdata');
  const [languageChoose, setLanguageChoose] = useState(language);
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
          setShowPreviewImg(false);
          setIsShowModalProduct(false);
          updateCategory();
          setLanguageChoose(language);
          setDataAdd({
            id: 0,
            groupService: id,
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
          setShowPreviewImg(false);
          setIsShowModalProduct(false);
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
          id: edit.id,
          groupService: edit.groupService,
          image: edit.image,
          imageData: edit.imageData,
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
      setPreviewImage(
        edit.image != '' ? `${URL_API}/assets/images/serviceitem/${edit.image}` : noImg,
      );
    } else {
      setPreviewImage(null);
      setDataAdd({
        id: 0,
        groupService: id,
        image: '',
        price: 0,
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
  }, [isShowModalProduct]);
  return (
    <Modal
      title={intl.formatMessage({
        id:
          addOrUpdateProduct == 'add'
            ? 'pages.setting.hotelservice.menu.addproduct'
            : 'pages.setting.hotelservice.menu.updateproduct',
      })}
      size={'sm'}
      visible={isShowModalProduct}
      children={
        <div className="product-popup-container">
          <div className="info-container">
            <Modal
              size={'s'}
              visible={showPreviewImg}
              title={intl.formatMessage({
                id: 'pages.setting.hotelservice.menu.image',
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
                id: 'pages.setting.hotelservice.menu.ok',
                defaultMessage: 'OK',
              })}
            />
            <Row gutter={[32, 16]}>
              <Modal
                size={'s'}
                visible={showPreviewImg}
                title={intl.formatMessage({
                  id: 'pages.setting.hotelservice.image',
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
                  id: 'pages.setting.hotelservice.menu.ok',
                  defaultMessage: 'OK',
                })}
              />

              <Col span={10} style={{ paddingTop: '1.5rem' }}>
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
                  logo={previewImage}
                  isShowModal={isShowModal}
                />
              </Col>
              <Col span={14}>
                <Row gutter={[16, 16]}>
                  <Row className="w-100 pt-2" style={{ marginTop: '16px' }}>
                    <Col className=" d-flex align-items-end pb-1" span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.hotelservice.servicecode',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <select.group
                        value={dataAdd.groupService}
                        onChange={(value) => setDataAdd({ ...dataAdd, groupService: value })}
                      >
                        {groupService.map((i, index) => (
                          <select.option key={index} value={i.id}>
                            {i.nameByLang.find((j) => j.language == languageChoose)
                              ? i.nameByLang.find((j) => j.language == languageChoose).name
                              : 'No Name'}
                          </select.option>
                        ))}
                      </select.group>
                    </Col>
                  </Row>
                  <Row className="w-100">
                    <Col className=" d-flex align-items-end pb-1" span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.hotelservice.servicecode',
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
                          id: 'pages.setting.hotelservice.name',
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
                          id: 'pages.setting.hotelservice.price',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <input.number
                        formatter={formatNumber}
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
                          id: 'pages.setting.hotelservice.description',
                        }),
                      })}
                    </Col>
                    <Col
                      className=" d-flex align-items-end"
                      style={{ marginBottom: '15px' }}
                      span={24}
                    >
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
        </div>
      }
      onClose={() => {
        setIsShowModalProduct(false);
      }}
      onOK={addOrUpdateProduct == 'add' ? handleAdd : handleUpdate}
    />
  );
}
