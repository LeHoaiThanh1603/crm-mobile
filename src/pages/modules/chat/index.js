import { Row, Col, Radio, DatePicker, Avatar, Upload, Input, message } from 'antd';
import { input } from '@/components/Input';
import RoomItem from './roomItem';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';
import { groupBy, getBase64 } from '@/e2e/extensionMethod';
import './chat.less';
import pictureUploadIcon from './assets/pictureUpload.svg';
import logo from './assets/logocrm.png';
import sendIcon from './assets/send.svg';
import MessageItem from './messageItem';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useFetch } from '@/components/Fetch/useFetch';
import * as signalR from '@microsoft/signalr';
import { URL_API } from '@/e2e/configSystem';
import Cookies from 'js-cookie';
import Modal from '@/components/Popup';

const { TextArea } = Input;

const Chat = () => {
  const chatRef = useRef();
  const messageRef = useRef();
  const focusRef = useRef();
  const [text, setText] = useState('');
  const [roomChat, setRoomChat] = useState([]);
  const [date, setDate] = useState('');
  const [type, setType] = useState('inhouse');
  const [room, setRoom] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomNumInfo, setRoomNumInfo] = useState('');
  const [bookingInfo, setBookingInfo] = useState('');
  const [guestNameInfo, setGuestnameInfo] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageGroup, setMessageGroup] = useState({});
  const [imageList, setImageList] = useState([]);
  const [numberShow, setNumberShow] = useState(0);
  const [numberMessageShow, setNumberMessageShow] = useState(0);
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const [previewImg, setPreviewImg] = useState('');
  const [connection] = useState(
    new signalR.HubConnectionBuilder().withUrl(URL_API + '/hubsignalr').build(),
  );
  const [reconnection] = useState({ value: null });
  const [pendingScroll] = useState({ isPendingScroll: false, time: 1 });
  const chatRoomRef = useRef();
  const searchRef = useRef();
  const username = JSON.parse(Cookies.get('userlogin')).ssid;

  const onScroll = () => {
    if (chatRoomRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRoomRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        const formData = new FormData();
        formData.append('date', date);
        formData.append('room', room);
        formData.append('type', type);
        formData.append('currentRow', numberShow);
        formData.append('numRow', 10);
        useFetch(
          '/api/Messenger/GetGroupMessenger',
          'POST',
          null,
          formData,
          (res) => {
            if (res.length > 0) {
              setRoomChat((arr) => [...arr, ...res]);
              setNumberShow(numberShow + res.length);
            }
          },
          (err) => {
            console.log(err);
          },
        );
      }
    }
  };

  const onSendMessage = (value) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('groupId', roomId);
    formData.append('context', value);
    useFetch(
      '/api/Messenger/SendMessengerFromReception',
      'POST',
      null,
      formData,
      (res) => {
        if (res.success == 0) {
          setMessages((arr) => [
            ...arr,
            {
              isUser: true,
              createTime: moment(),
              isError: true,
              context: value,
              onClick: () => {
                onSendMessage(value);
              },
              day: moment().format('DD/MM/YYYY'),
            },
          ]);
        }
        messageRef.current.scrollTop = 0;
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const onMessageScroll = (e) => {
    if (messageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageRef.current;
      if (pendingScroll.isPendingScroll) {
        return;
      }
      if (Math.abs(scrollTop) >= scrollHeight - clientHeight - 200 * pendingScroll.time) {
        pendingScroll.isPendingScroll = true;
        const formData = new FormData();
        formData.append('IdGroup', roomId);
        formData.append('currentRow', numberMessageShow);
        formData.append('numRow', 10);
        useFetch(
          '/api/Messenger/GetMessengerOfGroup',
          'POST',
          null,
          formData,
          (res) => {
            if (res.length > 0) {
              res = res.map((item) => {
                return { ...item, day: moment(item.createTime).format('DD/MM/YYYY') };
              });
              setNumberMessageShow(numberMessageShow + res.length);
              setMessages((arr) => [...arr, ...res]);
              pendingScroll.time = pendingScroll.time + 1;
            }
            pendingScroll.isPendingScroll = false;
          },
          (err) => {
            console.log(err);
            pendingScroll.isPendingScroll = false;
          },
        );
      }
    }
    e.preventDefault();
  };

  const onSendMesseger = (message) => {
    const isInhouse = moment().isBetween(
      moment(message.group.arrival),
      moment(message.group.checkout),
    );
    if (message.messengerOfGroup) {
      if (message.isNew) {
        if ((!isInhouse && type === 'checkout') || (isInhouse && type === 'inhouse')) {
          setRoomChat((arr) => [message.group, ...arr]);
          setNumberShow((value) => value + 1);
        }
      } else {
        const isExistRoom = roomChat.find((item) => item.id == message.group.id);
        if (isExistRoom) {
          setRoomChat(
            roomChat.map((item) => {
              if (item.id === message.group.id) {
                if (roomId === message.group.id) {
                  return { ...message.group, isActive: true };
                } else {
                  return message.group;
                }
              }
              return item;
            }),
          );
        } else {
          if ((!isInhouse && type === 'checkout') || (isInhouse && type === 'inhouse')) {
            setRoomChat((arr) => [message.group, ...arr]);
            setNumberShow((value) => value + 1);
          }
        }
        if (roomId === message.group.id) {
          const isReadFormData = new FormData();
          isReadFormData.append('groupId', roomId);
          useFetch(
            '/api/Messenger/UpdateGroupMessengerIsRead',
            'POST',
            null,
            isReadFormData,
            (res) => {},
            (err) => {
              console.log(err);
            },
          );
          setMessages((arr) => [
            ...arr,
            {
              ...message.messengerOfGroup,
              day: moment(message.messengerOfGroup.createTime).format('DD/MM/YYYY'),
            },
          ]);
          setNumberMessageShow((value) => value + 1);
        }
      }
    }
    if (message.isRead) {
      setRoomChat(
        roomChat.map((item) => {
          if (item.id === message.group.id) {
            return { ...item, isRead: true };
          }
          return item;
        }),
      );
    }
  };

  const onClose = async () => {
    reconnection.value = setInterval(() => {
      if (connection._connectionState == 'Connected') clearInterval(reconnection.value);
      else if (connection._connectionState == 'Disconnected') connection.start();
      else location.reload();
    }, 5000);
  };

  const connectHubSignal = () => {
    connection.on('SendMessenger', onSendMesseger);
  };

  const offHubSignal = () => {
    connection.off('SendMessenger');
  };

  const getGroupMessage = (data) => {
    useFetch(
      '/api/Messenger/GetGroupMessenger',
      'POST',
      null,
      data,
      (res) => {
        if (roomId) {
          setRoomChat(
            res.map((item) => {
              if (item.id === roomId) {
                return {
                  ...item,
                  isActive: true,
                };
              }
              return item;
            }),
          );
        } else {
          setRoomChat(res);
        }
        setNumberShow(res.length);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const onRoomChatClick = (roomId, id, guestName, isRead, booking) => {
    pendingScroll.isPendingScroll = false;
    pendingScroll.time = 1;
    if (!isRead) {
      const isReadFormData = new FormData();
      isReadFormData.append('groupId', id);
      useFetch(
        '/api/Messenger/UpdateGroupMessengerIsRead',
        'POST',
        null,
        isReadFormData,
        (res) => {},
        (err) => {
          console.log(err);
        },
      );
    }
    setBookingInfo(booking);
    setRoomNumInfo(roomId);
    setGuestnameInfo(guestName);
    setRoomId(id);
    setRoomChat(
      roomChat.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isActive: true,
          };
        }
        if (item.isActive) {
          return {
            ...item,
            isActive: false,
          };
        }
        return item;
      }),
    );
    setTimeout(() => {
      focusRef.current.focus();
    }, 200);
    if (messageRef.current) {
      messageRef.current.scrollTop = 0;
    }
    const formData = new FormData();
    formData.append('IdGroup', id);
    useFetch(
      '/api/Messenger/GetMessengerOfGroup',
      'POST',
      null,
      formData,
      (res) => {
        res = res.map((item) => {
          return { ...item, day: moment(item.createTime).format('DD/MM/YYYY') };
        });
        setNumberMessageShow(res.length);
        setMessages(res);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    const sendImage = () => {
      if (imageList.length > 0) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('groupId', roomId);
        formData.append('context', '  ');
        for (let i = 0; i < imageList.length; i++) {
          formData.append('images[]', imageList[i]);
        }
        useFetch(
          '/api/Messenger/SendMessengerFromReception',
          'POST',
          null,
          formData,
          (res) => {
            if (res.success == 0) {
              setMessages((arr) => [
                ...arr,
                {
                  isUser: true,
                  createTime: moment(),
                  isError: true,
                  img: imageList,
                  context: null,
                  onClick: sendImage,
                  day: moment().format('DD/MM/YYYY'),
                },
              ]);
            }
            if (res.success == 1) {
              setImageList([]);
            }
            messageRef.current.scrollTop = 0;
          },
          (err) => {
            console.log(err);
          },
        );
      }
    };
    setTimeout(sendImage, 200);
    return () => clearTimeout(sendImage);
  }, [imageList]);

  const onTextAreaEnter = (e) => {
    e.preventDefault();
    if (e.target.value) {
      onSendMessage(e.target.value);
      setText('');
    }
    setTimeout(() => {
      messageRef.current.style.height = `calc(100% - 128px - ${chatRef.current.scrollHeight}px)`;
    }, 100);
  };

  useEffect(() => {
    setMessageGroup(
      groupBy(
        messages.sort((a, b) => {
          return new Date(a.createTime) - new Date(b.createTime);
        }),
        'day',
      ),
    );
  }, [messages]);

  const getListBase64 = (file) => {
    const list = [];
    for (const property of file) {
      getBase64(property, (image) => {
        list.push(image);
      });
    }
    return list;
  };

  useEffect(() => {
    getGroupMessage(null);
    const handleResize = () => {
      chatRoomRef.current.style.height = `calc(100% - ${searchRef.current.scrollHeight + 60}px)`;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    connectHubSignal();
    connection.onclose(onClose);
    connection.start();
  }, []);

  useEffect(() => {
    offHubSignal();
    connectHubSignal();
  }, [type, roomChat, numberShow, roomId, numberMessageShow]);

  useEffect(() => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('room', room);
    formData.append('type', type);
    getGroupMessage(formData);
  }, [date, type]);

  return (
    <>
      <Modal
        height={'600px'}
        width={'600px'}
        visible={showPreviewImg}
        title="Preview"
        children={
          <div style={{ maxHeight: '600px', maxWidth: '600px' }}>
            <img src={previewImg} alt="logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        }
        onClose={() => {
          setShowPreviewImg(false);
        }}
        visibleOK={false}
        cancelTitle="Ok"
      />
      <Row
        wrap={false}
        style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}
        className="chat-container"
      >
        <Col span={6} style={{ borderRight: '1px solid #E1E1E1', height: '100%' }}>
          <div ref={searchRef}>
            <div className="px-4 py-3">
              <input.medium
                onPressEnter={() => {
                  const formData = new FormData();
                  formData.append('date', date);
                  formData.append('room', room);
                  formData.append('type', type);
                  getGroupMessage(formData);
                }}
                placeholder="Search room"
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <Row className="px-4 d-flex align-items-center">
              <Col sm={24} xl={14} xxl={15} className="mb-3">
                <Radio.Group
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <Radio value="inhouse">Inhouse</Radio>
                  <Radio value="checkout">Checkout</Radio>
                </Radio.Group>
              </Col>
              <Col sm={24} xl={10} xxl={9} className="mb-3">
                <DatePicker
                  className="w-100"
                  value={date ? moment(date, 'YYYY/MM/DD') : ''}
                  onChange={(value) => {
                    if (value) {
                      setDate(value.format('YYYY/MM/DD'));
                    } else {
                      setDate('');
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
          <hr className="mb-0" />
          <div style={{ overflow: 'auto' }} ref={chatRoomRef} onScroll={onScroll}>
            {roomChat
              .sort((a, b) => {
                return new Date(b.lastUpdateTime) - new Date(a.lastUpdateTime);
              })
              .map((item) => {
                return <RoomItem key={item.id} info={item} onClick={onRoomChatClick} />;
              })}
          </div>
        </Col>
        <Col span={18} className="h-100">
          {!roomId ? (
            <div
              className="d-flex flex-column align-items-center justify-content-center h-100 welcome-group"
              style={{ gap: '20px' }}
            >
              <div>
                <img src={logo} style={{ height: '210px' }} />
              </div>
              <label.h1>WELCOME</label.h1>
              <label.h1>CRM ONEXUS</label.h1>
            </div>
          ) : (
            <>
              <div className="px-4 py-3" style={{ borderBottom: '1px solid #E1E1E1' }}>
                <Row className="d-flex align-items-center">
                  <Col sm={3} md={2} xxl={1}>
                    <Avatar size={50}>{roomNumInfo}</Avatar>
                  </Col>
                  <Col
                    sm={21}
                    md={22}
                    xxl={23}
                    className="d-flex flex-column px-3"
                    style={{ gap: '5px' }}
                  >
                    <label.titlelg>{guestNameInfo}</label.titlelg>
                    <label.titlemd>{`BK: ${bookingInfo}`}</label.titlemd>
                  </Col>
                </Row>
              </div>
              <div
                style={{ height: `calc(100% - 200px)`, overflow: 'auto' }}
                className="message-container p-3 d-flex flex-column-reverse"
                ref={messageRef}
                onScroll={onMessageScroll}
              >
                <div className="d-flex flex-column" style={{ gap: '20px' }}>
                  {Object.keys(messageGroup)
                    .map((key) => messageGroup[key])
                    .map((arr, index) => {
                      let time = moment(arr[0].createTime);
                      let diff = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY').diff(
                        moment(time.format('DD/MM/YYYY'), 'DD/MM/YYYY'),
                        'day',
                      );
                      return (
                        <React.Fragment key={index}>
                          <div className="position-relative">
                            <hr />
                            <div
                              className="position-absolute px-2 py-1 day-group"
                              style={{ backgroundColor: 'white' }}
                            >
                              <label.titlexs>
                                {`${
                                  diff == 0 || diff == 1
                                    ? diff == 0
                                      ? 'Today'
                                      : 'Yesterday'
                                    : time.format('DD/MM/YYYY')
                                } ${time.format('HH:mm')}`}
                              </label.titlexs>
                            </div>
                          </div>
                          {arr.map((item) => {
                            return (
                              <MessageItem
                                onPreviewClick={(value) => {
                                  setPreviewImg(value);
                                  setShowPreviewImg(true);
                                }}
                                key={item.id}
                                info={item}
                                room={roomNumInfo}
                              />
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                </div>
              </div>
              <div className="px-4 py-3" style={{ borderTop: '1px solid #E1E1E1' }} ref={chatRef}>
                <Row className="d-flex align-items-center">
                  <Col
                    xs={4}
                    sm={3}
                    md={2}
                    xxl={1}
                    className="d-flex align-items-center image-container"
                  >
                    <div className="uploadFile">
                      <buttonList.icon img={pictureUploadIcon} className="btn-upload" />
                      <input
                        accept="image/png, image/jpeg"
                        multiple
                        type="file"
                        onChange={(e) => {
                          setImageList(getListBase64(e.target.files));
                        }}
                      ></input>
                    </div>
                  </Col>
                  <Col xs={18} sm={19} md={21} xxl={22}>
                    <TextArea
                      ref={focusRef}
                      value={text}
                      className="w-100"
                      onChange={(e) => {
                        messageRef.current.style.height = `calc(100% - 128px - ${chatRef.current.scrollHeight}px)`;
                        setText(e.target.value);
                      }}
                      placeholder="Input text"
                      bordered={false}
                      autoSize={{ minRows: 1, maxRows: 4 }}
                      onPressEnter={onTextAreaEnter}
                    />
                  </Col>
                  <Col xs={2} sm={2} md={1}>
                    <buttonList.icon
                      className="btn-upload ms-3"
                      onClick={() => {
                        if (text) {
                          onSendMessage(text);
                          setText('');
                        }
                      }}
                      img={sendIcon}
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Chat;
