import React from 'react';
import '../logo/logo.less';
import logo from './asset/logocrm.png';
import { history } from 'umi';

export default function Logo({ className, readOnly = false }) {
  return (
    <div
      className={`Logo cursor-pointer ${className}`}
      onClick={() => {
        !readOnly ? history.push('/reception') : undefined;
      }}
    >
      <img src={logo}></img>
      <div>CRM ONEXUS</div>
    </div>
  );
}
