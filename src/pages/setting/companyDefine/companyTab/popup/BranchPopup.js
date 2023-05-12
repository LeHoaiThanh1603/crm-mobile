import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
export default function BranchPopup(props) {
  let { isShowModal, setIsShowModal, addOrUpdate, updateBranch, recordUpdate } = props;
  const intl = useIntl();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    setDataUpdate({ ma: recordUpdate.ma, branch: recordUpdate.branch });
  }, [isShowModal]);

  const [dataAdd, setDataAdd] = useState({
    branch: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    ma: 0,
    branch: '',
  });
  const handleAdd = () => {
    useFetch(
      '/api/Company/CreateBranch',
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
          updateBranch();
          setIsShowModal(false);
          setDataAdd({ branch: '' });
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
      '/api/Company/UpdateBranch',
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
          updateBranch();
          setIsShowModal(false);
          setDataAdd({ branch: '' });
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
            ? 'pages.setting.companydefine.addbranch'
            : 'pages.setting.companydefine.updatebranch',
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
              value={addOrUpdate == 'add' ? dataAdd.branch : dataUpdate.branch}
              onChange={
                addOrUpdate == 'add'
                  ? (e) => setDataAdd({ ...dataAdd, branch: e.target.value })
                  : (e) => setDataUpdate({ ...dataUpdate, branch: e.target.value })
              }
            />
          </Col>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        setDataAdd({ branch: '' });
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
