import React, { useRef, useEffect, useState } from 'react';
import Modal from '@/components/Popup';
import { useIntl, useModel } from 'umi';
import { Col, Row, Popconfirm } from 'antd';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { buttonList } from '@/components/Button';

export default function TablePopup({
  value = null,
  locationParent,
  visible = false,
  onClose,
  onOK,
  addOrEditTable,
  deleteTable,
}) {
  const { location, table } = useModel('hoteldata');
  const intl = useIntl();
  const inputRef = useRef();
  const [data, setData] = useState({
    bpTen: location?.find((item) => item.locMaSo == locationParent)?.locLetter,
    bpViTriX: 0,
    bpViTriY: 0,
    locMaSo: locationParent,
  });

  useEffect(() => {
    if (visible) {
      inputRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (typeof value == 'string') {
      setData(table?.find((item) => item.bpMaSo == value));
    } else if (typeof value == 'object') {
      setData({
        ...value,
        bpTen: location?.find((item) => item.locMaSo == locationParent)?.locLetter,
        locMaSo: locationParent,
      });
    }
  }, [value]);
  return (
    <div>
      <Modal
        title={
          addOrEditTable == 'add'
            ? intl.formatMessage({ id: 'pages.setting.tabledefine.addtable' })
            : intl.formatMessage({ id: 'pages.setting.tabledefine.edittable' })
        }
        size={'s'}
        visible={visible}
        onClose={onClose}
        onOK={() => onOK(data)}
      >
        <div className="content-table-popup my-4">
          <Row gutter={[38, 14]}>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.tablename' })}
              </label.titlemd>
              <input.medium
                ref={inputRef}
                value={data?.bpTen}
                onChange={(e) => setData({ ...data, bpTen: e.target.value })}
              />
            </Col>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.positionx' })}
              </label.titlemd>
              <input.number
                style={{ width: '100%' }}
                value={data?.bpViTriX}
                onChange={(value) => setData({ ...data, bpViTriX: value })}
                min={1}
              />
            </Col>
            <Col span={24}>
              <label.titlemd>
                {intl.formatMessage({ id: 'pages.setting.tabledefine.positiony' })}
              </label.titlemd>
              <input.number
                style={{ width: '100%' }}
                value={data?.bpViTriY}
                onChange={(value) => setData({ ...data, bpViTriY: value })}
                min={1}
              />
            </Col>
            <Col span={24}>
              {addOrEditTable == 'edit' && (
                <Popconfirm
                  placement="rightTop"
                  onConfirm={() => {
                    deleteTable(data.bpMaSo);
                  }}
                  title={intl.formatMessage({ id: 'pages.setting.tabledefine.confirmdelete' })}
                  okText={intl.formatMessage({ id: 'pages.setting.tabledefine.yes' })}
                  PopconfirmcancelText={intl.formatMessage({ id: 'pages.setting.tabledefine.no' })}
                >
                  <buttonList.delete />
                </Popconfirm>
              )}
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
