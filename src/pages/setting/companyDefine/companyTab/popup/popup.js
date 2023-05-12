import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col } from 'antd';
import { input } from '@/components/Input';
import { add } from 'lodash';
export default function (props) {
  let {
    isShowModal,
    setIsShowModal,
    addOrUpdate,
    dataAdd,
    setDataAdd,
    dataUpdate,
    setDataUpdate,
    handleAdd,
    handleUpdate,
    labelIdAdd,
    labelIdUpdate,
    labelIdname,
    tag,
  } = props;
  const intl = useIntl();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [isShowModal]);
  return (
    <Modal
      height={'350px'}
      width={'350px'}
      visible={isShowModal}
      title={intl.formatMessage({
        id: addOrUpdate == 'add' ? labelIdAdd : labelIdUpdate,
      })}
      children={
        <Row gutter={[4, 4]} style={{ height: '100px' }}>
          <Col className=" d-flex align-items-end" span={24}>
            {label.titlemd({
              children: intl.formatMessage({
                id: labelIdname,
              }),
            })}
          </Col>
          <Col span={24}>
            <input.medium
              ref={inputRef}
              value={
                addOrUpdate == 'add' && tag == 'branch'
                  ? dataAdd.branch
                  : addOrUpdate == 'update' && tag == 'branch'
                  ? dataUpdate.branch
                  : addOrUpdate == 'add' && tag == 'marketSegment'
                  ? dataAdd.marketSegment
                  : addOrUpdate == 'update' && tag == 'marketSegment'
                  ? dataUpdate.marketSegment
                  : addOrUpdate == 'add' && tag == 'sourceCode'
                  ? dataAdd.sourceCode
                  : addOrUpdate == 'update' && tag == 'sourceCode'
                  ? dataUpdate.sourceCode
                  : addOrUpdate == 'add' && tag == 'type'
                  ? dataAdd.loaiCongTy
                  : addOrUpdate == 'update' && tag == 'type'
                  ? dataUpdate.loaiCongTy
                  : ''
              }
              onChange={
                addOrUpdate == 'add' && tag == 'branch'
                  ? (e) => setDataAdd({ ...dataAdd, branch: e.target.value })
                  : addOrUpdate == 'update' && tag == 'branch'
                  ? (e) => setDataUpdate({ ...dataUpdate, branch: e.target.value })
                  : addOrUpdate == 'add' && tag == 'marketSegment'
                  ? (e) => setDataAdd({ ...dataAdd, marketSegment: e.target.value })
                  : addOrUpdate == 'update' && tag == 'marketSegment'
                  ? (e) => setDataUpdate({ ...dataUpdate, marketSegment: e.target.value })
                  : addOrUpdate == 'add' && tag == 'sourceCode'
                  ? (e) => setDataAdd({ ...dataAdd, sourceCode: e.target.value })
                  : addOrUpdate == 'update' && tag == 'sourceCode'
                  ? (e) => setDataUpdate({ ...dataUpdate, sourceCode: e.target.value })
                  : addOrUpdate == 'add' && tag == 'type'
                  ? (e) => setDataAdd({ ...dataAdd, loaiCongTy: e.target.value })
                  : addOrUpdate == 'update' && tag == 'type'
                  ? (e) => setDataUpdate({ ...dataUpdate, loaiCongTy: e.target.value })
                  : () => {}
              }
            />
          </Col>
        </Row>
      }
      onClose={() => {
        setIsShowModal(false);
        tag == 'branch'
          ? setDataAdd({ branch: '' })
          : tag == 'marketSegment'
          ? setDataAdd({ marketSegment: '' })
          : tag == 'sourceCode'
          ? setDataAdd({ sourceCode: '' })
          : tag == 'type'
          ? setDataAdd({ loaiCongTy: '' })
          : () => {};
      }}
      onOK={addOrUpdate == 'add' ? handleAdd : handleUpdate}
    />
  );
}
