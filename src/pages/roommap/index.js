import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Spin } from 'antd';
import { useIntl } from 'umi';

import { getMax, groupBy } from '@/e2e/extensionMethod';

import './roommap.less';

import RoomInfo from './roominfo';
import Floor from './floor';
import IconExplain from './iconexplain';
import RoomStatusButtonGroup from './roomstatusbuttongroup';

import { input } from '@/components/Input';
import { select } from '@/components/Select';

import { useFetch } from '@/components/Fetch/useFetch';
import { buttonList } from '@/components/Button';

import bill from './asset/bill.svg';
import information from './asset/information.svg';
import booking from './asset/booking.svg';
import exclamation from './asset/exclamation.svg';
import search from './asset/search.svg';
import arrow from './asset/arrow.svg';

const Roommap = () => {
  const [iconExplainVisible, setIconExplainVisible] = useState(false);
  const [roomStatusIconVisible, setRoomStatusIconVisible] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchExpandVisible, setSearchExpandVisible] = useState(false);
  const [data, setData] = useState({});
  const [floor, setFloor] = useState([]);
  const [checkinNum, setCheckinNum] = useState(0);
  const [checkoutNum, setCheckoutNum] = useState(0);
  const [inhouseNum, setInhouseNum] = useState(0);

  const intl = useIntl();

  const onIconExplainClick = () => {
    setIconExplainVisible(!iconExplainVisible);
    setIsOverlay(!isOverlay);
  };

  const onOverlayClick = () => {
    setIsOverlay(false);
    if (iconExplainVisible) {
      setIconExplainVisible(false);
    }
    if (roomStatusIconVisible) {
      setRoomStatusIconVisible(false);
    }
  };

  const onRoomStatusIconClick = () => {
    setRoomStatusIconVisible(!roomStatusIconVisible);
    setIsOverlay(!isOverlay);
  };

  const onExpandSearchItemClick = () => {
    setSearchExpandVisible(!searchExpandVisible);
    if (roomStatusIconVisible) {
      setRoomStatusIconVisible(false);
    }
  };

  useEffect(() => {
    const defaultTitle = intl.formatMessage({
      id: 'menu.roommap',
      defaultMessage: 'Proud PMS',
    });

    document.title = defaultTitle;

    useFetch(
      '/api/RoomMap/GetTableRoomMap',
      'GET',
      'application/json',
      null,
      (result) => {
        let maxX = getMax(result, 'XAxes');
        let maxY = getMax(result, 'YAxes');
        for (let y = 1; y <= maxY; y++) {
          let floor = result.find((i) => i.YAxes === y);
          let floorName = null;
          if (floor) {
            floorName = floor.TenTang;
          }
          for (let x = 1; x <= maxX; x++) {
            let room = result.find((i) => i.XAxes === x && i.YAxes === y);
            if (!room) {
              result.push({
                XAxes: x,
                YAxes: y,
                Phong: null,
                TenTang: floorName,
                Ma: x * -1000 - y,
              });
            }
          }
        }
        let uniqueFloorArray = [...new Map(result.map((item) => [item['TenTang'], item])).values()];
        uniqueFloorArray.map((item) => {
          return { Floor: item.TenTang, YAxes: item.YAxes };
        });
        setCheckinNum(
          result.filter((room) => {
            room.isCheckin === 1;
          }).length,
        );
        setCheckoutNum(
          result.filter((room) => {
            room.isCheckout === 1;
          }).length,
        );
        setInhouseNum(
          result.filter((room) => {
            room.isInHouse === 1;
          }).length,
        );
        setFloor(uniqueFloorArray.sort((a, b) => a.YAxes - b.YAxes));
        setData(
          groupBy(
            result.sort((a, b) => a.YAxes - b.YAxes),
            'YAxes',
          ),
        );
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  const dataTest = {
    Col1: null,
    Col2: null,
    Col3: null,
    ConnectRoom: null,
    DangPhong: 'DOUBLE',
    Gia: '1500000',
    GiaTG: null,
    GroupColor: null,
    Info2: null,
    IsBirthDay: true,
    IsExtraBed: 1,
    IsJoinBed: 0,
    IstransferFrom: 0,
    IstransferTo: 0,
    LateCheckin: false,
    LoaiPhong: 'PVS',
    Ma: '102',
    MaDangKy: null,
    MaDangKyBackToBack: null,
    MaDangPhong: 1,
    MaGiaPhong: null,
    MaLoaiPhong: 1,
    MaPhongThue: null,
    NameMainGuest: null,
    NgayDenDK: null,
    NgayDenPT: null,
    NgayDenThuc: null,
    NgayDiDK: null,
    NgayDiPT: null,
    NguoiLon: null,
    Phong: '102',
    RoomHouseUse: 0,
    SoNgayTruoc: 0,
    SpecialRequest: null,
    TenCongTy: null,
    TenDangKy: null,
    TenPhong: '102 PVS',
    TenTang: 'Block 1',
    TinhTrangPhong: 16,
    TinhTrangPhongThue: -1,
    TreEm: null,
    Walkin: 1,
    XAxes: 1,
    YAxes: 1,
    isCheckin: 0,
    isCheckout: 1,
    isInHouse: 1,
    isNoShow: 0,
  };

  return (
    <>
      <div className={isOverlay ? 'roommap-overlay' : ''} onClick={onOverlayClick}></div>
      <div className="roommap-container">
        <div className="header-container">
          <Row style={{ height: '100%' }}>
            <Col className="status-container" span={8}>
              <div className="status-item">
                <p>
                  {intl.formatMessage({
                    id: 'pages.roommap.status.checkin',
                  })}
                </p>
                <p>{checkinNum}</p>
              </div>
              <div className="status-item">
                <p>
                  {intl.formatMessage({
                    id: 'pages.roommap.status.checkout',
                  })}
                </p>
                <p>{checkoutNum}</p>
              </div>
              <div className="status-item">
                <p>
                  {intl.formatMessage({
                    id: 'pages.roommap.status.inhouse',
                  })}
                </p>
                <p>{inhouseNum}</p>
              </div>
            </Col>
            <Col className="function-container" span={16}>
              {buttonList.icon({
                onClick: () => {},
                title: intl.formatMessage({
                  id: 'pages.roommap.function.bill',
                }),
                img: bill,
              })}
              {buttonList.icon({
                onClick: () => {},
                title: intl.formatMessage({
                  id: 'pages.roommap.function.information',
                }),
                img: information,
              })}
              {buttonList.icon({
                onClick: () => {},
                title: intl.formatMessage({
                  id: 'pages.roommap.function.booking',
                }),
                img: booking,
              })}
              <div className="search-container">
                <input.medium
                  placeholder={intl.formatMessage({
                    id: 'pages.roommap.search.roomnumber',
                  })}
                  style={{ width: '230px' }}
                  prefix={<img src={search} alt="search image" />}
                  suffix={
                    <div
                      className="ps-1"
                      onClick={onExpandSearchItemClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <img className={searchExpandVisible ? 'arrow-left' : ''} src={arrow} />
                    </div>
                  }
                />
                {/* <img src={search} alt="search image" />
                <Input
                  className="select-search"
                  placeholder={intl.formatMessage({
                    id: 'pages.roommap.search.roomnumber',
                  })}
                  suffix={
                    <div onClick={onExpandSearchItemClick} style={{ cursor: 'pointer' }}>
                      <img className={searchExpandVisible ? 'arrow-left' : ''} src={arrow} />
                    </div>
                  } 
                /> */}
                <div
                  className={`search-expand-item ${searchExpandVisible ? 'd-flex' : 'd-none'}`}
                  style={{ top: '2.5rem' }}
                >
                  <input.medium
                    style={{ width: '230px' }}
                    placeholder={intl.formatMessage({
                      id: 'pages.roommap.search.booking',
                    })}
                  />
                </div>
                <div
                  className={`search-expand-item ${searchExpandVisible ? 'd-flex' : 'd-none'}`}
                  style={{ top: '5rem' }}
                >
                  {/* <Input
                    className="select-search"
                    placeholder={intl.formatMessage({
                      id: 'pages.roommap.search.roomstatus',
                    })}
                    suffix={
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={onRoomStatusIconClick}
                      >
                        <img src={arrow} className={roomStatusIconVisible ? 'arrow-left' : ''} />
                      </div>
                    }
                  />
                  <RoomStatusButtonGroup visible={roomStatusIconVisible} /> */}
                  <select.group className="select-search" placeholder="Room Status">
                    <select.option value="checkin">
                      {intl.formatMessage({
                        id: 'pages.roommap.status.checkin',
                      })}
                    </select.option>
                    <select.option value="checkout">
                      {intl.formatMessage({
                        id: 'pages.roommap.status.checkout',
                      })}
                    </select.option>
                  </select.group>
                </div>
              </div>
              <div className="function-item position-relative" onClick={onIconExplainClick}>
                <img className="icon-explain-button" src={exclamation} alt="exclamation image" />
                <IconExplain visible={iconExplainVisible} />
              </div>
            </Col>
            {/* <Col className="page-name-container" span={3}>
              <div className="page-name">
                <p>Room map</p>
              </div>
            </Col> */}
          </Row>
        </div>
        <div className="floors-container">
          <Spin tip="Loading..." spinning={isLoading}>
            <Row style={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
              <Col span={1} className="sticky-container">
                {floor.map((fl) => {
                  return <Floor key={fl.YAxes} floor={fl.TenTang} />;
                })}
                {/* <Floor floor="1" />
              <Floor floor="2" />
              <Floor floor="3" />
              <Floor floor="4" />
              <Floor floor="5" />
              <Floor floor="6" />
              <Floor floor="7" />
              <Floor floor="8" />
              <Floor floor="9" />
              <Floor floor="10" />
              <Floor floor="11" />
              <Floor floor="12" /> */}
              </Col>
              <Col span={23} className="room-container">
                {Object.entries(data).map((y) => {
                  y[1].sort((a, b) => {
                    return a.XAxes - b.XAxes;
                  });
                  return (
                    <div key={y[0]} className="d-flex">
                      {y[1].map((room) => {
                        return (
                          <RoomInfo
                            key={room.Ma}
                            roomInfo={room}
                            // isCheckin={true}
                            // isCheckout={true}
                            // roomNumber={room.Phong}
                            // isDirty={true}
                            // isUse={true}
                            // isWalkin={true}
                            // content="1.500.000đ - SUP"
                            // lock="oos"
                            // service={{
                            //   honeymoon: true,
                            //   extraBed: true,
                            //   priority: true,
                            //   birthday: true,
                            // }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
                <div className="d-flex">
                  <RoomInfo roomInfo={dataTest} />
                </div>
                {/* <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="101" isDirty={true} />
                  <RoomInfo roomNumber="102" isDirty={true} isApartment={true} />
                  <RoomInfo roomNumber="103" isDirty={true} isApartment={true} />
                  <RoomInfo roomNumber="104" isVilla={true} />
                  <RoomInfo roomNumber="105" lock="ooo" isVilla={true} />
                  <RoomInfo roomNumber="106" lock="ooo" />
                  <RoomInfo roomNumber="107" isDirty={true} />
                  <RoomInfo roomNumber="108" />
                  <RoomInfo roomNumber="109" isDirty={true} />
                  <RoomInfo roomNumber="110" />
                  <RoomInfo roomNumber="111" isDirty={true} />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="201" />
                  <RoomInfo roomNumber="202" isDirty={true} />
                  <RoomInfo roomNumber="203" isDirty={true} lock="ooo" />
                  <RoomInfo roomNumber="204" isDirty={true} />
                  <RoomInfo roomNumber="205" />
                  <RoomInfo roomNumber="206" lock="ooo" />
                  <RoomInfo roomNumber="207" lock="ooo" />
                  <RoomInfo
                    roomNumber="208"
                    isUse={true}
                    content="500.000đ - STD"
                    isCheckin={true}
                    isCheckout={true}
                    lock="oos"
                    service={{ honeymoon: true, extraBed: true, birthday: true }}
                    isDirty={true}
                  />
                  <RoomInfo roomNumber="209" />
                  <RoomInfo roomNumber="210" />
                  <RoomInfo roomNumber="211" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo
                    roomNumber="301"
                    isUse={true}
                    status={{ checkout: true }}
                    content="500.000đ - STD"
                    service={{ oddPerson: true }}
                  />
                  <RoomInfo roomNumber="302" lock="ooo" />
                  <RoomInfo roomNumber="303" />
                  <RoomInfo roomNumber="304" lock="ooo" />
                  <RoomInfo
                    roomNumber="305"
                    isUse={true}
                    status={{ checkin: true, checkout: true }}
                    content="1.500.000đ - SUP"
                    isDirty={true}
                    service={{ extraBed: true, priority: true, oddPerson: true, birthday: true }}
                  />
                  <RoomInfo roomNumber="306" lock="ooo" />
                  <RoomInfo roomNumber="307" isConnecting={true} />
                  <RoomInfo roomNumber="308" />
                  <RoomInfo roomNumber="309" isDirty={true} />
                  <RoomInfo roomNumber="310" lock="ooo" isDirty={true} />
                  <RoomInfo roomNumber="311" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="401" lock="ooo" />
                  <RoomInfo roomNumber="402" isDirty={true} />
                  <RoomInfo
                    roomNumber="403"
                    isUse={true}
                    content="1.500.000đ - SUP"
                    status={{ checkin: true }}
                    lock="oos"
                    isDirty={true}
                    service={{
                      extraBed: true,
                      birthday: true,
                      honeymoon: true,
                      oddPerson: true,
                      priority: true,
                    }}
                  />
                  <RoomInfo roomNumber="404" lock="ooo" />
                  <RoomInfo roomNumber="405" />
                  <RoomInfo roomNumber="406" isDirty={true} />
                  <RoomInfo roomNumber="407" />
                  <RoomInfo roomNumber="408" />
                  <RoomInfo roomNumber="409" />
                  <RoomInfo roomNumber="410" />
                  <RoomInfo roomNumber="411" isDirty={true} />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="501" isDirty={true} />
                  <RoomInfo roomNumber="502" isDirty={true} />
                  <RoomInfo roomNumber="503" />
                  <RoomInfo roomNumber="504" isConnecting={true} />
                  <RoomInfo roomNumber="505" isDirty={true} />
                  <RoomInfo roomNumber="506" />
                  <RoomInfo
                    roomNumber="507"
                    isUse={true}
                    content="500.000đ - STD"
                    status="checkin"
                  />
                  <RoomInfo roomNumber="508" />
                  <RoomInfo
                    roomNumber="509"
                    isUse={true}
                    content="500.000đ - STD"
                    status="checkin"
                    isDirty={true}
                  />
                  <RoomInfo
                    roomNumber="510"
                    isUse={true}
                    content="500.000đ - STD"
                    status="checkin"
                    isDirty={true}
                  />
                  <RoomInfo
                    roomNumber="511"
                    isUse={true}
                    content="500.000đ - STD"
                    status="checkin"
                    isDirty={true}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="601" isDirty={true} />
                  <RoomInfo roomNumber="602" lock="ooo" />
                  <RoomInfo roomNumber="603" />
                  <RoomInfo roomNumber="604" />
                  <RoomInfo
                    roomNumber="605"
                    isUse={true}
                    status="checkin"
                    content="500.000đ - STD"
                    service={{ oddPerson: true }}
                  />
                  <RoomInfo roomNumber="606" isDirty={true} />
                  <RoomInfo roomNumber="607" isDirty={true} />
                  <RoomInfo roomNumber="608" lock="ooo" />
                  <RoomInfo roomNumber="609" />
                  <RoomInfo roomNumber="610" />
                  <RoomInfo roomNumber="611" />
                </div>

                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="701" />
                  <RoomInfo roomNumber="702" />
                  <RoomInfo
                    roomNumber="703"
                    isUse={true}
                    status="checkin"
                    content="3.000.000đ - DLX"
                    service={{ extraBed: true }}
                  />
                  <RoomInfo roomNumber="704" lock="ooo" />
                  <RoomInfo roomNumber="705" />
                  <RoomInfo roomNumber="706" isDirty={true} />
                  <RoomInfo roomNumber="707" />
                  <RoomInfo roomNumber="708" />
                  <RoomInfo roomNumber="709" isDirty={true} />
                  <RoomInfo roomNumber="710" isDirty={true} />
                  <RoomInfo roomNumber="711" isDirty={true} />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="801" isDirty={true} />
                  <RoomInfo roomNumber="802" lock="ooo" />
                  <RoomInfo roomNumber="803" />
                  <RoomInfo roomNumber="804" />
                  <RoomInfo roomNumber="805" />
                  <RoomInfo roomNumber="806" lock="ooo" />
                  <RoomInfo roomNumber="807" />
                  <RoomInfo roomNumber="808" isDirty={true} />
                  <RoomInfo roomNumber="809" />
                  <RoomInfo roomNumber="810" />
                  <RoomInfo roomNumber="811" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="901" />
                  <RoomInfo roomNumber="902" />
                  <RoomInfo roomNumber="903" lock="ooo" />
                  <RoomInfo roomNumber="904" />
                  <RoomInfo roomNumber="905" lock="ooo" />
                  <RoomInfo
                    roomNumber="906"
                    isUse={true}
                    status="checkin"
                    content="3.000.000đ - DLX"
                  />
                  <RoomInfo roomNumber="907" />
                  <RoomInfo roomNumber="908" lock="oos" />
                  <RoomInfo roomNumber="909" lock="ooo" />
                  <RoomInfo roomNumber="910" lock="ooo" />
                  <RoomInfo roomNumber="911" lock="ooo" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="1001" lock="ooo" />
                  <RoomInfo roomNumber="1002" />
                  <RoomInfo roomNumber="1003" />
                  <RoomInfo roomNumber="1004" isDirty={true} />
                  <RoomInfo roomNumber="1005" isDirty={true} />
                  <RoomInfo roomNumber="1006" isDirty={true} />
                  <RoomInfo roomNumber="1007" />
                  <RoomInfo roomNumber="1008" />
                  <RoomInfo roomNumber="1009" />
                  <RoomInfo roomNumber="1010" />
                  <RoomInfo roomNumber="1011" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="1101" />
                  <RoomInfo roomNumber="1102" lock="ooo" />
                  <RoomInfo
                    roomNumber="1103"
                    isUse={true}
                    status="checkout"
                    content="3.000.000đ - DLX"
                  />
                  <RoomInfo roomNumber="1104" />
                  <RoomInfo roomNumber="1105" />
                  <RoomInfo roomNumber="1106" lock="ooo" />
                  <RoomInfo
                    roomNumber="1107"
                    isUse={true}
                    status="checkin"
                    content="5.000.000đ - SUT"
                    service={{ priority: true }}
                  />
                  <RoomInfo roomNumber="1108" />
                  <RoomInfo roomNumber="1109" />
                  <RoomInfo roomNumber="1010" />
                  <RoomInfo roomNumber="1011" />
                </div>
                <div style={{ display: 'flex' }}>
                  <RoomInfo roomNumber="1201" lock="ooo" />
                  <RoomInfo roomNumber="1202" lock="ooo" />
                  <RoomInfo roomNumber="1203" />
                  <RoomInfo roomNumber="1204" />
                  <RoomInfo
                    roomNumber="1205"
                    isUse={true}
                    status="checkout"
                    content="3.000.000đ - DLX"
                  />
                  <RoomInfo roomNumber="1206" />
                  <RoomInfo roomNumber="1207" />
                  <RoomInfo roomNumber="1208" />
                  <RoomInfo roomNumber="1209" isDirty={true} />
                  <RoomInfo roomNumber="1210" isDirty={true} />
                  <RoomInfo roomNumber="1211" isDirty={true} />
                </div> */}
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default Roommap;
