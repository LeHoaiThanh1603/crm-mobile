import React, { useState, useRef, useEffect } from 'react';
import './switch.less';
function Switch({ onClick, value = false, readOnly = false }) {
  const [status, setStatus] = useState(value);

  useEffect(() => {
    setStatus(value);
  }, [value]);
  return (
    <div
      onClick={() => {
        if (!readOnly) {
          setStatus(!status);
          onClick ? onClick(!status) : '';
        }
      }}
      className={`${readOnly ? 'switchOnReadOnly' : ''}  switchComponent  ${
        status ? 'switchComponenton' : 'switchComponentoff'
      }`}
    >
      <div
        className={` ${readOnly ? 'switchOnReadOnly' : ''} switchDot ${
          status ? 'switchDoton' : 'switchDotoff'
        }`}
      ></div>
    </div>
  );
}

export { Switch };
