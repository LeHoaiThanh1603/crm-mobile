import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, trang bạn truy cập không có."
    extra={
      <Button type="primary" onClick={() => history.push('/reception')}>
        Quay lại
      </Button>
    }
  />
);

export default NoFoundPage;
