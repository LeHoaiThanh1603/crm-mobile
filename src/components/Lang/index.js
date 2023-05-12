import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import language from './asset/language.svg';
import en from './asset/hoaky.svg';
import vn from './asset/vietnam.svg';
import jp from './asset/Japan.svg';
import './lang.less';
import { map } from 'lodash';

export default function Lang(props) {
  const drop = useRef();
  const [click, setClick] = useState(false);
  const [lang, setLang] = useState({
    title: 'America',
    value: 'en-US',
    img: en,
  });

  const la = [
    {
      title: 'America',
      value: 'en-US',
      img: en,
    },
    {
      title: 'Vietnamese',
      value: 'vi-VN',
      img: vn,
    },
    {
      title: 'Japan',
      value: 'ja-JP',
      img: jp,
    },
  ];

  const onMouseDown = (e) => {
    if (!drop.current.contains(e.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);

    let langu = getLocale();
    let index = la.findIndex((i) => i.value == langu);
    setLang(la[index]);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div
      ref={drop}
      onClick={() => {
        setClick(!click);
      }}
      className={`lang ` + props.className}
    >
      <img src={lang.img}></img>
      <div style={{ fontSize: '14px' }}></div>
      <div className={`dropDown ${click ? 'd-block' : 'd-none'}`}>
        {la.map((i, index) => (
          <div key={index}>
            {i.value != getLocale() ? (
              <div
                onClick={(e) => {
                  setLocale(i.value, true);
                }}
              >
                <img value={i.img} src={i.img}></img>
                {i.title}
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>{' '}
    </div>
  );
}
