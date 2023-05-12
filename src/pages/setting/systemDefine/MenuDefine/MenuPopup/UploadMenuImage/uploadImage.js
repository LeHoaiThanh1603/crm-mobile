import { Row, Upload, Col } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getBase64 } from '@/e2e/extensionMethod';
import './uploadImage.less';
import { useEffect, useLayoutEffect, useState } from 'react';
import CropImage from '@/components/CropImage';
import { useIntl } from 'umi';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import removeSvg from './asset/remove.svg';

const UploadMenuImage = (props) => {
  const { handleShowModalPreview, handlePreviewImg, logo, isShowModal, isShowModalProduct } = props;
  const intl = useIntl();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [emptyImg, setEmptyImg] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.warning(
        intl.formatMessage({
          id: 'pages.setting.hoteldefine.onlyuploadimage',
        }),
      );
    }

    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(true);
        setOpenCrop(true);
      });
      return;
    }
  };
  const handleCancel = () => {
    setAvatar(null);
    setEmptyImg(true);
    handlePreviewImg(null);
  };
  const onPreview = () => {
    handleShowModalPreview();
  };

  const setCropAvatarImage = (img) => {
    setImageUrl(null);
    setAvatar(img);
    setLoading(false);
    setOpenCrop(false);
    setEmptyImg(false);
    handlePreviewImg(img);
  };

  useEffect(() => {
    if (!isShowModal) {
      setAvatar(null);
    } else {
      setEmptyImg(false);
    }
  }, [isShowModal]);
  useEffect(() => {
    if (!isShowModalProduct) {
      setAvatar(null);
    } else {
      setEmptyImg(false);
    }
  }, [isShowModalProduct]);
  return (
    <>
      <CropImage
        srcImg={imageUrl}
        onComplete={setCropAvatarImage}
        open={openCrop}
        close={() => setOpenCrop(false)}
      />
      <Row className="upload">
        <Col span={24} className="upload-card mb-2">
          <div className="upload-header w-100 d-flex justify-content-center align-items-center">
            {label.titlesm({
              bold: 0,
              children: intl.formatMessage({
                id: 'pages.setting.systemdefine.menu.image',
              }),
            })}
          </div>
          <Upload
            name="image"
            listType="picture-card"
            className="uploader avatar-uploader d-flex align-items-center justify-content-center"
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            showUploadList={false}
          >
            {emptyImg ? (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, opacity: '0.2' }}>
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.selectfile',
                    }),
                  })}
                </div>
              </div>
            ) : avatar ? (
              <div className="uploader-wrap">
                <img src={avatar} className="uploader-wrap-img" />
              </div>
            ) : logo ? (
              <div className="uploader-wrap">
                <img src={logo} className="uploader-wrap-img" />
              </div>
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, opacity: '0.2' }}>
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.selectfile',
                    }),
                  })}
                </div>
              </div>
            )}
          </Upload>
          <div className="operation-img d-flex justify-content-center pb-2">
            <EyeOutlined className="preview-img" onClick={onPreview} />
            <img className="remove-img" alt="remove" src={removeSvg} onClick={handleCancel} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UploadMenuImage;
