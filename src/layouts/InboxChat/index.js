import React, { useEffect, useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chat from './components/Chat/Chat';
import ChatwootWidget from './components/ChatwootWidget';

import { createAccount, CreateAContact, GetAllAgent } from '@/untils/chatApi';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');


    // const pubSubToken = "<contact/user-pub-sub-token>";
    // const accountId = "<your-account-id-in-integer>";
    // const userId = "<user-id-in-integer-if-using-user-token>";
    // const connection = new WebSocket(
    //   "wss://chat.onexus.net/cable"
    // );

    // connection.send(
    //   stringify({
    //     command: "subscribe",
    //     identifier: stringify({
    //       channel: "RoomChannel",
    //       pubsub_token: pubSubToken,
    //       account_id: accountId,
    //       user_id: userId,
    //     }),
    //   })
    // );


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tin Nhắn" value="1" />
              {/* <Tab label="Bình luận" value="2" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Chat />
          </TabPanel>
          {/* <TabPanel value="2">Item Two</TabPanel> */}
        </TabContext>
        <ChatwootWidget />
      </Box>
    </>
  );
}

