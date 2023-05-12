import React, { useRef, useEffect, useState } from 'react';
import { buttonList } from '../Button';
import { label } from '../Label';
import { Row, Col, Form } from 'antd';
import './popup.less';

export default function Modal({
  visible,
  onClose,
  size,
  children,
  groupButton,
  title,
  height,
  width,
  AddButton,
  okTitle,
  cancelTitle,
  onOK,
  visibleOK = true,
}) {
  const sizeList = {
    s: {
      xs: { span: 22 },
      sm: { span: 11 },
      md: { span: 9 },
      lg: { span: 7 },
      xl: { span: 6 },
      xxl: { span: 5 },
    },
    xs: {
      xs: { span: 22 },
      sm: { span: 14 },
      md: { span: 10 },
      lg: { span: 8 },
      xl: { span: 7 },
      xxl: { span: 6 },
    },
    sm: {
      xs: { span: 22 },
      sm: { span: 16 },
      md: { span: 12 },
      lg: { span: 10 },
      xl: { span: 9 },
      xxl: { span: 8 },
    },
    md: {
      xs: { span: 22 },
      sm: { span: 18 },
      md: { span: 14 },
      lg: { span: 12 },
      xl: { span: 11 },
      xxl: { span: 10 },
    },
    lg: {
      xs: { span: 22 },
      sm: { span: 20 },
      md: { span: 16 },
      lg: { span: 14 },
      xl: { span: 13 },
      xxl: { span: 12 },
    },
    xl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 18 },
      lg: { span: 16 },
      xl: { span: 15 },
      xxl: { span: 14 },
    },
    xxl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 20 },
      lg: { span: 18 },
      xl: { span: 17 },
      xxl: { span: 16 },
    },
    xxxl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 22 },
      xl: { span: 22 },
      xxl: { span: 22 },
    },
  };
  const popuptMainRef = useRef();
  const popuptRef = useRef();
  const onCLick = (e) => {
    if (!popuptRef.current.contains(e.target) && visible && onClose) {
      onClose();
    }
  };

  // useEffect(() => {
  //   document.addEventListener('mousedown', onCLick);
  //   return () => document.removeEventListener('mousedown', onCLick);
  // }, []);

  const thisSize = sizeList[size];

  return (
    <div ref={popuptMainRef} className={`modal-component ${visible ? 'd-flex' : 'd-none'} `}>
      <Row className="w-100" justify="center">
        <Col
          ref={popuptRef}
          style={{ maxWidth: `${width ? width : ''}` }}
          className={`modal-container`}
          {...thisSize}
        >
          <div className="header d-flex justify-content-between align-items-center pb-1">
            <div className="modal-group-title">
              <label.titlelg>{title}</label.titlelg>
            </div>
            <div>
              <buttonList.closeModal onClick={onClose}></buttonList.closeModal>
            </div>
          </div>
          <div className="body" style={{ minHeight: 100, maxHeight: `${height ? height : '90%'}` }}>
            {children}
          </div>
          <div className="footer d-flex justify-content-end align-items-center pt-3">
            {groupButton ? (
              groupButton
            ) : (
              <>
                {AddButton}
                <buttonList.cancel className="me-2" onClick={onClose} title={cancelTitle} />
                {visibleOK && <buttonList.submit title={okTitle} onClick={onOK} />}
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
