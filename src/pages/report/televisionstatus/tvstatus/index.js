import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Spin } from 'antd';
import { useIntl } from 'umi';

import { getMax, groupBy } from '@/e2e/extensionMethod';

import TVInfo from './tvinfo';
import Floor from './floor';

import { useFetch } from '@/components/Fetch/useFetch';
import * as signalR from '@microsoft/signalr';
import { URL_API } from '@/e2e/configSystem';

import './tvstatus.less';

const TVStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [defaultData, setDefaultData] = useState([]);
  const [floor, setFloor] = useState([]);
  const [connection] = useState(
    new signalR.HubConnectionBuilder().withUrl(URL_API + '/hubsignalr').build(),
  );
  const [reconnection] = useState({ value: null });
  const intl = useIntl();

  const onSendTelevisionStatus = useCallback(
    (room) => {
      console.log(room);
      console.log(defaultData);
      console.log(
        defaultData.map((item) => {
          return item;
        }),
      );
      setDefaultData(
        defaultData.map((item) => {
          if (item.room == room.room) {
            return room;
          }
          return item;
        }),
      );
    },
    [defaultData],
  );

  const onClose = async () => {
    reconnection.value = setInterval(() => {
      if (connection._connectionState == 'Connected') clearInterval(reconnection.value);
      else if (connection._connectionState == 'Disconnected') connection.start();
      else location.reload();
    }, 5000);
  };

  const connectHubSignal = () => {
    connection.on('SendTelevisionStatus', onSendTelevisionStatus);
  };

  const offHubSignal = () => {
    connection.off('SendTelevisionStatus');
  };

  const calculatePosition = useCallback(
    (result) => {
      let seen = Object.create(null);
      result = result.filter((o) => {
        var key = ['xaxes', 'yaxes'].map((k) => o[k]).join('|');
        if (!seen[key]) {
          seen[key] = true;
          return true;
        }
      });
      let maxX = getMax(result, 'xaxes');
      let maxY = getMax(result, 'yaxes');
      for (let y = 1; y <= maxY; y++) {
        let floor = result.find((i) => i.yaxes === y);
        let floorName = null;
        if (floor) {
          floorName = floor.tenTang;
        }
        for (let x = 1; x <= maxX; x++) {
          let room = result.find((i) => i.xaxes === x && i.yaxes === y);
          if (!room) {
            result.push({
              xaxes: x,
              yaxes: y,
              room: null,
              tenTang: floorName,
              id: x * -1000 - y,
            });
          }
        }
      }
      let uniqueFloorArray = [...new Map(result.map((item) => [item['yaxes'], item])).values()];
      //   setFloor(
      //     uniqueFloorArray.filter((item) => item.yaxes != null).sort((a, b) => a.yaxes - b.yaxes),
      //   );
      return [
        groupBy(
          result.filter((item) => item.yaxes != null).sort((a, b) => a.yaxes - b.yaxes),
          'yaxes',
        ),
        uniqueFloorArray.filter((item) => item.yaxes != null).sort((a, b) => a.yaxes - b.yaxes),
      ];
    },
    [defaultData],
  );

  useEffect(() => {
    connectHubSignal();
    connection.onclose(onClose);
    connection.start();
  }, []);

  useEffect(() => {
    offHubSignal();
    connectHubSignal();
  }, [defaultData]);

  useEffect(() => {
    useFetch(
      '/api/Defines/GetRoomHotel',
      'GET',
      'application/json',
      null,
      (result) => {
        console.log(result);
        setDefaultData(result);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <>
      <div className="tvstatus-container mt-4">
        <div className="floors-container">
          <Row style={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
            <Col span={1} className="sticky-container">
              {calculatePosition(defaultData)[1].map((fl) => {
                return <Floor key={fl.yaxes} floor={fl.tenTang} />;
              })}
            </Col>
            <Col span={23} className="tv-container">
              {Object.entries(calculatePosition(defaultData)[0]).map((y) => {
                y[1].sort((a, b) => {
                  return a.xaxes - b.xaxes;
                });
                return (
                  <div key={y[0]} className="d-flex">
                    {y[1].map((room) => {
                      return <TVInfo key={room.id} roomInfo={room} />;
                    })}
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TVStatus;
