import React, { useState, useRef, useEffect } from 'react';
import './floor.less';

const Floor = (props) => {
  const { floor } = props;
  return (
    <>
      <div className="floor-container">
        <div className="floor-style">
          <p>{floor}</p>
        </div>
      </div>
    </>
  );
};

export default Floor;
