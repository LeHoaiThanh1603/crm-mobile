import React, { useState, useRef, useEffect } from 'react';
import { useIntl, useModel } from 'umi';
import Modal from '@/components/Popup';
import { Col, Row } from 'antd';
import { label } from '@/components/Label';
import { input } from '@/components/Input';

export default function QuickTablePopup({ locationParent, visible = false, onClose, onOK }) {
  const { location } = useModel('hoteldata');
  const inputRef = useRef();
  const intl = useIntl();
  const [data, setData] = useState({
    number: 0,
    row: 0,
    location: locationParent,
    letter: location?.find((item) => item.locMaSo == locationParent)?.locLetter,
  });

  useEffect(() => {
    if (visible) {
      inputRef.current.focus();
    }
  }, [visible]);
  return (
    <div>
      <Modal
        title={intl.formatMessage({ id: 'pages.setting.tabledefine.addmultipletable' })}
        size={'s'}
        visible={visible}
        onClose={onClose}
        onOK={() => onOK(data)}
      >
        <div className="content-multiple-table-popup my-4">
          <Row gutter={[38, 14]}>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.tablenamehead' })}
              </label.titlemd>
              <input.medium
                ref={inputRef}
                value={data.letter}
                onChange={(e) => setData({ ...data, letter: e.target.value })}
              />
            </Col>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.tablenumber' })}
              </label.titlemd>
              <input.number
                min={0}
                style={{ width: '100%' }}
                value={data.number}
                onChange={(value) => setData({ ...data, number: value })}
              />
            </Col>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.tablerow' })}
              </label.titlemd>
              <input.number
                min={0}
                style={{ width: '100%' }}
                value={data.row}
                onChange={(value) => setData({ ...data, row: value })}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
