import { Upload, Row, Col, Spin } from 'antd';
import { label } from '@/components/Label';
import { useIntl } from 'umi';
import { buttonList } from '@/components/Button';
import { notification } from '@/components/Notification/';
import { useEffect, useState, useRef } from 'react';
import { URL_API } from '@/e2e/configSystem';
import { useFetch } from '@/components/Fetch/useFetch';
import LoadingLogo2 from '@/components/LoadingLogo/loading';

const UploadVideo = ({ value }) => {
  const intl = useIntl();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();

  const handleBeforeUpload = (file) => {
    const isType = file.type.includes('video/');
    if (!isType) {
      notification.warning(
        intl.formatMessage({
          id: 'pages.setting.hoteldefine.onlyuploadvideo',
        }),
      );
    }

    return isType || Upload.LIST_IGNORE;
  };

  const handleChange = (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('formFile', e.target.files[0]);
    useFetch(
      '/api/Defines/UploadVideoIntroHotel',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          setVideo(`${URL_API}/assets/videos/${res.fileName}`);
        } else if (res.success == 0) {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
          );
        }
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [video]);

  useEffect(() => {
    if (value) {
      setVideo(`${URL_API}/assets/videos/${value}`);
    }
  }, [value]);

  return (
    <>
      <Row className="d-flex justify-content-center py-4">
        <Col span={22} className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center" style={{ gap: '10px' }}>
            <label.titlelg>
              {intl.formatMessage({
                id: 'pages.setting.hoteldefine.video',
              })}
              :
            </label.titlelg>
            <div className="uploadFile">
              <buttonList.normal
                title={intl.formatMessage({
                  id: 'pages.setting.hoteldefine.uploadvideo',
                })}
                className="btn-upload"
              />
              <input accept="video/*" type="file" onChange={handleChange}></input>
            </div>
          </div>
          {loading && (
            <div>
              <Spin className="me-3" spinning={loading}></Spin>
              <label.titlemd>
                {intl.formatMessage({
                  id: 'pages.setting.hoteldefine.uploading',
                })}
              </label.titlemd>
            </div>
          )}
        </Col>
        {video && (
          <div className="w-100 mt-3">
            <video controls className="w-100 px-3" ref={videoRef}>
              <source src={video}></source>
            </video>
          </div>
        )}
      </Row>
    </>
  );
};

export default UploadVideo;
