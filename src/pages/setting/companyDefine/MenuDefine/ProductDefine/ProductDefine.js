import React, { useEffect, useState, useRef, memo } from 'react';
import { Table, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import { FilterColumn, Filter } from '@/components/FilterColumn';

function ProductDefine({
  columns,
  columnFilter,
  id,
  categorySelected,
  language,
  handleShowUpdateProduct,
  pagination,
  data,
  update,
}) {
  const { product, updateProduct } = useModel('productdata');
  const intl = useIntl();
  const [productSelected, setProductSelected] = useState([]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({ ...pagination, total: product.length });
    updateProduct();
  };

  useEffect(() => {
    let productClone = [];
    productClone = product.filter((x) => x.lspMaSo == categorySelected);
    setProductSelected(productClone);
  }, [categorySelected]);
  return (
    <div className="product-container">
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            dataSource={data && id != 0 ? data.filter((i) => i.groupService == id) : data}
            columns={Filter(columnFilter, columns)}
            rowKey="spMaSo"
            pagination={pagination}
            onChang={handleTableChange}
            scroll={{ y: 'calc(100vh - 380px)' }}
            onRow={(record, rowIndex) => {
              return {
                onMouseEnter: (e) => {
                  if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'pointer';
                }, // mouse enter row
                onMouseLeave: (e) => {
                  if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'auto';
                }, // mouse leave row
                onClick: (event) => {
                  if (event.target.nodeName == 'TD') {
                    update(record);
                    handleShowUpdateProduct(record);
                  }
                }, // click row
              };
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default memo(ProductDefine);
