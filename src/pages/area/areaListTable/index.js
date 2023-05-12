import React, { useRef, useEffect, useState } from 'react';
import { input } from '@/components/Input';
import { Col, Row, Button } from 'antd';
import search from './asset/search.svg';
import close from './asset/close.svg';
import table from './asset/table.svg';
import umbrella from './asset/umbrella.svg';
import { history, useIntl, useModel } from 'umi';
import TableItem from '../tableItem';
import './areaListTable.less';

function AreaListTable() {
  const intl = useIntl();
  const { table } = useModel('hoteldata');

  const inputRef = useRef();

  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  if (!history) return;
  const { query } = history.location;

  const [listDataItem, setListDataItem] = useState([
    {
      bpDangGhep: null,
      bpGhiChu: null,
      bpHinhAnh: null,
      bpMaLoai: null,
      bpMaSo: null,
      bpSoChoToiDa: null,
      bpSoKhach: 0,
      bpTen: '',
      bpTinhTrang: null,
      bpViTriX: '',
      bpViTriY: '',
      locMaSo: query.id,
    },
  ]);
  const listTable = table.filter((item) => item.locMaSo == query.id);

  useEffect(() => {
    if (listTable) {
      let dataItem = [];
      let xMax = Math.max(...listTable.map((item) => item.bpViTriX));
      for (let i = 1; i <= xMax; i++) {
        // tach theo bpViTriX
        let listX = listTable.filter((item) => item.bpViTriX == i);

        if (listX) {
          //   trong listX thi tach theo bpViTriY va chon so lon nhat
          let yMax = Math.max(...listX.map((item) => item.bpViTriY));
          let dataX = [];
          for (let j = 1; j <= yMax; j++) {
            let itemY = listX.find((item) => item.bpViTriY == j);

            if (itemY) {
              dataX.push(itemY);
            } else {
              dataX.push({
                bpDangGhep: null,
                bpGhiChu: null,
                bpHinhAnh: null,
                bpMaLoai: null,
                bpMaSo: null,
                bpSoChoToiDa: null,
                bpSoKhach: 0,
                bpTen: '',
                bpTinhTrang: null,
                bpViTriX: i,
                bpViTriY: j,
                locMaSo: query.id,
              });
            }
          }
          dataItem.push(...dataX);
        }
      }

      setListDataItem(dataItem);
    }
  }, [query]);

  return (
    <>
      <div className="area-list-table-container">
        <Col offset={9} span={6} className="header-container d-flex align-items-center">
          <input.medium
            prefix={<img className="search" src={search}></img>}
            suffix={
              <img
                className="search"
                src={close}
                onClick={() => {
                  setsearchTerm('');
                }}
              ></img>
            }
            placeholder="Search"
            ref={inputRef}
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          ></input.medium>
        </Col>
        <div className="height-20"></div>
        <div className="detail-table-container">
          <Row gutter={[0, 32]} className="scrollbar-custom">
            {listDataItem
              .filter((item) => item.bpTen.includes(searchTerm.toUpperCase()))
              .map((item, index) => {
                return <TableItem tableData={item} key={index} />;
              })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default AreaListTable;
