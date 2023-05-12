import React, { useEffect, useState, memo } from 'react';
import { Row, Col, TimePicker } from 'antd';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import { useFetch } from '@/components/Fetch/useFetch';
import moment from 'moment';
import { notification } from '@/components/Notification';
import { LanguageSelect } from '@/components/LanguageSelect';
import { ActionTypeSelect } from '@/components/ActionTypeSelect';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@/components/Ckeditor/ckeditor';
import { URL_API } from '@/e2e/configSystem'

function MessageDefine({ categorySelected }) {
  const intl = useIntl();
  const { templateMessage, updateTemplateMessage } = useModel('messagedata');
  const [ data, setData ] = useState({
    message: '',
    type: categorySelected,
    language: 'VNM',
    action: 'checkin',
    subject: ''
  });
  const [ message ] = useState({ data: null })

  const handleSave = () => {
    let up = {
      ...data,
      message: message.data
    }

    useFetch(
      '/api/Defines/CreateOrUpdateTemplateMessage',
      'POST',
      'application/json',
      JSON.stringify(up),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          updateTemplateMessage();
        } else if (res.success == 0) {
          notification.warning(
            intl.formatMessage({
              id: res.mess,
            }),
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            fetch(URL_API + `/api/Defines/UploadImageFromEditor`, {
              method: "post",
              body: body
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: res.file.url
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  useEffect(() => {
    if (!categorySelected) return;

    const messageFind = templateMessage.find((item) => {
      return item.language == data.language && item.type == categorySelected && item.action == data.action;
    });

    if (messageFind) {
      message.data = messageFind.message;
      setData(messageFind);
    } else {
      message.data = '';
      setData({
        language: data.language,
        type: categorySelected,
        message: '',
        action: data.action,
        subject: ''
      });
    }
  }, [ data.language, data.action, categorySelected ]);

  return (
    <div className="product-container">
      <div className="mb-3">
        <buttonList.save onClick={ handleSave } />
      </div>
      <hr />
      <Col xs={ 24 } sm={ 24 } md={ 22 } lg={ 16 } xl={ 9 }>
        <LanguageSelect
          style={ { alignItems: 'center' } }
          value={ data.language }
          onChange={ (value) => {
            setData({ ...data, language: value });
          } }
        />
      </Col>
      <hr />
      <Col xs={ 24 } sm={ 24 } md={ 22 } lg={ 16 } xl={ 9 }>
        <ActionTypeSelect
          style={ { alignItems: 'center' } }
          value={ data.action }
          onChange={ (value) => {
            setData({ ...data, action: value });
          } }
        />
      </Col>
      <hr />
      {
        categorySelected == 'email' &&
        <Col xs={ 24 } sm={ 24 } md={ 22 } lg={ 16 } xl={ 9 } className='mb-3'>
          <Row style={ { alignItems: 'center' } }>
            <Col span={ 6 }>
              <label.titlemd>
                { intl.formatMessage({ id: 'pages.setting.templatemessage.subject' }) }
              </label.titlemd>
            </Col>
            <Col span={ 18 }>
              <input.medium
                value={ data.subject }
                onChange={ (e) => setData({ ...data, subject: e.target.value }) }
              />
            </Col>
          </Row>
        </Col>
      }
      <Col xs={ 24 } sm={ 24 } md={ 22 } lg={ 16 } xl={ 9 }>
        <label.titlemd>
          { intl.formatMessage({ id: 'pages.setting.templatemessage.message' }) }
        </label.titlemd>
      </Col>
      {
        categorySelected == 'email' && <div className='w-100 ckeditor-toolbar-container'>
        </div>
      }
      <Row className="mt-4">
        <Col
          xs={ 24 }
          sm={ 24 }
          lg={ 24 }
          style={ { border: '1px solid #eee' } }
        >
          {
            categorySelected == 'email' && message.data != null ? <CKEditor
              editor={ DecoupledEditor }
              data={ message.data }
              config={ {
                extraPlugins: [ uploadPlugin ]
              } }
              onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                //console.log('Editor is ready to use!', editor);
                var element = document.querySelector('.ckeditor-toolbar-container');
                element.innerHTML = '';
                element.appendChild(editor.ui.view.toolbar.element);
              } }
              onChange={ (event, editor) => {
                const data = editor.getData();
                console.log(data);
                message.data = data;
              } }
              onBlur={ (event, editor) => {
                //console.log('Blur.', editor);
              } }
              onFocus={ (event, editor) => {
                //console.log('Focus.', editor);
              } }
            /> : <input.comment
              value={ data.message }
              onChange={ (e) => {
                message.data = e.target.value;
                setData({ ...data, message: e.target.value });
              } }
            />
          }
        </Col>
      </Row>
    </div>
  );
}

export default memo(MessageDefine);
