import React, { useState, useRef, useEffect } from 'react';
import './floor.less';

const Floor = (props) => {
  const { floor } = props;
  return (
    <>
      <div className="floor-container">
        <div
          className="floor-style"
          style={{
            background: floor ? '#000' : 'transparent',
            boxShadow: floor ? '0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25)' : 'none',
          }}
        >
          <p>{floor}</p>
        </div>
      </div>
    </>
  );
};

export default Floor;
