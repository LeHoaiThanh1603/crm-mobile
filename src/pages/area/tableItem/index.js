import React from 'react';
import umbrella from './asset/umbrella.svg';
import { Col, Row } from 'antd';
import './tableItem.less';
import { history } from 'umi';

function TableItem({ tableData }) {
  return (
    <Col
      xxl={4}
      xl={4}
      lg={6}
      md={6}
      sm={8}
      xs={12}
      className="d-flex justify-content-center table-title-content"
      onClick={() => history.push('/modules/bill?id=' + tableData.bpMaSo)}
    >
      {tableData.bpTen != '' || tableData.bpTinhTrang == false ? (
        <div className="table-item d-flex align-items-center justify-content-center">
          <div className="table-title d-flex justify-content-center">
            <span>{tableData.bpTen}</span>
          </div>
          {tableData.bpTen != '' && <img src={umbrella}></img>}
        </div>
      ) : (
        <div className="table-item d-flex align-items-center justify-content-center empty-table">
          <div className="table-title d-flex justify-content-center">
            <span>{tableData.bpTen}</span>
          </div>
        </div>
      )}
    </Col>
  );
}

export default TableItem;
