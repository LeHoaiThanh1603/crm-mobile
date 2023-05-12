import './menuSideBar.less';
import {
  CaretDownOutlined,
  EditOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Row, Col, Space, Button, Input, Popconfirm } from 'antd';
import { buttonList } from '@/components/Button';
import { useIntl, useModel, getLocale } from 'umi';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { useFetch } from '@/components/Fetch/useFetch';
import drop from './drop.svg';
const MenuSideBar = ({
  handleUpdateCategory,
  updateId,
  menu,
  language,
  onDelete,
  setMenu,
  setCategorySelected,
}) => {
  const { category, updateCategory } = useModel('productdata');
  const refHeight = useRef([]);
  const intl = useIntl();
  const [isActiveAllmenu, setIsActiveAllMenu] = useState(true);
  const [onSelect, setOnSelect] = useState(0);
  const handleActiveParentItem = (menuItem) => {
    let menuActive = [];
    setIsActiveAllMenu(false);
    menu.map((item) => {
      if (item.lspMaSo == menuItem.lspMaSo) {
        item.isActive = true;
        menuActive.push(item);
        setCategorySelected(item.lspMaSo);
      } else {
        item.isActive = false;
        menuActive.push(item);
      }
      item.children.map((childItem) => {
        childItem.isActive = false;
      });
    });
    setMenu(menuActive);
  };
  const handleActiveItem = (menuItem) => {
    let menuActive = [...menu];
    setIsActiveAllMenu(false);
    menuActive.map((item) => {
      item.isActive = false;
      item.children.map((childItem) => {
        if (childItem.lspMaSo == menuItem.lspMaSo && item.lspMaSo == menuItem.lspMaSoCha) {
          childItem.isActive = true;
          setCategorySelected(childItem.lspMaSo);
        } else {
          childItem.isActive = false;
        }
      });
    });
    setMenu(menuActive);
  };
  const { typeService, UpdateGroupService } = useModel('productdata');
  const handleActiveAllMenu = () => {
    let menuActive = [...menu];
    menuActive.map((item) => {
      item.isActive = false;
      item.children.map((childItem) => {
        childItem.isActive = false;
      });
    });
    setIsActiveAllMenu(true);
    setMenu(menuActive);
    setCategorySelected(null);
  };
  const onClickClose = (a) => {
    let arr = document.querySelectorAll('.groupitem');
    let arr2 = document.querySelectorAll('.listMenu');
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.height = '0px';
        arr2[i].style.transform = 'rotate(0deg)';
      }
    }
  };
  const onClick = (a) => {
    let arr = document.querySelectorAll('.groupitem');
    let arr2 = document.querySelectorAll('.listMenu');
    if (arr.length > 0) {
      if (arr[a].style.height == `${arr[a].scrollHeight}px`) {
        arr[a].style.height = '0';
        arr2[a].style.transform = 'rotate(0deg)';
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].style.height = i == a ? `${arr[i].scrollHeight}px` : '0px';
          arr2[i].style.transform = i == a ? `rotate(180deg)` : 'rotate(0deg)';
        }
      }
    }
  };
  const filterMenuData = () => {
    let newMenu = [];
    let children = [];
    category.forEach((element) => {
      if (element.lspMaSoCha) {
        children.push(element);
      } else {
        newMenu.push(element);
      }
    });
    newMenu.map((parentItem) => {
      return (parentItem.children = children.filter((x) => parentItem.lspMaSo == x.lspMaSoCha));
    });

    setMenu(newMenu);
  };
  const lang = getLocale();
  useEffect(() => {
    filterMenuData();
  }, [category]);
  console.log(menu);
  return (
    <div
      style={{ maxHeight: '70vh', overflow: 'auto', position: 'relative' }}
      className="menu-sidebar-container"
    >
      <Row>
        <Col
          className={isActiveAllmenu ? 'all-menu active border-active' : 'all-menu border-trans'}
          span={24}
        >
          <Row
            onClick={() => {
              updateId(0);
              setOnSelect(0);
              onClickClose();
            }}
          >
            <Col
              span={24}
              className={`${
                onSelect == 0 ? 'onSelectGroup' : undefined
              } all-menu-label d-flex justify-content-start align-items-center`}
              style={{ position: 'sticky', top: '0' }}
            >
              {label.titlelg({
                children: intl.formatMessage({
                  id: 'pages.setting.companydefine.menu.allmenu',
                }),
              })}
            </Col>
          </Row>
        </Col>
        {typeService.map((j, index) => (
          <Col span={24}>
            <Col
              className={`${onSelect == j.id ? 'onSelectGroup' : ''} menu   all-menu-label`}
              style={{ background: '#95c5ff', display: 'flex', alignItems: 'center' }}
              key={index}
              span={24}
              onClick={() => {
                onClick(index);
              }}
            >
              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>{j.name}</div>
              <div className="bt">
                <div className="edit">
                  <img
                    src={drop}
                    className="listMenu"
                    style={{ marginRight: '10px', transition: '0.5s' }}
                  />
                </div>
              </div>
            </Col>
            <div
              refHeight={(rel) => (refHeight.current[index] = rel)}
              span={24}
              className="groupitem"
            >
              {menu.map((i, index) =>
                i.typeService == j.id ? (
                  <Col
                    className={`${
                      onSelect == i.id ? 'onSelectGroup' : ''
                    } menu itemt-group  all-menu-label`}
                    key={index}
                    span={24}
                  >
                    <div
                      style={{ width: '100%', display: 'flex', alignItems: 'center' }}
                      onClick={() => {
                        setOnSelect(i.id);
                        updateId(i.id);
                      }}
                    >
                      {i.nameByLang.find((i) => i.language == language)
                        ? i.nameByLang.find((i) => i.language == language).name
                        : 'No Name'}
                    </div>

                    <div className="bt">
                      <div className="edit" onClick={() => handleUpdateCategory(i)}>
                        <EditOutlined></EditOutlined>
                      </div>
                      <div className="delete">
                        <Popconfirm
                          title="Are you sure？"
                          onConfirm={() => onDelete(i.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined></DeleteOutlined>
                        </Popconfirm>
                      </div>
                    </div>
                  </Col>
                ) : undefined,
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MenuSideBar;
