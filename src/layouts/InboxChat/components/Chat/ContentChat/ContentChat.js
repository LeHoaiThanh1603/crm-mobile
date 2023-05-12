import EmojiPicker from 'emoji-picker-react';
import User from './User/User';
import { SiIconify } from 'react-icons/si';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './ContentChat.css';
import { createRef, useRef, useState, useEffect } from 'react';
import { CreateAMessage } from '@/untils/chatApi';

function ContentChat() {
  const inputRef = createRef();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const emojiRef = useRef();
  // console.log(showEmoji)

  const pickEmoji = ({ emoji }, e) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(e, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + emoji + end;
    setMessage(text);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useEffect(() => {
    const Emoji = document.querySelector('.Emoji');
    const iconPlus = document.querySelector('.icon-plus');
    const icon = document.querySelector('.icon ');
    console.log(icon);
    const handleCloseEmoji = (e) => {
      if (
        !emojiRef.current.contains(e.target) &&
        !iconPlus.contains(e.target) &&
        !icon.contains(e.target)
      ) {
        setShowEmoji(false);
      } else {
        setShowEmoji(true);
      }
    };

    document.addEventListener('click', handleCloseEmoji);

    return () => document.removeEventListener('click', handleCloseEmoji);
  }, []);

  const handleShowEmoji = () => {
    setShowEmoji(true);
  };

  var configEmoji = {
    showPreview: false,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert('cac');
    CreateAMessage(message);
  };
  const stringify = (payload = {}) => JSON.stringify(payload);

  const connection = new WebSocket('wss://chat.onexus.net/cable');

  connection.onopen = () => {
    // CreateAContact();

    // const agentPayload = stringify({
    //   command: 'message',
    //   identifier: stringify({
    //     channel: 'RoomChannel',
    //     pubsub_token: pubSubToken,
    //   }),
    // });

    // connection.send(agentPayload);
  };

  connection.onmessage = async (message) => {
    // Log the message we recieve:
    console.log('Received data:', message.data);

    // Close the websocket after receiving the message
    connection.close();
  };

  return (
    <div className="contentChat">
      <div className="header">
        <User />
      </div>
      <div className="content"></div>
      <div className="footer-content">
        <div className="icon-plus">
          <SiIconify className="icon" onClick={handleShowEmoji} />
          <div ref={emojiRef} className="Emoji">
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
        <form style={{display: 'flex', width: '100%'}} onSubmit={onSubmit}>
          <div className="input-content">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={inputRef}
              placeholder="Nhập để gửi tin nhắn..."
            />
          </div>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContentChat;
