import { Menu } from 'antd';
import AddCampaign from '@/pages/setting/adsCampaign/AddCampaign';
import { MdCampaign } from 'react-icons/md';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useState } from 'react';
import { useIntl, useModel } from 'umi';

const SidebarMenu = ({ style, handleClickHideSidebar, tabs }) => {
  const intl = useIntl();
  const componentsSwtich = (key) => {
    console.log(key);
    switch (key) {
      case '1':
        tabs(false);
        break;
      case '2':
        tabs(true);
        break;
      default:
        tabs(true);
        break;
    }
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      intl.formatMessage({ id: 'pages.setting.adsCampaign.titleMenuAdsCampaign' }),
      'sub1',
      <MdCampaign size={'22px'} />,
      [
        getItem(intl.formatMessage({ id: 'pages.setting.adsCampaign.listAdsCampaign' }), '1'),
        getItem(intl.formatMessage({ id: 'pages.setting.adsCampaign.addAdsCampaign' }), '2'),
      ],
    ),
    // {
    //   type: 'divider',
    // },
    // getItem('Option two', 'sub4', <SettingOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
    //   getItem('Option 11', '11'),
    //   getItem('Option 12', '12'),
    // ]),
    // getItem('adCampaign', 'grp', null, [getItem('Danh sách chiến dịch ', '1', <MdCampaign size={'22px'}/>, ), getItem('Option 2', '2', 'x',  )], 'group'),
  ];

  return (
    <div className={` sidebar ${style ? 'hideSidebar' : ''}`}>
      <Menu
        onClick={(e) => componentsSwtich(e.key ? e.key : '1')}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      ></Menu>
    </div>
    //   <div>
    //   <Menu selectedKeys={selectedMenuItem} mode="horizontal" onClick={(e) =>
    //         setSelectedMenuItem(e.key)}>
    //     <Menu.Item key="item1"></Menu.Item>
    //     <Menu.Item key="item2">your second here</Menu.Item>
    //     <Menu.Item key="item3">your third here</Menu.Item>
    //    </Menu>
    //    <div>
    //      {componentsSwtich(selectedMenuItem)}
    //    </div>
    //  </div>
  );
};

export default SidebarMenu;
