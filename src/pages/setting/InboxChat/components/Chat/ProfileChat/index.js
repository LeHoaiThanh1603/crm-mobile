import './index.css';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { HiOutlineReply } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { userState } from '@/slices/messageSlice';
import { Contact } from '@/untils/request';
import { LeftOutlined } from '@ant-design/icons';

function ProfileChat({ stateHide,setStateHide }) {
  const [dropList, setDropList] = useState(false);
  const [dropMessReply, setDropMessReply] = useState(false);
  const conversation = useSelector(userState);
  const [dataContact, setDataContact] = useState({});
  useEffect(() => {
    const listItem = document.querySelectorAll('.item');
    listItem.forEach((item, i) => {
      i += 1;
      if (i % 2 === 0) {
        item.classList.add('tripper');
      }
    });
  }, [dropList]);

  useEffect(() => {
    if (conversation.senderType === 'Contact' || 'contact') {
      const contactID = Number(conversation.senderId);
      Contact(contactID).then((res) => setDataContact(res.data));
    }
  }, [conversation.id]);

  const handleEmptyAvatar = () => {
    if (dataContact?.thumbnail !== '') {
      return <img className="avatarImg" src={dataContact?.thumbnail} />;
    } else {
      return <div className="avatar">{dataContact?.name.slice(0, 2)}</div>;
    }
  };
  const handleBackToChat = () =>{
    setStateHide(!stateHide);
  }
 

  return (
    <div className={`wrapperProfile ${stateHide ? 'hideProfile' : ''}`}>
      <div className="Profile">
        <div className="headerProfile">
          <LeftOutlined onClick={handleBackToChat}/>
          <div className="avatarProfile mb">
            {handleEmptyAvatar()}
            {/* <span><FiChevronRight size={'30px'} /></span> */}
          </div>
          <div className="mb">
            <h4>{dataContact.name}</h4>
          </div>
          <div className="mb">
            <HiOutlineMail size={20} style={{ marginRight: '6px' }} />
            {dataContact.email ? (
              dataContact.email
            ) : (
              <span style={{ color: '#ccc' }}>không có sẵn</span>
            )}
          </div>
          <div className="mb">
            <BsTelephone size={18} style={{ marginRight: '8px' }} />
            {dataContact.phoneNumber ? (
              dataContact.phoneNumber
            ) : (
              <span style={{ color: '#ccc' }}>không có sẵn</span>
            )}
          </div>
        </div>

        <div className="bodyProfile">
          <div className="list-item">
            <div className="list-btn" onClick={() => setDropList(!dropList)}>
              <span>Thông tin hội thoại</span>
              <span className="icon">{dropList ? '-' : '+'}</span>
            </div>
            {dropList && (
              <div>
                <div className="item">
                  <h5 className="item-title">Bắt đầu tại</h5>
                  <span>Fri Feb 03 2023 16:46:54 GMT+0700 (Indochina Time)</span>
                </div>
                <div className="item">
                  <h5 className="item-title">Ngôn ngữ trình duyệt</h5>
                  <span>Vietnamese</span>
                </div>
                <div className="item">
                  <h5 className="item-title">Bắt đầu từ</h5>
                  <span>
                    <a href="https://onexus.net/">https://onexus.net/</a>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="list-item">
            <div className="list-btn" onClick={() => setDropMessReply(!dropMessReply)}>
              <span>Cuộc trò chuyện trước</span>
              <span className="icon">{dropMessReply ? '-' : '+'}</span>
            </div>
            {dropMessReply && (
              <div>
                <div className="historyMess">
                  <h5 className="historyMess-name">Thanh</h5>
                  <div className="historyMess-reply">
                    <HiOutlineReply style={{ marginRight: '6px', width: '20px' }} />
                    <p className="historyMess-content">
                      Cám ơn bạn đã liên hệ chúng tôi. Rất mong được hỗ trợ bạn lần sau.
                    </p>
                  </div>
                </div>
                <div className="historyMess">
                  <h5 className="historyMess-name">Thanh</h5>
                  <div className="historyMess-reply">
                    <HiOutlineReply style={{ marginRight: '6px', width: '20px' }} />
                    <p className="historyMess-content">Hẹn gặp lại quý khách.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileChat;
