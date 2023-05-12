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
import { selectMenu } from './selectMenu';
import Modal from '@/components/Popup';
import { Switch } from '@/components/Switch';
import { formatNumber } from '@/e2e/extensionMethod';
import './Info.less';
import UploadMenuImage from '../../../MenuPopup/UploadMenuImage/uploadImage';
import { pull, set } from 'lodash';
import { memo } from 'react';
import { URL_API } from '@/e2e/configSystem';

const ProductInfo = ({
  activeKey,
  addOrUpdateProduct,
  setDataInfo,
  setDataInfoUpdate,
  isShowModalProduct,
  recordUpdateProduct,
  dataInfo,
}) => {
  const inputRef = useRef();
  const intl = useIntl();
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [categorySort, setCategorySort] = useState([]);
  const urlImage = URL_API + '/assets/images/product/';

  const [data, setData] = useState({
    spSoHieuSp: '',
    spTenSanPham: '',
    spMoTa: '',
    spDonViTinh: '',
    spPhucVu: 5,
    spThueVat: 10,
    spThueDacBiet: 0,
    spGiaGoc: 0,
    spTienPhucVu: 0,
    spTienThueDacBiet: 0,
    spTienThueVat: 0,
    spGiaBan: 0,
    spImagePath: '',
    spPhanNhomDichVu: '',
    lspMaSo: '',
    spAlcohol: true,
    spRaw: true,
    spThoiGianCheBien: 0,
    spThoiGianPhucVu: 0,
    avatar: '',
  });
  const [costPrice, setCostPrice] = useState({
    cost: 0,
    price: 0,
  });
  const handleShowModalPreview = () => {
    setShowPreviewImg(true);
  };
  const handlePreviewImg = (img) => {
    setPreviewImage(img);
    setData({ ...data, avatar: img });
  };
  const sortCategory = () => {
    // let newCategory = [];
    // let children = [];
    // category.map((item) => {
    //   if (item.lspMaSoCha) {
    //     children.push(item);
    //   }
    // });
    // for (let i = 0; i < categoryCopy.length; i++) {
    //   if (!categoryCopy[i].lspMaSoCha) {
    //     let newChild = children.filter((x) => x.lspMaSoCha == categoryCopy[i].lspMaSo);
    //     if (categoryCopy[i].lspMaSo == newChild[0].lspMaSoCha) {
    //       newCategory.push(categoryCopy[i]);
    //       newCategory = newCategory.concat(newChild);
    //     }
    //   }
    // }
    // setCategorySort(newCategory);
  };

  useEffect(() => {
    inputRef.current.focus();
    sortCategory();
    if (addOrUpdateProduct == 'add') {
      setPreviewImage(null);
    }
  }, [activeKey, isShowModalProduct]);
  const onChangeCost = (e) => {
    data.spTienPhucVu = parseFloat(((e * data.spPhucVu) / 100).toFixed());
    data.spTienThueDacBiet = parseFloat(
      (((e + data.spTienPhucVu) * data.spThueDacBiet) / 100).toFixed(),
    );
    data.spTienThueVat = parseFloat(
      (((e + data.spTienPhucVu + data.spTienThueDacBiet) * data.spThueVat) / 100).toFixed(),
    );
    data.spGiaBan = parseFloat(
      (e + data.spTienPhucVu + data.spTienThueDacBiet + data.spTienThueVat).toFixed(),
    );

    setData({ ...data, spGiaGoc: e });
    setCostPrice({ cost: e, price: data.spGiaBan });
  };
  const onChangePrice = (e) => {
    data.spGiaGoc = parseFloat(
      (
        e /
        (
          (1 + data.spPhucVu / 100) *
          (1 + data.spThueDacBiet / 100) *
          (1 + data.spThueVat / 100)
        ).toFixed(3)
      ).toFixed(),
    );
    data.spTienPhucVu = parseFloat(((data.spGiaGoc * data.spPhucVu) / 100).toFixed());
    data.spTienThueDacBiet = parseFloat(
      (((data.spGiaGoc + data.spTienPhucVu) * data.spThueDacBiet) / 100).toFixed(),
    );
    data.spTienThueVat = parseFloat(
      (
        ((data.spGiaGoc + data.spTienPhucVu + data.spTienThueDacBiet) * data.spThueVat) /
        100
      ).toFixed(),
    );
    setData({ ...data, spGiaBan: e });
    setCostPrice({ cost: data.spGiaGoc, price: e });
  };

  const onChangeFee = () => {
    data.spGiaGoc = parseFloat(
      (
        costPrice.price /
        (
          (1 + data.spPhucVu / 100) *
          (1 + data.spThueDacBiet / 100) *
          (1 + data.spThueVat / 100)
        ).toFixed(3)
      ).toFixed(),
    );
    data.spTienPhucVu = parseFloat(((costPrice.cost * data.spPhucVu) / 100).toFixed());
    data.spTienThueDacBiet = parseFloat(
      (((costPrice.cost + data.spTienPhucVu) * data.spThueDacBiet) / 100).toFixed(),
    );
    data.spTienThueVat = parseFloat(
      (
        ((costPrice.cost + data.spTienPhucVu + data.spTienThueDacBiet) * data.spThueVat) /
        100
      ).toFixed(),
    );
    data.spGiaBan = parseFloat(
      (costPrice.cost + data.spTienPhucVu + data.spTienThueDacBiet + data.spTienThueVat).toFixed(),
    );
    setData({ ...data });
  };
  useEffect(() => {
    onChangeFee();
  }, [data.spPhucVu, data.spThueDacBiet, data.spThueVat]);
  useEffect(() => {
    setDataInfo(data);
  }, [data]);

  useEffect(() => {
    if (isShowModalProduct && activeKey == '1' && addOrUpdateProduct == 'update') {
      setData(recordUpdateProduct);
      setPreviewImage(
        recordUpdateProduct.spImagePath && urlImage + recordUpdateProduct.spImagePath,
      );
    }
    if (!isShowModalProduct) {
      setData({
        spSoHieuSp: '',
        spTenSanPham: '',
        spMoTa: '',
        spDonViTinh: '',
        spPhucVu: 5,
        spThueVat: 10,
        spThueDacBiet: 0,
        spGiaGoc: 0,
        spTienPhucVu: 0,
        spTienThueDacBiet: 0,
        spTienThueVat: 0,
        spGiaBan: 0,
        spImagePath: '',
        spPhanNhomDichVu: '',
        lspMaSo: '',
        spAlcohol: true,
        spRaw: true,
        spThoiGianCheBien: 0,
        spThoiGianPhucVu: 0,
        avatar: '',
      });
    }
  }, [activeKey, isShowModalProduct]);
  return (
    <div className="info-container">
      <Modal
        size={'s'}
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
      <Row gutter={[16, 16]} className="info-content pb-3">
        <Col className="main-info" xs={24} md={18}>
          <Row gutter={[16, 16]}>
            <Col style={{ paddingTop: '22px' }} xl={6} sm={24} md={8} xs={24}>
              <UploadMenuImage
                handleShowModalPreview={handleShowModalPreview}
                handlePreviewImg={handlePreviewImg}
                logo={data.spImagePath ? urlImage + data.spImagePath : null}
                isShowModalProduct={isShowModalProduct}
              />
            </Col>
            <Col sm={24} xl={18} md={16} xs={24}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.name',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <input.medium
                        ref={inputRef}
                        value={data.spTenSanPham}
                        onChange={(e) => setData({ ...data, spTenSanPham: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.category',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <selectMenu.group
                        allowAdd
                        onAdd={() => {
                          console.log('addcategory');
                        }}
                        value={data.lspMaSo}
                        onChange={(value) => setData({ ...data, lspMaSo: value })}
                      >
                        {categorySort.map((item, index) => {
                          if (!item.lspMaSoCha) {
                            return (
                              <selectMenu.option
                                value={item.lspMaSo}
                                key={index}
                                children={item.lspTenLoai}
                              />
                            );
                          } else {
                            return (
                              <selectMenu.option
                                value={item.lspMaSo}
                                key={index}
                                children={item.lspTenLoai}
                                isChildren
                              />
                            );
                          }
                        })}
                      </selectMenu.group>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.servicecode',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <input.medium
                        value={data.spSoHieuSp}
                        onChange={(e) => setData({ ...data, spSoHieuSp: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.servicegroup',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <select.group
                        value={data.spPhanNhomDichVu}
                        onChange={(value) => setData({ ...data, spPhanNhomDichVu: value })}
                      ></select.group>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.description',
                        }),
                      })}
                    </Col>
                    <Col className=" d-flex align-items-end" span={24}>
                      <input.comment
                        defaultValue=""
                        value={data.spMoTa}
                        onChange={(e) => setData({ ...data, spMoTa: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xl={{ span: 18, offset: 6 }} md={{ span: 16, offset: 8 }} xs={24}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.unit',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <select.group
                        value={data.spDonViTinh}
                        onChange={(value) => setData({ ...data, spDonViTinh: value })}
                      ></select.group>
                    </Col>
                  </Row>
                </Col>
                <Col span={12} className="d-flex align-items-end">
                  <Row className="w-100" gutter={[0, 4]}>
                    <Col xs={6} xl={5} md={12} className="d-flex align-items-center">
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.alcohol',
                        }),
                      })}
                    </Col>
                    <Col xs={6} xl={7} md={12}>
                      <Switch
                        value={data.spAlcohol}
                        onClick={(value) => setData({ ...data, spAlcohol: value })}
                      />
                    </Col>
                    <Col xs={6} xl={3} md={12} className="d-flex align-items-center">
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.raw',
                        }),
                      })}
                    </Col>
                    <Col xs={6} xl={9} md={12}>
                      <Switch
                        value={data.spRaw}
                        onClick={(value) => setData({ ...data, spRaw: value })}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.processingtime',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <input.number
                        value={data.spThoiGianCheBien}
                        onChange={(e) => setData({ ...data, spThoiGianCheBien: e })}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      {label.titlemd({
                        children: intl.formatMessage({
                          id: 'pages.setting.systemdefine.menu.servicingtime',
                        }),
                      })}
                    </Col>
                    <Col span={24}>
                      <input.number
                        value={data.spThoiGianPhucVu}
                        onChange={(e) => setData({ ...data, spThoiGianPhucVu: e })}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="sub-info" xs={24} md={6}>
          <Row gutter={[16, 16]}>
            <Col xs={12} md={24}>
              <Row>
                <Col span={24}>
                  {label.titlemd({
                    children: intl.formatMessage({
                      id: 'pages.setting.systemdefine.menu.cost',
                    }),
                  })}
                </Col>
                <Col span={24}>
                  <input.number
                    value={data.spGiaGoc}
                    onChange={(e) => onChangeCost(e)}
                    formatter={formatNumber}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={24}>
              <Row gutter={8}>
                <Col span={24}>
                  {label.titlemd({
                    children: intl.formatMessage({
                      id: 'pages.setting.systemdefine.menu.servicecharge',
                    }),
                  })}
                </Col>
                <Col xs={6} md={10} lg={8} xl={6}>
                  <input.number
                    min={0}
                    max={100}
                    value={data.spPhucVu}
                    onChange={(e) => setData({ ...data, spPhucVu: e })}
                  />
                </Col>
                <Col xs={18} md={14} lg={16} xl={18}>
                  <input.number disabled value={data.spTienPhucVu} formatter={formatNumber} />
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={24}>
              <Row gutter={8}>
                <Col span={24}>
                  {label.titlemd({
                    children: intl.formatMessage({
                      id: 'pages.setting.systemdefine.menu.specialtax',
                    }),
                  })}
                </Col>
                <Col xs={6} md={10} lg={8} xl={6}>
                  <input.number
                    min={0}
                    max={100}
                    value={data.spThueDacBiet}
                    onChange={(e) => setData({ ...data, spThueDacBiet: e })}
                  />
                </Col>
                <Col xs={18} md={14} lg={16} xl={18}>
                  <input.number disabled value={data.spTienThueDacBiet} formatter={formatNumber} />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={24}>
              <Row gutter={8}>
                <Col span={24}>
                  {label.titlemd({
                    children: intl.formatMessage({
                      id: 'pages.setting.systemdefine.menu.vat',
                    }),
                  })}
                </Col>
                <Col xs={6} md={10} lg={8} xl={6}>
                  <input.number
                    min={0}
                    max={100}
                    value={data.spThueVat}
                    onChange={(e) => setData({ ...data, spThueVat: e })}
                  />
                </Col>
                <Col xs={18} md={14} lg={16} xl={18}>
                  <input.number disabled value={data.spTienThueVat} formatter={formatNumber} />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={24}>
              <Row>
                <Col span={24}>
                  {label.titlemd({
                    children: intl.formatMessage({
                      id: 'pages.setting.systemdefine.menu.price',
                    }),
                  })}
                </Col>
                <Col span={24}>
                  <input.number
                    value={data.spGiaBan}
                    onChange={(e) => onChangePrice(e)}
                    formatter={formatNumber}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ProductInfo);
