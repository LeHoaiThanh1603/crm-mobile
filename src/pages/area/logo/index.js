import React from 'react';
import '../logo/logo.less';
import logo from './asset/logo.png';
import { history } from 'umi';

export default function Logo({ className }) {
  return (
    <div
      className={`Logo cursor-pointer ${className}`}
      onClick={() => {
        history.push('/modules');
      }}
    >
      <img src={logo}></img>
      <div>Sproud POS</div>
    </div>
  );
}
