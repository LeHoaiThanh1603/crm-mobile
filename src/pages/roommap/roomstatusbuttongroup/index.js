import React, { useState, useRef, useEffect } from 'react';
import './roomstatusbuttongroup.less';

const RoomStatusButtonGroup = (props) => {
  return (
    <div className={`room-status-button-container ${props.visible ? 'd-flex' : 'd-none'}`}>
      <div className="room-status-button">Check-In</div>
      <div className="room-status-button">Check out</div>
      <div className="room-status-button">Walkin</div>
      <div className="room-status-button">Dirty</div>
      <div className="room-status-button">Out of order</div>
      <div className="room-status-button">Out of service</div>
      <div className="room-status-button">Birthday</div>
      <div className="room-status-button">Honeymoon</div>
      <div className="room-status-button">Extra bed</div>
      <div className="room-status-button">Connecting Room</div>
      <div className="room-status-button">Priority</div>
    </div>
  );
};

export default RoomStatusButtonGroup;
