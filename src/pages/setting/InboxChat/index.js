import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import ChatwootWidget from './components/ChatwootWidget';

// import { GetChatToken } from '@/untils/request';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const [data, setData] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: '170px' }}>
      <Chat />
    </div>
  );
}
