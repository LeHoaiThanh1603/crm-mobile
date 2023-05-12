import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
export default function SourceCodePopup(props) {
  let { isShowModal, setIsShowModal, addOrUpdate, updateSourceCode, recordUpdate } = props;
  const intl = useIntl();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    setDataUpdate({ ma: recordUpdate.ma, sourceCode: recordUpdate.sourceCode });
  }, [isShowModal]);

  const [dataAdd, setDataAdd] = useState({
    sourceCode: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    ma: 0,
    sourceCode: '',
  });
  const handleAdd = () => {
    useFetch(
      '/api/Company/CreateSourceCode',
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
          updateSourceCode();
          setIsShowModal(false);
          setDataAdd({ sourceCode: '' });
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
      '/api/Company/UpdateSourceCode',
      'put',
      'application/json',
      JSON.stringify(dataUpdate),
      (res) => {
        if (res.success == '1') {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
          updateSourceCode();
          setIsShowModal(false);
          setDataAdd({ sourceCode: '' });
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
  return (
    <Modal
      height={'350px'}
      width={'350px'}
      visible={isShowModal}
      title={intl.formatMessage({
        id:
          addOrUpdate == 'add'
            ? 'pages.setting.companydefine.addsourcecode'
            : 'pages.setting.companydefine.updatesourcecode',
      })}
      children={
        <Row gutter={[4, 4]} style={{ height: '100px' }}>
          <Col className=" d-flex align-items-end" span={24}>
            {label.titlemd({
              children: intl.formatMessage({
                id: 'pages.setting.companydefine.tablename',
              }),
            })}
          </Col>
          <Col span={24}>
            <input.medium
              ref={inputRef}
              value={addOrUpdate == 'add' ? dataAdd.sourceCode : dataUpdate.sourceCode}
              onChange={
                addOrUpdate == 'add'
                  ? (e) => setDataAdd({ ...dataAdd, sourceCode: e.target.value })
                  : (e) => setDataUpdate({ ...dataUpdate, sourceCode: e.target.value })
              }
            />
          </Col>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        setDataAdd({ sourceCode: '' });
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
