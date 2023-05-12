import React, { useRef, useEffect, useState } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import { input } from '@/components/Input';
import { useIntl } from 'umi';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';
import { select } from '@/components/Select';
import { Row, Col } from 'antd';
import { Switch } from '@/components/Switch';
import { SearchOffOutlined } from '@mui/icons-material';
import { useModel } from 'umi';
import Modal from '@/components/Popup';
import { formatNumber } from '@/e2e/extensionMethod';
import { log } from 'lodash-decorators/utils';
import { notification } from '@/components/Notification';
function UploadFile({ delDataEdit, visible = true, close, dataEdit, updateData }) {
  const intl = useIntl();

  const ref = useRef();
  const refEdit = useRef();

  const [data, setData] = useState();

  useEffect(() => {
    if (!visible) {
      setData([]);
    }
  }, [visible]);

  const upload = () => {
    event.preventDefault();
    if (data.name) {
      const formData = new FormData();

      formData.append('file', data);
      useFetch(
        '/api/Guest/GuestImportExcel',
        'POST',
        null,
        formData,
        (res) => {
          if (res.success == 1) {
            close();
            updateData();
            notification.success(
              intl.formatMessage({ id: res.mess }),
            );
          }
        },
        (error) => notification.warning(intl.formatMessage({ id: error.mess })),
      );
    } else notification.warning('chưa chọn files');
  };

  return (
    <form>
      <Modal
        width={'auto'}
        title={ intl.formatMessage({ id: 'pages.setting.guestlist.importguest' })}
        onOK={upload}
        visible={visible}
        onClose={close}
      >
        <div className="d-flex" style={{ flexDirection: 'column', gap: '10px', padding: '10px' }}>
          <div>
            <div className="uploadFile">
              {intl.formatMessage({
                id: 'pages.setting.guestlist.importfile',
              })}

              <input
                type="file"
                onChange={(e) => {
                  setData(e.target.files[0]);
                }}
              ></input>
            </div>

            {data ? (
              <div className="files">
                {data.name}{' '}
                {data.name ? (
                  <span
                    onClick={() => {
                      setData();
                    }}
                  >
                    +
                  </span>
                ) : undefined}
              </div>
            ) : undefined}
          </div>
        </div>
      </Modal>
    </form>
  );
}

export { UploadFile };
