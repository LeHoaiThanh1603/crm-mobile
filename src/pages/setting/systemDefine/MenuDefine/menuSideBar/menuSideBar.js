import './menuSideBar.less';
import { EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useIntl } from 'umi';

const MenuSideBar = ({ handleUpdateCategory, menu, setMenu, setCategorySelected }) => {
  const intl = useIntl();
  const [isActiveAllmenu, setIsActiveAllMenu] = useState(true);

  const handleActiveParentItem = (menuItem) => {
    let menuActive = [];
    setIsActiveAllMenu(false);
    menu.map((item) => {
      if (item.id == menuItem.id) {
        item.isActive = true;
        menuActive.push(item);
        setCategorySelected(item.id);
      } else {
        item.isActive = false;
        menuActive.push(item);
      }
    });
    setMenu(menuActive);
  };

  return (
    <div className="menu-sidebar-container">
      <Row>
        <Col className="menu" span={24}>
          {menu.map((item, index) => {
            return (
              <Row className={item.isActive ? 'active  parent' : 'parent'} key={item.id}>
                <Col
                  span={24}
                  className="parent-label d-flex align-items-center"
                  onClick={() => handleActiveParentItem(item)}
                  onMouseEnter={() => {
                    let editMenu = [...menu];
                    let edit = { ...item, isEdit: true };
                    editMenu.splice(index, 1, edit);
                    setMenu(editMenu);
                  }}
                  onMouseLeave={() => {
                    let editMenu = [...menu];
                    editMenu.map((editItem) => {
                      return (editItem.isEdit = false);
                    });
                    setMenu(editMenu);
                  }}
                >
                  <Row className="w-100 h-100 d-flex align-items-center">
                    <Col span={21}> {item.name}</Col>
                    <Col
                      span={3}
                      className="text-center w-75 h-75 cursor-pointer"
                      onClick={() => handleUpdateCategory(item)}
                    >
                      {item.isEdit && <EditOutlined />}
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default MenuSideBar;
