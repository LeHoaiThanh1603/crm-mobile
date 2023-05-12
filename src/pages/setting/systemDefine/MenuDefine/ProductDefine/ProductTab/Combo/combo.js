import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Row, Col } from 'antd';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { select } from '@/components/Select';
import Modal from '@/components/Popup';
import { Switch } from '@/components/Switch';
import { formatNumber } from '@/e2e/extensionMethod';
import './combo.less';
import { pull, set } from 'lodash';
import { memo } from 'react';

const Combo = () => {
  return <div>Combo</div>;
};

export default Combo;
