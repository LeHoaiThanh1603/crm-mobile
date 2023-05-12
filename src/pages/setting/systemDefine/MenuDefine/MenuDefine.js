import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Row, Col, Space, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import './MenuDefine.less';
import MenuPopup from './MenuPopup/MenuPopup';
import MessageDefine from './ProductDefine/messageDefine';
import { ProductPopup } from './ProductDefine/ProductPopup/ProductPopup';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { useFetch } from '@/components/Fetch/useFetch';
import MenuSideBar from './menuSideBar/menuSideBar';
import { formatNumber } from '@/e2e/extensionMethod';
import { URL_API } from '../../../../e2e/configSystem';

export default function MenuDefine() {
  const intl = useIntl();
  const [menu, setMenu] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [oldDataUpdate, setOldDataUpdate] = useState({
    id: '',
    name: '',
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('');
  console.log(addOrUpdate)

  const handleUpdateMessageType = (item) => {
    setAddOrUpdate('update');
    setIsShowModal(true);
    setOldDataUpdate({
      id: item.id,
      name: item.name,
    });
  };

  const updateMessageType = () => {
    useFetch('/api/Defines/GetMessageType', 'GET', 'application/json', null, (res) => {
      setMenu(
        res.map((item, index) => {
          if (index == 0) {
            setCategorySelected(item.id);
            return { ...item, isActive: true };
          }
          return item;
        }),
      );
    }),
      (err) => {
        console.log(err);
      };
  };

  useEffect(() => {
    updateMessageType();
  }, []);

  const handleShowAddMessageType = () => {
    setAddOrUpdate('add');
    setIsShowModal(true);
  };

  return (
    <div className="menu-container">
      <Row gutter={[8, 8]}>
        <MenuPopup
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          addOrUpdate={addOrUpdate}
          updateMessageType={updateMessageType}
          // parent={menu}
          oldDataUpdate={oldDataUpdate}
        />
        <Col span={24}>
          <buttonList.add
            className="w-auto"
            title={intl.formatMessage({
              id: 'pages.setting.templatemessage.menu.addmessagetype',
            })}
            onClick={handleShowAddMessageType}
          />
        </Col>
        <Col xs={24} sm={10} md={8} lg={6} xxl={4}>
          <MenuSideBar
            handleUpdateCategory={handleUpdateMessageType}
            menu={menu}
            setMenu={setMenu}
            setCategorySelected={setCategorySelected}
          />
        </Col>
        <Col xs={24} sm={13} md={15} lg={17} xl={17} xxl={19}>
          <div className="content">
            <MessageDefine categorySelected={categorySelected} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
