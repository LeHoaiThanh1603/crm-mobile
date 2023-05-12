import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getBase64 } from '@/e2e/extensionMethod';
import '../uploadImage/uploadImage.less';
import { useEffect, useLayoutEffect, useState } from 'react';
import CropImage from '@/components/CropImage';
import { useIntl } from 'umi';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import removeSvg from './asset/remove.svg';

const UploadSingleImage = (props) => {
  const { handleShowModalPreview, handlePreviewImg, logo } = props;
  const intl = useIntl();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [emptyImg, setEmptyImg] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleBeforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      notification.warning(
        intl.formatMessage({
          id: 'pages.setting.tabledefine.onlyuploadimage',
        }),
      );
    }

    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);

        setImageUrl(null);
        setAvatar(imageUrl);

        setEmptyImg(false);
        handlePreviewImg(imageUrl);
      });
      return;
    }
  };
  const handleCancel = () => {
    setAvatar(null);
    setEmptyImg(true);
    handlePreviewImg('');
  };
  const onPreview = () => {
    handleShowModalPreview();
  };

  return (
    <>
      <div className="upload d-flex justify-content-center">
        <div className="upload-card mt-4">
          <div className="upload-header w-100 d-flex justify-content-center align-items-center">
            {label.titlesm({
              bold: 0,
              children: intl.formatMessage({
                id: 'pages.setting.tabledefine.locationimage',
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
                      id: 'pages.setting.tabledefine.selectfile',
                    }),
                  })}
                </div>
              </div>
            ) : avatar ? (
              <div className="uploader-wrap">
                <img src={avatar} alt="logo" className="uploader-wrap-img" />
              </div>
            ) : logo ? (
              <div className="uploader-wrap">
                <img src={logo} alt="logo" className="uploader-wrap-img" />
              </div>
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, opacity: '0.2' }}>
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.tabledefine.selectfile',
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
        </div>
      </div>
    </>
  );
};

export default UploadSingleImage;
