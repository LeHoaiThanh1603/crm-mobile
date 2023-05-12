import { useCallApi } from '@/hooks/useCallApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { userState } from '@/slices/messageSlice';
import {
  GetChatToken,
  GetMessage,
  postMess,
  SendMessageAttachFiles,
  SendMessager,
} from '@/untils/request';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {
  attachment,
  attachmenticon,
  faceBookIcon,
  telegramIcon,
  webWidgetIcon,
  zaloIcon,
} from '../../asset';
import LoadingChat from './../LoadingChat/LoadingChat';
import './ContentChat.css';
import ChatItem from './User/ChatItem';
import { RiAttachment2 } from 'react-icons/ri';
import { IoMdHappy } from 'react-icons/io';
import { MdSend } from 'react-icons/md';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import axios from 'axios';
import LoadingChatItem from './User/MessageContent/LoadingChatItem';
import { seenMessage } from '@/slices/seenMessageSlice';
import ProfileChat from '../ProfileChat';

function ContentChat({
  stateHide,
  setStateHide,
  typing,
  dataServer,
  chat,
  agentChat,
  conversationId,
  selectedItem,
  setSelectedItem,
}) {
  const conversation = useSelector(userState);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [dataMess, setDataMess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState();
  const [localState] = useLocalStorage('conversations');
  const emojiRef = useRef();
  const refForm = useRef();
  const refinput = useRef();
  const refChat = useRef();
  const reficon = useRef();
  const intoViewRef = useRef(null);
  const pickEmoji = ({ emoji }, e) => {
    const ref = refinput.current;
    ref.focus();
    const start = message.substring(e, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + emoji + end;
    setMessage(text);
    setCursorPosition(start.length + emoji.length);
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [multiple, setMultipeFile] = useState();
  const [dataInfoConversation] = useCallApi(
    'http://api.cm.onexus.net/api/Chat/GetConversations',
    'get',
  );
  useEffect(() => {
    let mounte = true;
    if (mounte) {
      const newAcount = dataInfoConversation.filter((account) => {
        if (account.conversationId === localState) {
          return account;
        }
      });
      setAccount(newAcount);
    }
    return () => (mounte = false);
  }, [dataInfoConversation]);

  //!user UI data
  useEffect(() => {
    if (agentChat?.conversation_id != conversation.id) return;
    let mounte = true;
    if (mounte) {
      setDataMess((prev) => {
        return [
          ...prev,
          {
            isReciper: false,
            senderName: agentChat.senderName,
            messageId: agentChat.messageID,
            conversationId: agentChat.conversation_id,
            text: message,
            messageType: agentChat.messageType,
            senderThumbnail: agentChat.senderThumbnail,
            attachments: agentChat.attachments,
            messageContent: agentChat.messageContent,
          },
        ];
      });
    }
    return () => (mounte = false);
  }, [agentChat]);

  //! user client
  useEffect(() => {
    if (chat?.conversation_id != conversation.id) return;
    let mounte = true;
    if (mounte) {
      setDataMess((curMess) => {
        return [
          ...curMess,
          {
            isReciper: true,
            senderName: chat?.senderName,
            messageId: chat?.messageID,
            conversationId: chat?.conversation_id,
            messageContent: chat?.content,
            messageType: chat?.messageType,
            senderThumbnail: chat?.senderThumbnail,
            attachments: chat?.attachments,
          },
        ];
      });
    }
    // }
    return () => (mounte = false);
  }, [chat, conversation?.id, localState]);

  useEffect(() => {
    if (refinput.current !== undefined) {
      refinput.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  useEffect(() => {
    intoViewRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dataMess, conversation]);

  const emojiContainerRef = useRef(null);
  const handleShowEmoji = (e) => {
    const Emoji = document.querySelector('.Emoji');
    if (!Emoji) return;
    if (emojiContainerRef.current.contains(e.target)) {
      return setShowEmoji(true);
    } else if (!emojiContainerRef.current.contains(e.target)) return setShowEmoji(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleShowEmoji);
    return () => {
      document.removeEventListener('click', handleShowEmoji);
    };
  }, []);

  var configEmoji = {
    showPreview: false,
  };

  const handleDate = (conversation) => {
    if (!conversation) return;
    if (conversation?.senderAvaibilityStatus === 'online') {
      return (
        <div className="wrapiconON">
          <div className="iconON"></div>
          online
        </div>
      );
    } else {
    }
    const datenew = conversation?.senderLastActivityAt?.toString();
    const newDate = moment(datenew).startOf('hour').fromNow();
    return newDate;
  };

  //////////////////////////////
  const handleChannel = useCallback(() => {
    switch (conversation?.channel) {
      case 'Channel::Telegram':
        return <img src={telegramIcon} />;
      case 'Channel::WebWidget':
        return <img src={webWidgetIcon} />;

      case 'Channel::FacebookPage':
        return <img src={faceBookIcon} />;

      case 'Channel::Api':
        return <img src={webWidgetIcon} />;

      case 'Channel::Zalo':
        return <img src={zaloIcon} />;
    }
  }, [conversation?.channel]);

  useEffect(() => {
    //set lại data
    setDataMess([]);
    setLoading(true);

    let dataID = conversation?.id;
    //dataID ? dataID : localState
    GetMessage(dataID).then((res) => {
      setDataMess(res.data);
      setLoading(false);
      if (refChat.current) refChat.current.scrollTop = refChat.current.scrollHeight;
    });

    //thêm
    return () => {
      setDataMess([]);
      setMessage('');
    };
  }, [conversation?.id, localState]);
  //! user Send
  const handleSend = async (e) => {
    const msgText = refinput.current.value;
    if (!msgText || msgText.trim() === '') return;
    if (selectedFiles.length > 0) {
      // const fileInput = document.querySelector('.input-file')
      const data = new FormData();
      data.append('message', message);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        data.append('attachements', file, file.name);
      }

      const dataApi = {
        id: conversation?.id,
        content: message,
        data: data,
      };
      //send File
      SendMessageAttachFiles(dataApi);
      setSelectedFiles([]);
    } else {
      const data = {
        id: conversation?.id,
        content: message,
      };
      //send Message
      await SendMessager(data);
    }
    // if (message !== '') {
    //   setMessage(message => message.replace(/\n/g, ''));
    // }
    setMessage('');
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      setMessage(message + '\n' + '');
    } else if (e.keyCode == 13) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleHideProfile = () => {
    setStateHide(!stateHide);
  };

  const handleEmptyAvatar = () => {
    if (conversation?.image !== '') {
      return <img className="avatarImg" src={conversation?.image} />;
    } else {
      return <div className="avatar">{conversation?.name.slice(0, 2)}</div>;
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(selectedFiles.concat(files));
  };

  const handleDelete = (i) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(i, 1); // hoặc: newFiles = newFiles.filter((f, index) => index !== i);
    setSelectedFiles(newFiles);
  };

  const handleInput = (e) => {
    const element = e.target;
    element.style.height = '0px';
    element.style.height = element.scrollHeight + 'px';
    setMessage(e.target.value);
  };
  const seenbtn = useSelector(seenMessage);

  const handleClickBack = () => {
    setSelectedItem(!selectedItem);
  };
  return (
    <>
      {stateHide === true ? (
        <div className={`msger ${stateHide ? 'hideMargin' : ''}`} style={{ width: '425px' }}>
          <>
            <div className="msger-header">
              <LeftOutlined onClick={handleClickBack} />
              <div className="msger-header-container">
                <div className="msger-header-avatar">
                  {handleEmptyAvatar()}
                  <div className="logoChanel">{handleChannel()}</div>
                </div>
                <div className="msger-header-info">
                  <h4 className="msger-header-name">{conversation?.name}</h4>
                  <span className="msger-header-titlemsger-header-title">
                    {handleDate(conversation)}
                  </span>
                </div>
              </div>
              {/* BUTTON show profile */}
              <div
                ref={reficon}
                style={{ cursor: 'pointer' }}
                onClick={handleHideProfile}
                className="MenuHide-btn"
              >
                <HiOutlineMenuAlt2 size={'30px'} />
              </div>
            </div>

            <ul ref={refChat} className="msger-chat">
              {loading ? (
                <LoadingChat />
              ) : (
                dataMess.length > 0 &&
                dataMess.map((item, i) => (
                  <>
                    <ChatItem
                      refChat={refChat}
                      dataMess={item}
                      key={i}
                      isReciper={item?.isReciper || item.messageType === 0}
                      text={item.messageContent}
                      imgUser={agentChat?.sender?.thumbnail}
                      imgGuest={chat?.imgGuest}
                    />
                  </>
                ))
              )}
              <div ref={intoViewRef} className="seenBtn">
                {seenbtn.seen && 'Đã xem'}
              </div>
            </ul>
            {typing && conversationId == conversation.id && (
              <div className="msg-typing">
                <span> {`${conversation?.name} đang soạn tin nhắn`}</span>
                <div class="snippet" data-title="dot-flashing">
                  <div class="stage">
                    <div class="dot-flashing"></div>
                  </div>
                </div>
              </div>
            )}

            {/** footer */}
            <>
              <div className="msger-inputarea">
                <textarea
                  type="text"
                  onKeyDown={(e) => handleKeydown(e)}
                  ref={refinput}
                  value={message}
                  onChange={handleInput}
                  className={`msger-input ${message === '' && 'setHeight'}`}
                  placeholder="Nhập tin nhắn..."
                ></textarea>
                <button ref={refForm} onClick={handleSend} className="msger-send-btn">
                  Gửi
                </button>
              </div>
            </>
            <div className="previewContainer">
              {selectedFiles.map((file, i) => {
                return (
                  <div key={i} className="preview">
                    <img src={URL.createObjectURL(file)} className="previewfile" alt="File" />
                    <span className="preview_name">{file.name}</span>
                    <span className="preview_del" onClick={(e) => handleDelete(i)}>
                      {<IoMdTrash />}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="action-select">
              <input
                className="input-file"
                type="file"
                id="file"
                multiple
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="fileAttachment">
                {<RiAttachment2 />}
              </label>

              <div
                ref={emojiContainerRef}
                className="emoij-btn fileAttachment"
                onClick={handleShowEmoji}
              >
                {<IoMdHappy />}
                <div ref={emojiRef} className="Emoji">
                  <div></div>
                  {showEmoji && (
                    <EmojiPicker
                      className="test"
                      previewConfig={configEmoji}
                      skinTonesDisabled={true}
                      onEmojiClick={pickEmoji}
                      height={320}
                      width={310}
                      size="20"
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        </div>
      ) : (
        <ProfileChat stateHide={stateHide} setStateHide={setStateHide} />
        // <>ProfileChat </>
      )}
    </>
  );
}

export default ContentChat;
