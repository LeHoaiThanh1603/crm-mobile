import './messageItem.less';
import { label } from '@/components/Label';
import moment from 'moment';
import { URL_API } from '@/e2e/configSystem';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Avatar } from 'antd';
import logoImg from '../assets/logo.svg';

const MessageItem = ({ info, onPreviewClick, room }) => {
  const { isUser, createTime, context, library, isError, img, onClick } = info;
  const [width, setWidth] = useState(0);
  const imageRef = useRef();

  return (
    <div
      className={`d-flex w-100 ${
        isUser ? 'align-self-end flex-row-reverse' : 'align-self-start'
      } message-item-container`}
      style={{ gap: '10px' }}
    >
      <Avatar
        style={{
          backgroundColor: '#cf5e3d',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        size={45}
        src={isUser ? logoImg : undefined}
      >
        {!isUser && room}
      </Avatar>
      <div className={`p-2 message-item align-self-${isUser ? 'end' : 'start'}`}>
        {typeof context == 'string' ? (
          <>
            {typeof library == 'string' && (
              <div
                className="d-flex align-items-center justify-content-center flex-wrap"
                style={{ gap: '10px' }}
              >
                {JSON.parse(library).map((item) => {
                  return (
                    <div key={item} style={{ width: 'auto', maxWidth: '400px' }} ref={imageRef}>
                      <img
                        onLoad={() => {
                          setWidth(imageRef.current.clientWidth);
                        }}
                        src={URL_API + '/assets/images/' + item}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        onClick={() => {
                          if (onPreviewClick) {
                            onPreviewClick(URL_API + '/assets/images/' + item);
                          }
                        }}
                        className="cursor-pointer"
                      ></img>
                    </div>
                  );
                })}
              </div>
            )}
            <div
              style={{
                minWidth:
                  typeof library == 'string' && JSON.parse(library).length > 0 ? '150px' : 'unset',
                maxWidth:
                  typeof library == 'string' && JSON.parse(library).length > 0 ? width : 'unset',
              }}
            >
              <label.titlemd>{context}</label.titlemd>
            </div>
          </>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center flex-wrap"
            style={{ gap: '10px' }}
          >
            {img
              ? img.map((item) => {
                  return (
                    <div key={item} style={{ height: '200px' }}>
                      <img
                        src={item}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        onClick={() => {
                          if (onPreviewClick) {
                            onPreviewClick(item);
                          }
                        }}
                        className="cursor-pointer"
                      ></img>
                    </div>
                  );
                })
              : JSON.parse(library).map((item) => {
                  return (
                    <div key={item} style={{ height: '200px' }}>
                      <img
                        src={URL_API + '/assets/images/' + item}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        onClick={() => {
                          if (onPreviewClick) {
                            onPreviewClick(URL_API + '/assets/images/' + item);
                          }
                        }}
                        className="cursor-pointer"
                      ></img>
                    </div>
                  );
                })}
          </div>
        )}
        <div style={{ textAlign: 'right' }}>
          {isError && (
            <label.titlexs>
              <span className="text-danger">Cannot send message!</span>{' '}
              <span
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }
                }}
                className="text-primary cursor-pointer"
              >
                Resend
              </span>
            </label.titlexs>
          )}{' '}
          <label.titlexs>{moment(createTime).format('HH:mm')}</label.titlexs>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
