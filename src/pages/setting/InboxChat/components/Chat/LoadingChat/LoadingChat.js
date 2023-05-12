import { Alert, Space, Spin } from 'antd';
import './LoadingChat.css'
function LoadingChat() {
  return (
    <div style={{height: '100%'}}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Spin tip="Loading..." className='loading' >
        </Spin>
      </Space>
    </div>
  );
}

export default LoadingChat;
