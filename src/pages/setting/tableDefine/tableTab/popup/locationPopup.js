import React, { useEffect, useState, useRef } from 'react';
import Modal from '@/components/Popup';
import { useIntl } from 'umi';
import { input } from '@/components/Input';
import { Col, Row, Space } from 'antd';
import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import ColorPicker from '../colorPicker';
import UploadSingleImage from '../uploadImage/uploadImage';

export default function LocationPopup({
  outletParent = '',
  value = null,
  showPopup = false,
  onClose,
  addOrEdit,
  onOK,
}) {
  const [data, setData] = useState({ ...value, olMaSo: outletParent });
  const inputRef = useRef();
  const intl = useIntl();
  const [showPreviewImg, setShowPreviewImg] = useState(false);

  useEffect(() => {
    if (showPopup) {
      setData({ ...value, olMaSo: outletParent });
      inputRef.current.focus();
    }
  }, [showPopup]);

  return (
    <Modal
      onOK={() => onOK(data)}
      visible={showPopup}
      onClose={() => {
        onClose();
      }}
      size={'sm'}
      title={intl.formatMessage({
        id:
          addOrEdit == 'add'
            ? 'pages.setting.tabledefine.addlocation'
            : 'pages.setting.tabledefine.editlocation',
      })}
    >
      <div className="content-location-popup mt-2 mb-2">
        <Row gutter={[14, 0]}>
          <Col span={8}>
            <UploadSingleImage
              handleShowModalPreview={() => setShowPreviewImg(true)}
              handlePreviewImg={(img) => {
                setData({ ...data, locImage: img });
              }}
              logo={data?.locImage}
            />
            {showPreviewImg && (
              <Modal
                size={'xs'}
                visible={showPreviewImg}
                title={intl.formatMessage({
                  id: 'pages.setting.tabledefine.locationimage',
                })}
                children={
                  <div className="uploader-wrapper">
                    <img src={data?.locImage} alt="logo" className="uploader-img w-100" />
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
            )}
          </Col>
          <Col span={16}>
            <Row gutter={[0, 14]}>
              <Col span={24}>
                <label.titlemd>
                  {intl.formatMessage({ id: 'pages.setting.tabledefine.locationname' })}
                </label.titlemd>
                <input.medium
                  value={data.locTen ? data.locTen : ''}
                  onChange={(e) => setData({ ...data, locTen: e.target.value })}
                  ref={inputRef}
                />
              </Col>
              <Col span={24}>
                <label.titlemd>
                  {intl.formatMessage({ id: 'pages.setting.tabledefine.locationdescription' })}
                </label.titlemd>
                <input.medium
                  value={data.locGhiChu ? data.locGhiChu : ''}
                  onChange={(e) => setData({ ...data, locGhiChu: e.target.value })}
                />
              </Col>
              <Col span={24}>
                <label.titlemd>
                  {intl.formatMessage({ id: 'pages.setting.tabledefine.locationletter' })}
                </label.titlemd>
                <input.medium
                  value={data.locLetter ? data.locLetter : ''}
                  onChange={(e) => setData({ ...data, locLetter: e.target.value })}
                />
              </Col>

              <Col span={24}>
                <label.titlemd>
                  {intl.formatMessage({ id: 'pages.setting.tabledefine.locationcolor' })}
                </label.titlemd>
                <ColorPicker
                  hexaColor={data?.locColor}
                  onChange={(value) => setData({ ...data, locColor: value })}
                />
              </Col>

              <Col span={24}>
                <Space>
                  <label.titlemd>
                    {intl.formatMessage({ id: 'pages.setting.tabledefine.locationactive' })}
                  </label.titlemd>
                  <Switch
                    value={data.locActive}
                    onClick={(value) => setData({ ...data, locActive: value })}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
