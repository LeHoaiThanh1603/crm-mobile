import Button from '@mui/material/Button';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
//===========inputTags==================
import { PlusOutlined } from '@ant-design/icons';
import { Space, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import { useStateContext } from '../context/ContextProvider';
import ListGroups from '../ListGroup';
import AddGroups from '.';
import { notification } from '@/components/Notification';
//===========/inputTags=================
import { useIntl, useModel } from 'umi';

function AddGroupsToTags({ onSelectMethod }) {
  const intl = useIntl();
  //=================inputTags=================
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
  const tagInputStyle = {
    width: 78,
    verticalAlign: 'top',
  };
  const tagPlusStyle = {
    // background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
  // ================/inputTags=================

  //=================sự kiện=====================
  const [method, setMethod] = useState('tags');
  const [selectMethod, setSelectMethod] = useState(true);
  const [createAdd, setCreateAdd] = useState(false);
  //======Quay lại===========

  //======/Quay lại===========
  const [data, setData] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const onChangeContentName = (e) => {
    setName(e.target.value);
  };
  const onChangeContentDescription = (e) => {
    setDescription(e.target.value);
  };
  //=================/sự kiện=====================

  const handleSubmit = async () => {
    try {
      //Get the tag names from the state
      const tagsArr = tags.map((tag, index) => ({
        name: tag,
      }));
      const tagsString = tagsArr.map((tag) => tag.name).join(',');
      switch (true) {
        case Name.trim().length === 0:
          return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterName' }));
        case Description.trim().length === 0:
          return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterDescription' }));
        case tagsString.trim().length === 0:
          return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterTags' }));
      }
      // Create FormData object
      const formData = new FormData();
      formData.append('Name', Name);
      formData.append('Description', Description);
      formData.append('Type', 1);
      formData.append('Tags', tagsString);
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

  return (
    <>
      {createAdd ? (
        <ListGroups />
      ) : (
        <div style={{marginTop: "170px" }}>
          <>
            <h2
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              {intl.formatMessage({ id: 'pages.setting.groups.titleAddGroupToTags' })}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ height: '500px' }}>
                <div style={{ marginBottom: '40px' }}>
                  {intl.formatMessage({ id: 'pages.setting.groups.Step2AddGroup' })}
                </div>
                <div>
                  <p className="title" style={{ width: '150px', margin: '0' }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.nameGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentName}
                  />
                </div>
                <div>
                  <p className="title" style={{ width: '150px', margin: '0',paddingTop:"15px" }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.descriptionGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentDescription}
                  />
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100vh',
                    position: 'relative',
                  }}
                >
                  <p style={{ width: '132px', marginTop: '6px', position: 'absolute' }}>
                  {intl.formatMessage({ id: 'pages.setting.groups.listTagsGroup' })}:{' '}
                  </p>
                  <Space
                    size={[0, 8]}
                    wrap
                    style={{
                      position: 'absolute',
                      marginTop: '40px',
                    }}
                  >
                    <Space size={[0, 8]} wrap>
                      {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={editInputRef}
                              key={tag}
                              size="small"
                              style={tagInputStyle}
                              value={editInputValue}
                              onChange={handleEditInputChange}
                              onBlur={handleEditInputConfirm}
                              onPressEnter={handleEditInputConfirm}
                            />
                          );
                        }
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag
                            key={tag}
                            closable={index !== 0}
                            style={{
                              userSelect: 'none',
                            }}
                            onClose={() => handleClose(tag)}
                          >
                            <span
                              onDoubleClick={(e) => {
                                if (index !== 0) {
                                  setEditInputIndex(index);
                                  setEditInputValue(tag);
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                    </Space>
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    ) : (
                      <Tag style={tagPlusStyle} onClick={showInput}>
                        <PlusOutlined /> {intl.formatMessage({ id: 'pages.setting.groups.addTagsGroup' })}
                      </Tag>
                    )}
                  </Space>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" onClick={onSelectMethod}>
                  {intl.formatMessage({ id: 'pages.setting.groups.btnBack' })}
                </Button>
                <Button style={{ marginLeft: '10px' }} variant="contained" onClick={handleSubmit}>
                  {intl.formatMessage({ id: 'pages.setting.groups.btnCreateGroup' })}
                </Button>
              </div>
            </form>
          </>
        </div>
      )}
    </>
  );
}

export default AddGroupsToTags;
