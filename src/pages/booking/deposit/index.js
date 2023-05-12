import React, { useState, useEffect } from 'react';
import Modal from '@/components/Popup';
import { Row, Col, Table } from 'antd';
import { label } from '@/components/Label';
import { select } from '@/components/Select';
import { useIntl } from 'umi';
import { input } from '@/components/Input';
import { buttonList } from '@/components/Button';
function Deposit() {
  const intl = useIntl();
  const [data, setData] = useState({
    bookingName: '',
    guestName: '',
    amount: '',
    currency: '',
    payment: '',
    description: '',
  });

  return (
    <Modal
      groupButton={
        <div style={{ width: '100%' }} className="d-flex justify-content-between">
          <buttonList.add></buttonList.add>
          <buttonList.edit></buttonList.edit>
          <buttonList.form.undo></buttonList.form.undo>
          <buttonList.save></buttonList.save>
          <buttonList.delete
            title={
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.button.delete2',
                  defaultMessage: 'Delete',
                })}
              </label.titlelg>
            }
          ></buttonList.delete>
          <buttonList.normal
            title={
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.button.close',
                  defaultMessage: 'Close',
                })}
              </label.titlelg>
            }
          ></buttonList.normal>
        </div>
      }
      title={'Add Deposit'}
      size={'sm'}
      width={'auto'}
      visible={false}
    >
      <label.titlesm>
        {intl.formatMessage({
          id: 'pages.roommap.booking.deposit.info',
          defaultMessage: 'Close',
        })}
        <span style={{ color: '#E22424' }}>*</span>
      </label.titlesm>
      <Row gutter={38} style={{ padding: '10px' }}>
        <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
          <div className="d-flex flex-column">
            {' '}
            <label.titlesm>
              {' '}
              {intl.formatMessage({
                id: 'pages.roommap.booking.deposit.bookingname',
                defaultMessage: 'Close',
              })}
            </label.titlesm>
            <select.group>
              <select.option>ssss</select.option>
            </select.group>
          </div>
          <div className="d-flex flex-column">
            {' '}
            <label.titlesm>
              {' '}
              {intl.formatMessage({
                id: 'pages.roommap.booking.deposit.guestname',
                defaultMessage: 'Close',
              })}
            </label.titlesm>
            <select.group>
              <select.option>ssss</select.option>
            </select.group>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              alignItems: 'end',
              gap: '16px',
            }}
          >
            <div className="d-flex flex-column">
              <label.titlesm>
                {' '}
                {intl.formatMessage({
                  id: 'pages.roommap.booking.deposit.amount',
                  defaultMessage: 'Close',
                })}
              </label.titlesm>
              <input.number style={{ width: '100%' }}></input.number>
            </div>
            <div className="d-flex flex-column">
              {' '}
              <label.titlesm>
                {' '}
                {intl.formatMessage({
                  id: 'pages.roommap.booking.deposit.currency',
                  defaultMessage: 'Close',
                })}
              </label.titlesm>
              <select.group>
                <select.option>ssss</select.option>
              </select.group>
            </div>{' '}
          </div>
        </Col>
        <Col span={12} className="d-flex flex-column" style={{ gap: '12px' }}>
          <div className="d-flex flex-column">
            {' '}
            <label.titlesm>
              {' '}
              {intl.formatMessage({
                id: 'pages.roommap.booking.deposit.paymentmethod',
                defaultMessage: 'Close',
              })}
            </label.titlesm>
            <select.group>
              <select.option>ssss</select.option>
            </select.group>
          </div>{' '}
          <div className="d-flex flex-column">
            {' '}
            <label.titlesm>
              {' '}
              {intl.formatMessage({
                id: 'pages.roommap.booking.deposit.description',
                defaultMessage: 'Close',
              })}
            </label.titlesm>
            <input.comment style={{ height: '85px' }} placeholder={'Descripton'}></input.comment>
          </div>{' '}
        </Col>
      </Row>
      <label.titlesm>
        {intl.formatMessage({
          id: 'pages.roommap.booking.deposit.descriptionlist',
          defaultMessage: 'Close',
        })}
        <span style={{ color: '#E22424' }}>*</span>
      </label.titlesm>
      <Row>
        <Col span={24}>
          <Table></Table>
        </Col>
      </Row>
    </Modal>
  );
}

export { Deposit };
