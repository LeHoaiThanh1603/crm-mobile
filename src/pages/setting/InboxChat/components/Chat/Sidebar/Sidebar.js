import { useCallApi } from '@/hooks/useCallApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { GetConversations } from '@/untils/request';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { Skeleton } from 'antd';
import { memo, useEffect, useState } from 'react';
import ItemUser from './ItemUser/ItemUser';
import './Sidebar.css';

function Sidebar({ conversion, setEmptyChat, agentChat, chat, lastMessage, sortID,selectedItem,setSelectedItem }) {
  // const [data, loading] = useCallApi("http://api.cm.onexus.net/api/Chat/GetConversations", "get")
  const [conversations, setConversation] = useLocalStorage('conversation');
  const [seenMessge, setSeenMessage] = useLocalStorage('seenConversations', []);

  const [dataLastMessage] = useCallApi();

  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [valueSearch, setValueSearch] = useState();

  useEffect(() => {
    if (!chat?.seenMessage) return;
    // Kiểm tra xem id đã tồn tại trong seenMessages chưa
    const isExist = seenMessge.find((item) => item === chat.conversation_id);
    if (isExist) return;
    setSeenMessage((prevSeenMessages) => {
      const newSeenMessages = [...prevSeenMessages, chat.conversation_id];
      return newSeenMessages;
    });
  }, [chat]);

  useEffect(() => {
    let mounted = true;
    GetConversations().then((res) => {
      if (mounted) {
        setData(res.data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [chat, dataFilter]);

  const handleFilter = (e) => {
    setLoading(true);
    const newDatafilter = [...data];
    const filterConversation = newDatafilter.filter((item) =>
      item.senderName.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    if (filterConversation) setLoading(false);
    if (e.target.value === '') {
      setDataFilter(!dataFilter);
    }
    setValueSearch(e.target.value);

    setData(filterConversation);
  };

  useEffect(() => {
    let id = sortID;
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].conversationId == id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      setData((curData) => {
        const newData = [...curData];
        var item = newData[index];
        newData.splice(index, 1);
        newData.unshift(item);
        return newData;
      });
    }
    const itemMessNew = data.find((element) => {
      return chat?.conversation_id.toString() === element.conversationId;
    });
  }, [sortID]);
  
  return (
    <>
      <div className="wrapperSidebar">
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm..."
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => handleFilter(e)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
        {data.length === 0 && <span>Không tìm thấy</span>}
        <div className="body-user">
          {loading
            ? Array.from({ length: 9 }, (_, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    padding: '14px 8px',
                  }}
                >
                  <Skeleton.Avatar active size={'large'} shape={'circle'} />
                  <Skeleton.Input active size={'large'} className="skelatonContent" />
                </div>
              ))
            : data.map((item) => {
                return (
                  <ItemUser
                    key={item.conversationId}
                    lastMessage={lastMessage}
                    itemData={item}
                    idMessageGuest={chat?.conversation_id.toString()}
                    isActive={conversations === item.conversationId}
                    setEmptyChat={setEmptyChat}
                    localIDs={seenMessge}

                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })}
        </div>
        {/* <div className="footer"></div> */}
      </div>
    </>
  );
}

export default memo(Sidebar);
