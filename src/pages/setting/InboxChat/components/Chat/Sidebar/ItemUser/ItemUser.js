import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { userAction, userState } from '@/slices/messageSlice';
import { Badge } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faceBookIcon, telegramIcon, webWidgetIcon, zaloIcon } from '../../../asset';
import FormatDate from '../../Common/FormatDate/FormatDate';
import './ItemUser.css';

function ItemUser({ itemData, setEmptyChat, isActive, readMessage, idMessageGuest, notSeen, lastMessage, localIDs,selectedItem,setSelectedItem },props ) {

  const dispatch = useDispatch()
  const id = useSelector(userState)
  const refActive = useRef()
  const [localState, setLocalState] = useLocalStorage('conversations')
  const [seenMessge, setSeenMessage] = useLocalStorage('seenConversations')
  useEffect(() => {
    isActive && handleSubmitMessageById()
  }, [])

  const handleSubmitMessageById = (e) => {
    const indexToRemove = localIDs.indexOf(Number(itemData.conversationId));

    // Xóa phần tử đó
    if (indexToRemove !== -1) {
      localIDs.splice(indexToRemove, 1);
    }

    setSeenMessage(localIDs)

    const activeElement = document.querySelector('.wrapperUser.active')
    if (activeElement && activeElement !== refActive.current) {
      activeElement.classList.remove('active')
    }
    refActive.current.classList.add('active')
    dispatch(
      userAction.selectUserMessager({
        id: itemData.conversationId,
        image: itemData.senderThumbnail,
        name: itemData.senderName,
        email: itemData.senderEmail,
        phone: itemData.senderPhone,
        senderLastActivityAt: itemData.senderLastActivityAt,
        senderAvaibilityStatus: itemData.senderAvaibilityStatus,
        channel: itemData.channel,
        attachments: itemData.attachments,
        messageType: itemData.messageType,
        senderType: itemData.senderType,
        senderId: itemData.senderId,
      })
    )
  }

  const handleDate = (date) => {
    const datenew = date.toString()
    const newDate = moment(datenew).subtract(5, 'hour').calendar();
    return newDate
  }

  const handleChannel = () => {
    switch (itemData.channel) {
      case "Channel::Telegram":
        return <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={telegramIcon} />
          <span className='channelName'>Onexus Telegram</span>
        </div>
      case "Channel::WebWidget":
        return <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={webWidgetIcon} />
          <span className='channelName'>One Nexus</span>
        </div>

      case "Channel::FacebookPage":
        return <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={faceBookIcon} />
          <span className='channelName'>Onexus Facebook</span>
        </div>

      case "Channel::Api":
        return <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={webWidgetIcon} />
          <span className='channelName'>One Nexus</span>
        </div>
      case "Channel::Zalo":
        return <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '16px' }} src={zaloIcon} />
          <span className='channelName'>One Nexus Zalo OA</span>

        </div>
    }
  }

  const handleEmptyAvatar = () => {
    if (itemData.senderThumbnail !== '') {
      return <img className="imgSidebar" src={itemData.senderThumbnail} />;
    } else {
      return <div className="imgSidebarEmpty">{itemData.senderName.slice(0, 2)}</div>;
    }
  };

  const handleClick = () => {
    setSelectedItem(!selectedItem);
  };

  return (
    <div ref={refActive} className={`wrapperUser ${isActive && 'active'}`} onClick={handleSubmitMessageById}>
      <List
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0'
        }}
      >
        <ListItem alignItems="flex-start" className='itemConversation' 
        onClick={handleClick}
        >

          <ListItemAvatar className='wrapAvatar' >
            {handleEmptyAvatar()}
            {itemData.senderAvaibilityStatus === 'online' && <div className='WrapIconOnline'><div className='iconOnline'></div></div>}
          </ListItemAvatar>
          <div className='useItem'>

            <div className='mode'>
              {handleChannel()}
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              <ListItemText
                className={`
            ${(localIDs.length > 0
                    && localIDs.toString().includes(itemData.conversationId) || itemData.unreadCount === 1) && 'notSeen'} wrapperText`}
                primary={itemData.senderName}
                secondary={
                  <>

                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      className='textMess'
                    >
                      <span className='mess'>
                        {readMessage ?
                          <span style={{ fontWeight: 'bold!importan' }} className='no-read'>
                            {
                              lastMessage?.connversition.toString() === itemData.conversationId ?
                                lastMessage.lastMessage : itemData.lastMessage
                            }
                          </span>
                          :
                          <span className='read'>{` 
                      ${lastMessage?.connversition.toString() === itemData.conversationId ?
                              lastMessage.lastMessage : itemData.lastMessage
                            }`}</span>

                        }
                      </span>
                    </Typography>
                  </>
                }
              />
              <div className='wrapTime'>
                <div className='time'>
                  <FormatDate date={lastMessage?.connversition.toString() === itemData.conversationId ?
                    lastMessage.updated_at : itemData.messageCreatedAt} />
                </div>
                {
                  itemData.unreadCount > 0 &&
                  <Badge
                    className="site-badge-count-109"
                    count={itemData.unreadCount}
                    style={{
                      backgroundColor: '#52c41a',
                      marginBottom: '4px'
                    }}
                  />
                }

              </div>
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default ItemUser;