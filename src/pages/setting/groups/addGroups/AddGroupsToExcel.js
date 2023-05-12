import Button from '@mui/material/Button';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
//===========Excel==================
import { PlusOutlined } from '@ant-design/icons';
import { Space, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ListGroups from '../ListGroup';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { notification } from '@/components/Notification';
const { Dragger } = Upload;
import { useIntl, useModel } from 'umi';
//===========/Excel=================

function AddGroupsToExcel({ onSelectMethod }) {
  const [createAdd, setCreateAdd] = useState(false);
  const intl = useIntl();
  //=================sự kiện=====================
  const [data, setData] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [ExcelFile, setExcelFile] = useState('');
  const onChangeContentName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const onChangeContentDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  const props = {
    name: 'file',
    multiple: false,
    action: 'http://api.cm.onexus.net/api/Group/CreateGroup',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        setExcelFile(info.file.name);
        return notification.success(intl.formatMessage({ id: 'pages.setting.groups.uploadedSuccess' }));
      } else if (status === 'error') {
        message.error(intl.formatMessage({ id: 'pages.setting.groups.uploadedFailed' }));
      }
    },
  };
  //===============/upload file================
  const handleSubmit = async () => {
    switch (true) {
      case Name.trim().length === 0:
        return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterName' }));
      case Description.trim().length === 0:
        return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterDescription' }));
      case ExcelFile.trim().length === 0:
        return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterExcel' }));
    }
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('Name', Name);
      formData.append('Description', Description);
      formData.append('Type', 1);
      formData.append('ExcelFile', ExcelFile);
      // Send data to API
      const response = await fetch('http://api.cm.onexus.net/api/Group/CreateGroup', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    // Sau khi tạo nhóm thành công, ẩn component AddGroupsToTags và hiển thị component Groups
    setCreateAdd(true);
    return notification.success(intl.formatMessage({ id: 'pages.setting.groups.createGroupSuccess' }));
  };

  //=================/sự kiện=====================

  return (
    <>
      {createAdd ? (
        <>
          <ListGroups />
        </>
      ) : (
        <>
          <div style={{marginTop: "170px" }}>
            <h2
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              {intl.formatMessage({ id: 'pages.setting.groups.titleAddGroupToExcel' })}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ height: '500px' }}>
                <div style={{ marginBottom: '40px' }}>
                  {' '}
                  {intl.formatMessage({ id: 'pages.setting.groups.Step2AddGroup' })}
                </div>
                <div>
                  <p className="title" style={{ width: '150px', margin: '0' }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.nameGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentName}
                  />
                  {/* value={content} */}
                </div>
                <div>
                  <p className="title" style={{ width: '150px', margin: '0', paddingTop:"15px" }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.descriptionGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentDescription}
                  />
                </div>
                <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
                  <p style={{ width: '150px', marginTop: '4px' }}>
                    {' '}
                    {intl.formatMessage({ id: 'pages.setting.groups.flieExcel' })}:{' '}
                  </p>
                  <Dragger
                    {...props}
                    style={{ background: 'none', border: 'none', marginTop: '-15px' }}
                  >
                    <Button>
                      {' '}
                      {intl.formatMessage({ id: 'pages.setting.groups.flieExcelSelect' })}
                    </Button>
                  </Dragger>
                </div>
              </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" onClick={onSelectMethod}>
                {intl.formatMessage({ id: 'pages.setting.groups.btnBack' })}
              </Button>
              <Button style={{ marginLeft: '10px' }} variant="contained" onClick={handleSubmit}>
                {intl.formatMessage({ id: 'pages.setting.groups.btnCreateGroup' })}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddGroupsToExcel;
