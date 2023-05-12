import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, DatePicker, Radio } from 'antd';
import { buttonList } from '@/components/Button';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { select } from '@/components/Select';
import RadioComponent from '@/components/Radio';
import { useModel } from 'umi';
import './bookingInfo.less';
import groupIcon from './asset/group.svg';
import walkinIcon from './asset/walkin.svg';
import addDepositIcon from './asset/adddeposit.svg';
import detailsIcon from './asset/details.svg';

const BookingInfo = () => {
  const { RangePicker } = DatePicker;
  const { sourceCode, margetSegment } = useModel('companydata');
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className="booking-info-container">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <buttonList.form.add />
        <buttonList.form.undo />
        <buttonList.form.save />
        <buttonList.form.delete />
        <buttonList.form.print />
        <buttonList.form.alert />
      </div>
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <label.titlexs>Booking Code</label.titlexs>
          <input.medium value="1234" style={{ width: '90px' }} className="booking-code" />
        </div>
        <div className="d-flex justify-content-center align-items-center " style={{ gap: '5px' }}>
          <input id="VAT" type="checkbox" />
          <label.titlelg>
            <label className="cursor-pointer" htmlFor="VAT">
              VAT
            </label>
          </label.titlelg>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ gap: '5px' }}
      >
        <input.medium ref={focusRef} placeholder="Booking Name" style={{ width: '180px' }} />
        <Radio.Group>
          <Radio value="walkin">
            <img src={walkinIcon} />
          </Radio>
          <Radio value="group">
            <img src={groupIcon} />
          </Radio>
        </Radio.Group>
        <select.color />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <RangePicker
          placeholder={['Arrival', 'Departure']}
          style={{ width: '180px', borderRadius: '10px' }}
          className="booking-date-picker"
        />
        <div>
          <buttonList.selectDay className="night-select" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end mb-1">
        <input.medium placeholder="Status" style={{ width: '180px' }} />
        <div className="d-flex flex-column aling-items-start">
          <label.titlexs>Confirm</label.titlexs>
          <DatePicker
            className="booking-date-picker"
            placeholder="Confirm"
            style={{ width: '180px' }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end mb-1">
        <select.group placeholder="Company" className="width-160">
          <select.option>A</select.option>
          <select.option>B</select.option>
          <select.option>C</select.option>
        </select.group>
        <div>
          <label.titlexs>Contact</label.titlexs>
          <input.medium placeholder="Contact" className="width-160" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label.titlexs>Deposit</label.titlexs>
          <input.medium
            placeholder="Deposit"
            className="width-160"
            suffix={<img className="cursor-pointer" src={addDepositIcon} />}
          />
        </div>
        <div>
          <label.titlexs>Tour code</label.titlexs>
          <input.medium placeholder="Tour code" className="width-160" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <select.group placeholder="Source code" className="width-160">
            {sourceCode.map((item) => {
              return (
                <select.option value={item.ma} key={item.ma}>
                  {item.sourceCode}
                </select.option>
              );
            })}
          </select.group>
        </div>
        <div>
          <select.group placeholder="Market segment" className="width-160">
            {margetSegment.map((item) => {
              return (
                <select.option value={item.ma} key={item.ma}>
                  {item.marketSegment}
                </select.option>
              );
            })}
          </select.group>
        </div>
      </div>
      <input.comment placeholder="Comment" className="mb-2" />
      <buttonList.icon title="Details" img={detailsIcon} className="mb-4" />
    </div>
  );
};

export default BookingInfo;
