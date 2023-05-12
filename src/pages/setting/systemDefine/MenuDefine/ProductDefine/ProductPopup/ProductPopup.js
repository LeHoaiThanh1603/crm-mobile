import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { select } from '@/components/Select';
import { Switch } from '@/components/Switch';
import { Tabs } from 'antd';
import './ProductPopup.less';
import ProductInfo from '../ProductTab/Info/Info';
import { update } from 'lodash';
import Combo from '../ProductTab/Combo/combo';
const { TabPane } = Tabs;
export function ProductPopup({
  isShowModalProduct,
  setIsShowModalProduct,
  addOrUpdateProduct,
  recordUpdateProduct,
}) {
  const intl = useIntl();
  const [activeKey, setActiveKey] = useState('1');
  const [dataInfo, setDataInfo] = useState({
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

  const handleOK = () => {
    switch (activeKey) {
      case '1':
        addOrUpdateProduct == 'add' ? handleAddProductInfo() : handleUpdateProductInfo();
        break;
      default:
        break;
    }
  };

  const handleAddProductInfo = () => {
    useFetch(
      '/api/Product/CreateProduct',
      'post',
      'application/json',
      JSON.stringify(dataInfo),
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateProduct();
          setIsShowModalProduct(false);
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
  const handleUpdateProductInfo = () => {
    useFetch(
      '/api/Product/UpdateProduct',
      'put',
      'application/json',
      JSON.stringify(dataInfo),
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateProduct();
          setIsShowModalProduct(false);
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
    if (!isShowModalProduct) {
      setDataInfo({
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
  }, [isShowModalProduct]);

  return (
    <Modal
      title={intl.formatMessage({
        id:
          addOrUpdateProduct == 'add'
            ? 'pages.setting.systemdefine.menu.addproduct'
            : 'pages.setting.systemdefine.menu.updateproduct',
      })}
      size={'xl'}
      visible={isShowModalProduct}
      children={
        <div className="product-popup-container">
          <Tabs
            size="large"
            onChange={(key) => {
              setActiveKey(key);
            }}
          >
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.setting.systemdefine.menu.info',
              })}
              key="1"
              activeKey={activeKey}
            >
              <ProductInfo
                activeKey={activeKey}
                addOrUpdateProduct={addOrUpdateProduct}
                setDataInfo={setDataInfo}
                isShowModalProduct={isShowModalProduct}
                recordUpdateProduct={recordUpdateProduct}
                dataInfo={dataInfo}
              />
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.setting.systemdefine.menu.price',
              })}
              key="2"
              activeKey={activeKey}
            >
              Price
            </TabPane>
            <TabPane
              tab={intl.formatMessage({
                id: 'pages.setting.systemdefine.menu.combo',
              })}
              key="3"
              activeKey={activeKey}
            >
              <Combo />
            </TabPane>
          </Tabs>
        </div>
      }
      onClose={() => {
        setIsShowModalProduct(false);
      }}
      onOK={handleOK}
    />
  );
}
