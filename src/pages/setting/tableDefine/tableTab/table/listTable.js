import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { buttonList } from '@/components/Button';
import QuickTablePopup from '../popup/quickTablePopup';
import TablePopup from '../popup/tablePopup';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { useIntl, useModel } from 'umi';
import ListTableItem from './listTableItem';

export default function ListTable({ locationParent }) {
  const intl = useIntl();
  const [showMTablePopup, setShowMTablePopup] = useState(false);
  const [showTablePopup, setShowTablePopup] = useState(false);
  const { table, updateTable } = useModel('hoteldata');
  const [listTable, setListTable] = useState();
  const [addOrEditTable, setAddOrEditTable] = useState('add');
  const [tableEdit, setTableEdit] = useState();

  const deleteTable = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append('id', data[i]);
    }

    useFetch(
      '/api/Defines/DeleteTable',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          updateTable();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const editableTable = (data) => {
    useFetch(
      '/api/Defines/UpdateTable',
      'PUT',
      'application/json',
      JSON.stringify([data]),
      (res) => {
        if (res.success == 1) {
          setShowTablePopup(!showTablePopup);
          updateTable();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const createTable = (data) => {
    useFetch(
      '/api/Defines/CreateTable',
      'POST',
      'application/json',
      JSON.stringify([data]),
      (res) => {
        if (res.success == 1) {
          setShowTablePopup(!showTablePopup);
          updateTable();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const quickCreateTable = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    useFetch(
      '/api/Defines/QuickCreateTable',
      'POST',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          setShowMTablePopup(!showMTablePopup);
          updateTable();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  useEffect(() => {
    setListTable(table.filter((item) => item.locMaSo == locationParent));
  }, [locationParent, table]);
  return (
    <div className="list-table-container">
      {showMTablePopup && (
        <QuickTablePopup
          visible={showMTablePopup}
          onClose={() => setShowMTablePopup(!showMTablePopup)}
          locationParent={locationParent}
          onOK={(data) => quickCreateTable(data)}
        />
      )}
      {showTablePopup && (
        <TablePopup
          addOrEditTable={addOrEditTable}
          value={tableEdit}
          visible={showTablePopup}
          onClose={() => {
            setShowTablePopup(!showTablePopup);
            setTableEdit(null);
          }}
          locationParent={locationParent}
          onOK={(data) => (addOrEditTable == 'add' ? createTable(data) : editableTable(data))}
          deleteTable={(id) => {
            deleteTable([id]);
            setShowTablePopup(!showTablePopup);
          }}
        />
      )}
      <Row>
        <Col span={24} className="d-flex justify-content-end">
          <buttonList.add
            className="w-auto"
            onClick={() => {
              setAddOrEditTable('add');
              setShowTablePopup(!showTablePopup);
            }}
            title={intl.formatMessage({ id: 'pages.setting.tabledefine.addtable' })}
          />
          <span style={{ width: 20 }} />
          <buttonList.add
            className="w-auto"
            onClick={() => setShowMTablePopup(!showMTablePopup)}
            title={intl.formatMessage({ id: 'pages.setting.tabledefine.addquicktable' })}
          />
        </Col>
        <Col span={24} className="mt-2">
          <ListTableItem
            locationParent={locationParent}
            listTable={listTable}
            onItemClick={(value) => {
              setAddOrEditTable('edit');
              setTableEdit(value);
              setShowTablePopup(!showTablePopup);
            }}
            onItemClickDel={(value) => {
              deleteTable(value);
            }}
            onItemClickAdd={(record) => {
              setAddOrEditTable('add');
              setTableEdit(record);
              setShowTablePopup(!showTablePopup);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
