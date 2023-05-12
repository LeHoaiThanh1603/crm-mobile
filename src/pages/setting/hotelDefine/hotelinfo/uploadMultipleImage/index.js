import { Row, Upload, Col } from 'antd';
import Modal from '@/components/Popup';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import { getBase64 } from '@/e2e/extensionMethod';
import { label } from '@/components/Label';
import { URL_API } from '@/e2e/configSystem';
import './uploadMultipleImage.less';

const UploadMultipleImage = ({ onChange, data }) => {
  const intl = useIntl();
  const [showPreviewBackgroundImg, setShowPreviewBackgroundImg] = useState(false);
  const [previewBackgroundImage, setPreviewBackgroundImage] = useState('');
  const [backgroundList, setBackgroundList] = useState([]);
  const [fileList, setFileList] = useState([]);

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

  const handlePreview = (file) => {
    if (file.originFileObj) {
      getBase64(file.originFileObj, (img) => {
        setPreviewBackgroundImage(img);
      });
    } else {
      setPreviewBackgroundImage(file.url);
    }
    setShowPreviewBackgroundImg(true);
  };

  const handleChange = ({ fileList }) => {
    const list = [];
    fileList.map((item) => {
      if (item.originFileObj && (item.type === 'image/jpeg' || item.type === 'image/png')) {
        getBase64(item.originFileObj, (img) => {
          list.push({ data: img });
        });
      } else if (item.pictureType) {
        list.push({ id: item.id });
      }
    });
    setBackgroundList(list);
    setFileList(
      fileList.filter((item) => {
        return (
          item.pictureType == 'background' ||
          item.type === 'image/jpeg' ||
          item.type === 'image/png'
        );
      }),
    );
  };

  useEffect(() => {
    if (onChange) {
      onChange(backgroundList);
    }
  }, [backgroundList]);

  useEffect(() => {
    setFileList(
      data.map((item) => {
        return {
          url: URL_API + '/assets/images/background/' + item.path,
          id: item.id,
          pictureType: item.type,
        };
      }),
    );
  }, [data]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Modal
        height={'500px'}
        width={'500px'}
        visible={showPreviewBackgroundImg}
        title={intl.formatMessage({
          id: 'pages.setting.hoteldefine.background',
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
      <Row className="d-flex justify-content-center py-4">
        <Col span={22} className="d-flex flex-column align-items-center" style={{ gap: '10px' }}>
          <label.titlelg>
            {intl.formatMessage({
              id: 'pages.setting.hoteldefine.background',
            })}
          </label.titlelg>
          <Upload
            accept="image/png, image/jpeg"
            fileList={fileList}
            className="multiple-upload-container"
            beforeUpload={handleBeforeUpload}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </Col>
      </Row>
    </>
  );
};

export default UploadMultipleImage;
