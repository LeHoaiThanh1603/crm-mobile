import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import Button, { buttonList } from '@/components/Button';
import TVStatus from './tvstatus';

export default function Televisionstatus() {
  return (
    <div>
      <TVStatus />
    </div>
  );
}
