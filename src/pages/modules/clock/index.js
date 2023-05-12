import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useModel } from 'umi';

import morning from './asset/morning.svg';

import '../clock/clock.less';
import { URL_API } from '@/e2e/configSystem';
import { isBuffer } from 'lodash';
export default function Clock(props) {
  const minute = useRef();
  const minute2 = useRef();
  const [clock, setClock] = useState(moment().format('H:mm'));

  const [loop, setLoop] = useState();
  const [date, setdate] = useState();

  useEffect(() => {
    const loop = setInterval(() => {
      setClock(moment().format('H:mm'));
    }, 1000);

    return function cleanup() {
      clearInterval(loop);
    };
  }, []);
  const [numberL, setNumberL] = useState(0);
  const [numberR, setNumberR] = useState(0);
  return (
    <div className={`clock ${props.class}`}>
      <div>
        <img src={morning}></img>
        <div>{clock}</div>
      </div>

      {/* <div>{moment(systemDate).format('D-M-Y')}</div> */}
    </div>
  );
}
