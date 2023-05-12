import './userrating.less';
import { Row, Col } from 'antd';
import { select } from '@/components/Select';
import { buttonList } from '@/components/Button';
import { ReportViewer } from '@/components/ReportViewer';
import { useModel } from 'umi';
import { useState, useRef } from 'react';
import moment from 'moment';
import { DatePicker } from '@/components/DatePicker';

// const { RangePicker } = DatePicker;
const TopChannel = () => {
  // const { systemDate } = useModel('systemdate');

  const [beginDate, setBeginDate] = useState(moment().format('MM/DD/YYYY'));
  const [endDate, setEndDate] = useState(moment().format('MM/DD/YYYY'));

  const [reload, setReload] = useState(true);
  const firstRef = useRef(true);
  return (
    <div className="sales-revenue-container mt-2">
      <Row gutter={[0, 16]} className="report-content-page">
        <Col xl={5} lg={7} md={8} xs={24} className="report-slide-bar">
          <Row className="w-100" gutter={[0, 16]}>
            <Col span={24}>
              <Row className="w-100" gutter={[0, 8]}>
                <Col span={24}>Select Date</Col>
                <Col span={24}>
                  <DatePicker
                    dateValue={[beginDate, endDate]}
                    onChange={(from, to) => {
                      setBeginDate(from);
                      setEndDate(to);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            {/* {console.log(beginDate)} */}
            <Col span={24}>
              <buttonList.normal
                title={'Show Report'}
                onClick={() => {
                  setReload(!reload);
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xl={19}
          la={17}
          md={16}
          xs={24}
          className="report-content"
          style={{ height: 'calc(100vh - 120px)' }}
        >
          <div className="report-side-wrap">
            <ReportViewer
              name={'UserRatingReport'}
              onShowReport={(s, e) => {
                if (firstRef.current) {
                  firstRef.current = false;
                  return;
                }
                e.ParametersModel['from'](beginDate);
                e.ParametersModel['to'](endDate);

                e.ParametersModel.submit();
              }}
              reload={reload}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TopChannel;
