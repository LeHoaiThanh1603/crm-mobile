import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import Cookies from 'js-cookie';
import ChangePass from '@/pages/login/changePass';
import Lang from '@/components/Lang';
import Clock from '@/pages/modules/clock';
import './header.less';
import dropDown from './asset/drop.svg';
import House from './asset/Housekeeping';
import Reser from './asset/Reservation';
import day from './asset/day.svg';
import Reception from './asset/Reception';
import SystemAdmin from './asset/SystemAdmin';
import EI from './asset/EI';
import bell from './asset/bell.svg';
import Dash from './asset/dash';
import menu from './asset/menu.svg';
import user from './asset/user.svg';
import Logo from '@/pages/modules/logo';
import Popup from '@/components/Popup';
import { dropdown } from '@/components/Select';
import { margin } from '@mui/system';
import { GrFormDown } from 'react-icons/gr';
export default function Header() {
  const intl = useIntl();

  const onChangePass = () => {
    setOpen({
      ...open,
      changepass: true,
    });
  };
  const close = () => {
    setOpen({
      ...open,
      changepass: false,
    });
  };

  const [sl, setSL] = useState();
  const logout = () => {
    Cookies.remove('userlogin');
    if (!history) return;

    history.push('/login');
  };

  const [open, setOpen] = useState({
    changepass: false,
  });
  const { systemUser } = useModel('systemuser');

  const defaultListMenu = [
    //{
    //  admin: true,
    //  id: 4,
    //  link: '/reception',
    //  button:
    //    intl
    //      .formatMessage({
    //        id: 'pages.modules.reception',
    //        default: 'not found',
    //      })
    //      .toLowerCase()
    //      .charAt(0)
    //      .toUpperCase() +
    //    intl
    //      .formatMessage({
    //        id: 'pages.modules.reception',
    //        default: 'not found',
    //      })
    //      .toLowerCase()
    //      .slice(1),
    //},
    //{
    //  admin: true,
    //  id: 5,
    //  link: '/report',
    //  button:
    //    intl
    //      .formatMessage({
    //        id: 'pages.modules.report',
    //        default: 'not found',
    //      })
    //      .toLowerCase()
    //      .charAt(0)
    //      .toUpperCase() +
    //    intl
    //      .formatMessage({
    //        id: 'pages.modules.report',
    //        default: 'not found',
    //      })
    //      .toLowerCase()
    //      .slice(1),
    //},
    // {
    //   admin: true,
    //   id: 5,
    //   link: '/setting',
    //   button:
    //     intl
    //       .formatMessage({
    //         id: 'pages.modules.setting',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .charAt(0)
    //       .toUpperCase() +
    //     intl
    //       .formatMessage({
    //         id: 'pages.modules.setting',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .slice(1),
    // },
    // {
    //   admin: true,
    //   id: 'setting',
    //   // link: '',
    //   // icon: <GrFormDown/>,
    //   isParent: [
    //     {
    //       admin: true,
    //       id: 'Pages.setting.inboxchat.title',
    //       link: '../../setting/hoteldefine',
    //       button:
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.hoteldefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .charAt(0)
    //           .toUpperCase() +
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.hoteldefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .slice(1),
    //     },
    //     {
    //       admin: true,
    //       id: 'pages.setting.companydefine.title',
    //       link: '../../setting/companydefine',
    //       button:
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.companydefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .charAt(0)
    //           .toUpperCase() +
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.companydefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .slice(1),
    //     },
    //     {
    //       admin: true,
    //       id: 'pages.setting.userdefine.title',
    //       link: '../../setting/userdefine',
    //       button:
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.userdefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .charAt(0)
    //           .toUpperCase() +
    //         intl
    //           .formatMessage({
    //             id: 'pages.setting.userdefine.title',
    //             default: 'not found',
    //           })
    //           .toLowerCase()
    //           .slice(1),
    //     },
    //   ],
    //   button:
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.setting.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .charAt(0)
    //       .toUpperCase() +
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.setting.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .slice(1),
    // },
    // {
    //   admin: true,
    //   id: 'pages.setting.templatemessage.title',
    //   link: '../../setting/templatemessage',
    //   button:
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.templatemessage.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .charAt(0)
    //       .toUpperCase() +
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.templatemessage.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .slice(1),
    // },
    {
      admin: true,
      id: 'pages.setting.guestlist.title',
      link: '../../setting/guestlist',
      button:
        intl
          .formatMessage({
            id: 'pages.setting.guestlist.title',
            default: 'not found',
          })
          .toLowerCase()
          .charAt(0)
          .toUpperCase() +
        intl
          .formatMessage({
            id: 'pages.setting.guestlist.title',
            default: 'not found',
          })
          .toLowerCase()
          .slice(1),
    },
    {
      admin: true,
      id: 'pages.setting.groups.title',
      link: '../../setting/groups',
      button:
        intl
          .formatMessage({
            id: 'pages.setting.groups.title',
            default: 'not found',
          })
          .toLowerCase()
          .charAt(0)
          .toUpperCase() +
        intl
          .formatMessage({
            id: 'pages.setting.groups.title',
            default: 'not found',
          })
          .toLowerCase()
          .slice(1),
    },
    {
      admin: true,
      id: 'pages.setting.adsCampaign.title',
      link: '../../setting/adsCampaign',
      button:
        intl
          .formatMessage({
            id: 'pages.setting.adsCampaign.title',
            default: 'not found',
          })
          .toLowerCase()
          .charAt(0)
          .toUpperCase() +
        intl
          .formatMessage({
            id: 'pages.setting.adsCampaign.title',
            default: 'not found',
          })
          .toLowerCase()
          .slice(1),
    },
    {
      admin: true,
      id: 'pages.setting.inboxchat.title',
      link: '../../setting/Inboxchat',
      button:
        intl
          .formatMessage({
            id: 'pages.setting.inboxchat.title',
            default: 'not found',
          })
          .toLowerCase()
          .charAt(0)
          .toUpperCase() +
        intl
          .formatMessage({
            id: 'pages.setting.inboxchat.title',
            default: 'not found',
          })
          .toLowerCase()
          .slice(1),
    },
    // {
    //   admin: true,
    //   id: 'pages.setting.listRating.title',
    //   link: '../../setting/ListRating',
    //   button:
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.listRating.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .charAt(0)
    //       .toUpperCase() +
    //     intl
    //       .formatMessage({
    //         id: 'pages.setting.listRating.title',
    //         default: 'not found',
    //       })
    //       .toLowerCase()
    //       .slice(1),
    // },
  ];

  const resultListMenu = [...defaultListMenu];

  const [folder, setFolder] = useState(resultListMenu);

  const [numberShow, setNumberShow] = useState(9);
  const resize = () => {
    if (window.innerWidth > 1609) {
      setNumberShow(9);
    }
    if (window.innerWidth < 1609) {
      setNumberShow(8);
    }
    if (window.innerWidth < 1549) {
      setNumberShow(7);
    }
    if (window.innerWidth < 1499) {
      setNumberShow(6);
    }
    if (window.innerWidth < 1419) {
      setNumberShow(5);
    }
    if (window.innerWidth < 1330) {
      setNumberShow(4);
    }

    if (window.innerWidth < 1250) {
      setNumberShow(3);
    }
    if (window.innerWidth < 1155) {
      setNumberShow(2);
    }
    // if (window.innerWidth < 830) {
    //   setNumberShow(1);
    // }

    if (window.innerWidth < 1024) {
      setNumberShow(1);
    }
  };

  useEffect(() => {
    let href = window.location.href.split('/');
    localStorage.setItem('select', href[href.length - 1]);
    setSL(href[href.length - 1]);
    resize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{position: 'fixed',zIndex: '600'}}>
      <Row className="Header-component" style={{ width: '100%',overflowX: 'none'}}>
        <Col span={24} className="module-head-form ">
          <Col className="module-head" xxl={1} xl={2} lg={5} sm={5} xs={8}>
            <Logo className="module-logo "></Logo>
            <p style={{ marginLeft: '60px', fontSize: '20px', marginTop: '9px' }}>CRM</p>
          </Col>
          <Col className="module-head " style={{ position: 'absolute', right: '0' }}>
            <div className="d-flex align-items-center">
              <img src={bell}></img>
            </div>
            <dropdown.normal
              content={
                <div className="userID">
                  <img src={user}></img> {systemUser.name}
                  <img src={dropDown}></img>
                </div>
              }
              contentDrop={
                <>
                  <div onClick={onChangePass}>
                    {intl.formatMessage({
                      id: 'pages.modules.changepass',
                      default: 'not found',
                    })}
                  </div>
                  <div onClick={logout}>
                    {intl.formatMessage({
                      id: 'pages.modules.logout',
                      default: 'not found',
                    })}
                  </div>
                </>
              }
            ></dropdown.normal>

            <Lang className="lang-module" />
          </Col>
        </Col>
        <Popup state={false}></Popup>
        {open.changepass ? <ChangePass state={open} close={close} /> : ''}
      </Row>
      <Row className="Header-component1" style={{ width: '425px'}}>
        <Col span={24} 
          className="module-head modules-group reponMenu module-head-form"
          style={{
            width: '100%',
            // position: 'sticky',
            paddingLeft: '30px',
            margin: '0px',
            backgroundColor: '#cbcecb',
            zIndex: 600,
          }}
        >
          {window.innerWidth > 625
            ? folder.slice(0, numberShow).map((i, index) => (
                <>
                  {i.isParent && (
                    <dropdown.normal
                      content={
                        <a className={`a1 p-2 drop `} key={index}>
                          {' '}
                          {i.icon} {i.button}
                        </a>
                      }
                      className="menu-respon"
                      contentDrop={
                        <span>
                          {i.isParent.map((i, index) => (
                            <a
                              className="drop-menu-item"
                              style={{
                                padding: '20px',
                                whiteSpace: 'nowrap',
                              }}
                              key={index}
                              href={i.link}
                            >
                              {' '}
                              {i.icon} {i.button}
                            </a>
                          ))}
                        </span>
                      }
                    ></dropdown.normal>
                  )}

                  {!i.isParent && (
                    <a
                      className={`a1 p-2 ${
                        sl == i.link.split('/')[i.link.split('/').length - 1] ? 'onSelect' : ''
                      }`}
                      key={index}
                      href={i.link}
                    >
                      {' '}
                      {i.icon} {i.button}
                    </a>
                  )}
                </>
              ))
            : ''}

          {numberShow < 8 ? (
            <dropdown.normal
              content={<img src={menu}></img>}
              className="menu-respon"
              contentDrop={
                <>
                  {folder.slice(numberShow, folder.length).map((i, index) => (
                    <a
                      className="drop-menu-item"
                      style={{
                        padding: '20px',
                      }}
                      key={index}
                      href={i.link}
                    >
                      {' '}
                      {i.icon} {i.button}
                    </a>
                  ))}
                </>
              }
            ></dropdown.normal>
          ) : (
            ''
          )}
        </Col>
      </Row>
      {/* <div style={{height: '45px', width:'100%', backgroundColor:'#fdfdfd'}}>aaaaaaaaa</div> */}
    </div>
  );
}
