import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Header from '@/components/ModuleHeader';
import AreaItem from './areaItem';
import { useIntl, useModel } from 'umi';
import './area.less';
import { history } from 'umi';

function Area() {
  const intl = useIntl();
  const { location } = useModel('hoteldata');

  if (!history) return;
  const { query } = history.location;
  const listLocation = location.filter((item) => item.olMaSo == query.id);

  return (
    <>
      <div className="area-container">
        <Col className="header-container d-flex align-items-center">
          <div className="area-title d-flex justify-content-center align-items-center">
            <span>
              {intl.formatMessage({
                id: 'pages.modules.area',
              })}
            </span>
          </div>
        </Col>
        <div className="location-container">
          <Row gutter={[0, 32]} className="location-padding">
            {listLocation.map((item, index) => {
              return <AreaItem locationData={item} key={index} />;
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Area;
