import ContentChat from './ContentChat/ContentChat';
import Sidebar from './Sidebar/Sidebar';
import { useEffect, useMemo, useState } from 'react';
import ProfileChat from './ProfileChat';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import './Chat.css';
import { useDispatch } from 'react-redux';
import { seenMessageAction } from '@/slices/seenMessageSlice';
import { QueryClient, QueryClientProvider } from 'react-query';

function Chat() {
  const [stateHide, setStateHide] = useState(true);
  const [emptyChat, setEmptyChat] = useState(true);
  const [typing, setTyping] = useState(false);
  // const [chatToken, setChatToken] = useState()
  const [chat, setChat] = useState();
  const [conversion, setConversion] = useState();
  const [localState] = useLocalStorage('conversations');
  const [identifier, setIdentifier] = useState();
  const [agentChat, setAgentChat] = useState({});
  const [notSeen, setNotSeen] = useState(true);
  const [lastMessage, setLastMessage] = useState();
  const [converSationId, setConversationId] = useState();
  const [sortID, setSortID] = useState();
  const [attachment, setAttachment] = useState();
  const dispatch = useDispatch();
  // console.log(chat)
  useEffect(() => {
    // if (localState !== "") setEmptyChat(false)
  }, []);

  // useEffect(() => {
  //   Get().then(res => console.log(res.data))

  // }, [])
  // console.log(chatToken);
  /////////////////////
  // chỗ này sau t call api mà à t tơởng biến
  const chatToken = useMemo(
    () => ({
      accountName: 'CRM Backend',
      accessToken: '3KQNzcjHWjBZky688kR9J7w1',
      pubsubToken: 'sf9RBi8FeR3cyB2LffjGm5Z1',
      uid: 'crm@onexus.net',
      accountId: '1',
      websocketUrl: 'wss://chat.onexus.net/cable',
    }),
    [],
  );

  // Sự kiện onopen sẽ được gọi khi kết nối WebSocket đã hoàn tất
  useEffect(() => {
    const stringify = (payload = {}) => JSON.stringify(payload);
    const accountName = chatToken.accountName;
    const accessToken = chatToken.accessToken;
    const pubSubToken = chatToken.pubsubToken;
    const accountId = chatToken.accountId;
    const userId = chatToken.uid;
    const connection = new WebSocket(chatToken.websocketUrl);

    connection.onopen = () => {
      connection.send(
        stringify({
          command: 'subscribe',
          identifier: stringify({
            channel: 'RoomChannel',
            pubsub_token: pubSubToken,
            account_id: accountId,
            user_id: userId,
            account_Name: accountName,
          }),
        }),
      );

      const userPayload = stringify({
        command: 'message',
        identifier: stringify({
          channel: 'RoomChannel',
          pubsub_token: pubSubToken,
          account_id: accountId,
          user_id: userId,
          account_Name: accountName,
        }),
        data: stringify({ action: 'update_presence' }),
      });

      connection.send(userPayload);

      const agentPayload = stringify({
        command: 'message',
        identifier: stringify({
          channel: 'RoomChannel',
          pubsub_token: pubSubToken,
        }),
        data: stringify({ action: 'update_presence' }),
      });

      connection.onmessage = (event) => {
        const message1 = JSON.parse(event.data);

        const data = JSON.parse(event.data);

        if (data?.message?.event === 'conversation.read') {
          dispatch(
            seenMessageAction.handleSeen({
              seen: true,
            }),
          );
        }

        // if (data?.message?.event === "mesage.created" && data?.message?.data?.attachments.length > 0) {
        //   const attachments = data?.message?.data?.attachments
        //   attachments.map((attachment) => {
        //     setAttachment({
        //       attachmentId: attachment.id,
        //       messageId: attachment.message_id,
        //       fileType: attachment.file_type,
        //       dataUrl: attachment.data_url,
        //       thumbUrl: attachment.thumb_url,
        //       fileSize: attachment.file_size,
        //     })
        //   })
        // }

        //này là user support
        if (data?.message?.event === 'message.created' && data?.message?.data?.message_type === 1) {
          const newAgentChat = data.message?.data;
          setAgentChat({
            conversation_id: newAgentChat.conversation_id,
            content: newAgentChat.content,
            messageID: newAgentChat.id,
            attachments: newAgentChat.attachments,
            senderName: newAgentChat.sender.name,
            accountID: newAgentChat.account_id,
            senderThumbnail: newAgentChat.sender.thumbnail,
            sender: newAgentChat.sender,
            messageType: newAgentChat.message_type,
            messageContent: newAgentChat.content,
          });
          setSortID(newAgentChat.conversation_id);
        }
        //này là client trả về
        if (data?.message?.event === 'message.created' && data?.message?.data?.message_type !== 1) {
          const newChat = data.message?.data;
          // dispatch(seenMessageAction.handleSeen({
          //   seen: true,
          //   conversation_id: newChat.conversation_id,
          // }))
          setChat({
            conversation_id: newChat.conversation_id,
            content: newChat.content,
            messageID: newChat.id,
            attachments: newChat.attachments,
            senderName: newChat.sender?.name,
            accountID: newChat.account_id,
            senderThumbnail: newChat.sender?.thumbnail,
            sender: newChat.sender,
            messageType: newChat.message_type,
            seenMessage: true,
            unread_count: newChat.conversation.unread_count,
          });

          setSortID(() => {
            return newChat.conversation_id;
          });
          // setIdentifier(data?.identifier)
        } else if (data?.message?.event === 'message.created') {
          const newConversiton = data.message?.data;
          setTyping(false);
          setLastMessage({
            lastMessage: data?.message?.data?.content,
            connversition: data?.message?.data?.conversation_id,
            messageType: data?.message?.data?.message_type,
            updated_at: data?.message?.data?.updated_at,
          });

          setConversion({
            conversation_id: newConversiton.conversation_id,
            content: newConversiton.content,
          });
        } else if (data?.message?.event === 'conversation.typing_on') {
          setTyping(true);
          setConversationId(data?.message?.data?.conversation.id);
        } else if (
          data?.message?.event === 'conversation.typing_off' ||
          data?.message?.event === 'message.created'
        ) {
          setTyping(false);
          setConversationId(data?.message?.data?.conversation.id);
        }
      };
      connection.onerror = (error) => {
        // console.log('WebSocket error: ' + error);
      };
    };
    () => {};
  }, []);
  const [selectedItem, setSelectedItem] = useState(true);

  return (
    <div className="chat">
      <QueryClientProvider client={new QueryClient()}>
      {selectedItem === true ? (
        <Sidebar
          conversion={conversion}
          setEmptyChat={setEmptyChat}
          sortID={sortID}
          chat={chat}
          agentChat={agentChat}
          lastMessage={lastMessage}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      ):(
        <ContentChat
          attachment={attachment}
          chat={chat}
          agentChat={agentChat}
          setStateHide={setStateHide}
          stateHide={stateHide}
          emptyChat={emptyChat}
          typing={typing}
          conversationId={converSationId}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
        
         {/* <ProfileChat stateHide={stateHide} setStateHide={setStateHide} /> */}
      </QueryClientProvider>
    </div>
  );
}
export default Chat;
