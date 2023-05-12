import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import BookingInfo from './bookingInfo';

const Booking = () => {
  return (
    <Row
      style={{
        height: 'calc(100vh - 4.125rem)',

        display: 'flex',
      }}
    >
      <Col flex="auto" style={{ height: '100%', background: 'red' }}></Col>
      <Col flex="410px" style={{ padding: '8px' }}>
        <BookingInfo />
      </Col>
    </Row>
  );
};

export default Booking;
