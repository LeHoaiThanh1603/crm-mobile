import React, { useRef, useState } from 'react';
import './notifi.less';
import closeNoti from './asset/closeNotifi.svg';

const ItemNoti = (props) => {
  const { img, content, type, style } = props;
  const notiRef = useRef(null);
  return (
    <div ref={notiRef} className={`noti-item`} style={{ border: style }}>
      <div>
        <img src={img}></img>
      </div>
      <div className="mx-4">
        <p className="m-0 content">{content}</p>
      </div>
      <div className="close-btn">
        <img
          onClick={() => {
            notiRef.current.style.display = 'none';
            const parentNode = notiRef.current.parentNode.parentNode.parentNode.parentNode;
            parentNode.style.setProperty('padding', '0', 'important');
            parentNode.style.setProperty('height', '0', 'important');
          }}
          src={closeNoti}
        ></img>
      </div>
    </div>
  );
};

export { ItemNoti };
