import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoAccessPage = () => (
  <Result
    status="403"
    title="403"
    subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
    extra={
      <Button type="primary" onClick={ () => history.push('/') }>
        Quay lại
      </Button>
    }
  />
);

export default NoAccessPage;
