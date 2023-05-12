import React, { useState, useEffect } from 'react';
import { List, Empty, Divider, Card, Popconfirm, Space } from 'antd';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';
import { useIntl } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './listTableItem.less';
import { mapByKey } from '@/e2e/extensionMethod';

export default function ListTableItem({
  listTable,
  onItemClick,
  onItemClickDel,
  onItemClickAdd,
  locationParent,
}) {
  const [listDataItem, setListDataItem] = useState();
  const intl = useIntl();

  useEffect(() => {
    if (listTable) {
      let dataItem = [];

      let xMax = Math.max(...listTable.map((item) => item.bpViTriX));

      for (let i = 1; i <= xMax; i++) {
        let listX = listTable.filter((item) => item.bpViTriX == i);
        if (listX) {
          let yMax = Math.max(...listX.map((item) => item.bpViTriY));
          let dataX = [];
          for (let j = 1; j <= yMax; j++) {
            let itemY = listX.find((item) => item.bpViTriY == j);
            if (itemY) {
              dataX.push(itemY);
            } else {
              dataX.push({
                bpTen: '',
                bpMaSo: null,
                locMaSo: locationParent,
                bpViTriX: i,
                bpViTriY: j,
              });
            }
          }
          dataItem.push({
            label: (
              <>
                <Divider orientation="left">
                  <div className="d-flex">
                    <Space>
                      <span>
                        {intl.formatMessage({ id: 'pages.setting.tabledefine.row' }) + ' ' + i}
                      </span>
                      {dataX.length > 0 && (
                        <Popconfirm
                          placement="rightTop"
                          onConfirm={() => {
                            onItemClickDel(mapByKey(dataX, 'bpMaSo'));
                          }}
                          title={intl.formatMessage({
                            id: 'pages.setting.tabledefine.confirmdelete',
                          })}
                          okText={intl.formatMessage({ id: 'pages.setting.tabledefine.yes' })}
                          PopconfirmcancelText={intl.formatMessage({
                            id: 'pages.setting.tabledefine.no',
                          })}
                        >
                          <buttonList.delete />
                        </Popconfirm>
                      )}
                    </Space>
                  </div>
                </Divider>
                <List
                  grid={{ gutter: 16, column: yMax > 10 ? 10 : yMax }}
                  dataSource={dataX}
                  renderItem={(item) => (
                    <List.Item>
                      {item.bpMaSo ? (
                        <Card
                          bordered
                          hoverable
                          size="small"
                          className="card-item"
                          onClick={() => onItemClick(item.bpMaSo)}
                        >
                          <label.titlexl>{item.bpTen}</label.titlexl>
                        </Card>
                      ) : (
                        <Card
                          bordered
                          hoverable
                          size="small"
                          className="card-item-empty"
                          onClick={() => onItemClickAdd(item)}
                        >
                          <label.titlexl>
                            {intl.formatMessage({ id: 'pages.setting.tabledefine.empty' })}
                          </label.titlexl>
                        </Card>
                      )}
                    </List.Item>
                  )}
                />
              </>
            ),
          });
        } else {
          dataItem.push({
            label: <Empty />,
          });
        }
      }
      setListDataItem(dataItem);
    }
  }, [listTable]);
  return (
    <div className="px-3 tabledefine-container">
      <List dataSource={listDataItem} renderItem={(item) => item.label} />
    </div>
  );
}
