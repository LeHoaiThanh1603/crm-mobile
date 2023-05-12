import React, { useState } from 'react';
import './radio.less';
import { Radio } from 'antd';

function RadioComponent({ onChange, className, options }) {
  const [listData, setListData] = useState([
    {
      label: 'arpp',
      value: 'afpp',
    },
    {
      label: 'arpp',
      value: 'app',
    },
    {
      label: 'aprp',
      value: 'afpưp',
    },
    {
      label: 'appe',
      value: 'afppư',
    },
  ]);

  return <Radio.Group className={className} onChange={onChange} options={listData}></Radio.Group>;
}

export default RadioComponent;
