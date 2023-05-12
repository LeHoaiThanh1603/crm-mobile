import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import { useEffect } from 'react';
///
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Stack from '@mui/material/Stack';

import { notification } from '@/components/Notification';
import { Switch } from '@/components/Switch';
import {
  createAdcampaign,
  getGroup,
  GetGroupsALL,
  getListAdCampaign,
  GetTemplateByChannelLanguage,
  insertRecord,
} from '@/untils/request';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Input, Modal, Radio, Table, Tag } from 'antd';
import Cookies from 'js-cookie';
import { IoMdTrash } from 'react-icons/io';
import './index.css';
import { Parser } from 'html-to-react';
import { useCallback } from 'react';
import { useIntl, useModel } from 'umi';
import './index.css';

function AddCampaign({ closeCreate }) {
  const intl = useIntl();
  const [groupName, setGroupName] = useState('');
  const [dataGroup, setDataGroup] = useState([]);
  const [content, setContent] = useState('');
  const [openSearchGroups, setOpenSearchGroups] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [openn, setOpenn] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataTemplate, setDatatemplate] = useState('Chưa Chọn');
  const [valueMethod, setValueMethod] = useState('zalo');
  const [selectMethod, setSelectMethod] = useState(true);
  const [valueTime, setValueTime] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState();
  const [dataTemplate1, setDataTemplate1] = useState([]);
  const [preview, setPreview] = useState();

  const handleCloseCreate = () => {
    setSelectMethod(true);
    setDatatemplate('Chưa Chọn');
    setGroupsList([]);
    setContent('');
    setSelectedRows([]);
  };
  const columnsGroup = [
    {
      field: 'id',
      headerName: intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignsearchGroupId' }),
      width: 50,
    },
    {
      field: 'groupName',
      headerName: intl.formatMessage({
        id: 'pages.setting.adsCampaign.adsCampaignsearchGroupName',
      }),
      width: 150,
    },
    {
      field: 'groupDescription',
      headerName: intl.formatMessage({
        id: 'pages.setting.adsCampaign.adsCampaignsearchGroupDescription',
      }),
      width: 200,
    },
    {
      field: 'tags',
      headerName: intl.formatMessage({
        id: 'pages.setting.adsCampaign.adsCampaignsearchGroupTags',
      }),
      width: 100,
    },
  ];

  const handleChangeSearch = (e) => {
    setGroupName(e.target.value);
  };
  //api groups
  const onSubmitSearchNameGroup = () => {
    getGroup(groupName).then((res) => setDataGroup(res.data));
  };

  useEffect(() => {
    onSubmitSearchNameGroup();
  }, []);

  //getTemplate
  useEffect(() => {
    const data = {
      channel: valueMethod,
      language: 'VNM',
    };
    GetTemplateByChannelLanguage(data).then((res) => setDataTemplate1(res.data));
  }, [valueMethod]);

  //createAdCampaign
  const onsubmit = (e) => {
    let d = startDate.getDate();
    let m = startDate.getMonth() + 1;
    let y = startDate.getFullYear();
    let h = startDate.getHours();
    let mi = startDate.getMinutes();

    if (d < 10) {
      d = '0' + d;
    }

    if (m < 10) {
      m = '0' + m;
    }

    if (h < 10) {
      h = '0' + h;
    }

    if (mi < 10) {
      mi = '0' + mi;
    }

    const date = d + '-' + m + '-' + y;
    const time = h + ':' + mi;
    const dateTime = date + ' ' + time;
    switch (true) {
      case content.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.adsCampaign.enterName' }),
        );
      case dataTemplate === 'Chưa Chọn':
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.adsCampaign.selectTemplate' }),
        );
      case groupsList.length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.adsCampaign.selectGroup' }),
        );
    }
    const selectGroup = groupsList.map((group) => group.id);

    const dataCreate = {
      name: content,
      template: dataTemplate.id.toString(),
      channel: valueMethod,
      group: selectGroup.join(', '),
      sendTime: valueTime === 1 ? dateTime : dateTime,
      sendNow: valueTime === 1 ? true : false,
    };

    createAdcampaign(dataCreate).then(() => {
      notification.success(intl.formatMessage({ id: 'pages.setting.adsCampaign.CreateSuccess' }));
      closeCreate(false);
    });
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleCloseSearchGroups = () => {
    setOpenSearchGroups(false);
  };
  console.log('test', selectedRows);
  const handRemoveGroups = (index) => {
    const newGroups = [...groupsList];
    newGroups.splice(index, 1);
    setGroupsList(newGroups);
    setSelectedRows(newGroups);
  };

  const handleShowPopup = () => {
    setOpenSearchGroups(true);
    GetGroupsALL().then((res) => setDataGroup(res.data));
  };

  const handleAddGroupsName = useCallback(() => {
    console.log('render');
    setGroupsList(selectedRows);
    setOpenSearchGroups(false);
  }, [selectedRows, groupsList]);

  const handleConvertJSX = (preview) => {
    console.log(preview);
    const html = preview.preview;
    const parser = new Parser();
    const jsx = parser.parse(html);
    console.log(jsx);

    return jsx;
  };

  const handleToggle = (group) => {
    const currentIndex = checked.indexOf(group);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(group);
    } else {
      newChecked.splice(currentIndex, 1);
    }
  };

  const showModal = () => {
    setOpenn(true);
  };
  const handleCancel = () => {
    setOpenn(false);
  };
  const columnsModule = [
    {
      title: intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTemplateStt' }),
      dataIndex: 'stt',
      key: 'stt',
      width: '10%',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTemplateName' }),
      dataIndex: 'template',
      key: 'template',
      width: '20%',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTemplateContent' }),
      dataIndex: 'content',
      key: 'content',
      className: 'templateContent',
      width: '60%',

      render: (preview) => {
        console.log(preview);
        switch (valueMethod) {
          case 'zalo':
            return (
              <a href={preview.preview} target="_blank">
                Xem nội dung
              </a>
            );
          case 'sms':
            return <div style={{ color: 'red' }}>{preview}</div>;
          case 'email':
            return preview;
        }
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.adsCampaign.adsCampaignTemplateSendingChannel',
      }),
      key: 'tags',
      dataIndex: 'tags',
      width: '10%',
      render: (text) => {
        switch (text) {
          case 'zalo':
            return (
              <span className="iconTags">
                <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg" />
              </span>
            );
          case 'email':
            return (
              <span className="iconTags">
                <img src="https://icons-for-free.com/download-icon-email+gmail+google+internet+message+icon-1320192780259745073_0.svg" />
              </span>
            );
          case 'sms':
            return (
              <span className="iconTags">
                <img src="https://cdn0.iconfinder.com/data/icons/tuts/256/messages.png" />
              </span>
            );
        }
      },
    },
  ];

  const dataModule = dataTemplate1.map((item, i) => {
    return {
      stt: i + 1,
      id: item.id,
      template: item.name ? item.name : item.subject,
      content: item.message,
      preview: item.message,
      tags: item.channel,
    };
  });

  const onChangee = (e) => {
    setValueTime(e.target.value);
  };

  const onChangeMethod = (e) => {
    setValueMethod(e.target.value);
  };
  const onSelectMethod = () => {
    if (valueMethod === '') {
      notification.warning('Vui lòng chọn phương thức');
    } else {
      setSelectMethod(false);
    }
  };
  const [selectedIDs, setSelectedIDs] = useState(new Set());

  const handleChangeCheckedGroups = (ids) => {
    setSelectedIDs(new Set(ids));
    const selectedIDs = new Set(ids);
    const checked = dataGroup.filter((row) => selectedIDs.has(row.id));
    {
      console.log(groupsList);
      console.log(checked);
    }
    setSelectedRows((prev) => {
      if (prev !== checked) {
        return checked;
      } else {
        return prev;
      }
    });
  };
  console.log('selectedRows', selectedRows);
  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* ---------select Template-----------*/}
      <Modal
        className="modelTemplate"
        title={intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTemplateTitle' })}
        open={openn}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div>
          <Table
            style={{ width: '400px' }}
            className="tableTemplate"
            columns={columnsModule}
            dataSource={dataModule}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setPreview(record);
                  setDatatemplate(record);
                  handleConvertJSX(record);
                  setOpenn(false);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
        </div>
      </Modal>
      {/* ---------select Template end -----------*/}

      <div className="FlexBlock" style={{ width: '50%', marginTop: '160px ', display: 'block' }}>
        <div className="widthData">
          <h2 style={{ marginBottom: '20px', padding: '20px 0', borderBottom: '1px solid #ccc',marginTop: "90px" }}>
            {intl.formatMessage({ id: 'pages.setting.adsCampaign.titleAddCampaign' })}
          </h2>
          {selectMethod ? (
            <div>
              <div className="wrapperW">
                <div style={{ marginBottom: '40px' }}>
                  {intl.formatMessage({
                    id: 'pages.setting.adsCampaign.titleAddCampaignStep1Title',
                  })}
                </div>
                <Radio.Group
                  onChange={onChangeMethod}
                  value={valueMethod}
                  style={{ marginLeft: '30px', minHeight: '330px' }}
                >
                  <Radio value="zalo" style={{ display: 'block' }}>
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignZalo' })}
                  </Radio>
                  <Radio value="sms" style={{ display: 'block' }}>
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignSms' })}
                  </Radio>
                  <Radio value="email" style={{ display: 'block' }}>
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignEmail' })}
                  </Radio>
                </Radio.Group>
              </div>
              <div style={{ display: 'flex', justifyContent: 'end', padding: '8px' }}>
                <Button
                  sx={{ marginRight: '8px' }}
                  variant="contained"
                  onClick={() => closeCreate(false)}
                >
                  {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignBack' })}
                </Button>
                <Button variant="contained" onClick={onSelectMethod}>
                  {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignNext' })}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="wrapperW">
                <div style={{ marginBottom: '40px' }}>
                  {intl.formatMessage({
                    id: 'pages.setting.adsCampaign.titleAddCampaignStep2Title',
                  })}
                </div>
                <div className="mb">
                  <span className="title">
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignName' })}
                  </span>

                  <Input
                    style={{ borderRadius: '10px', paddingTop: '8px' }}
                    placeholder={intl.formatMessage({
                      id: 'pages.setting.adsCampaign.adsCampaignName',
                    })}
                    value={content}
                    onChange={onChangeContent}
                  />
                </div>
                <div className=" mb" style={{ height: '30px' }}>
                  <span className="title">
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTime' })}{' '}
                  </span>
                  <Radio.Group onChange={onChangee} value={valueTime}>
                    <Radio value={1}>
                      {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignSendNow' })}
                    </Radio>
                    <Radio value={2}>
                      {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignSentAt' })}
                    </Radio>
                  </Radio.Group>

                  {valueTime === 2 && (
                    <Stack component="form" noValidate spacing={3}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="dd-MM-yyyy HH:mm"
                      />
                    </Stack>
                  )}
                </div>
                <div className="mb" style={{marginTop: "50px"}}>
                  <span className="title">
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignTemplate' })}
                  </span>
                  <div>
                    <span style={{ color: '#999999' }}>
                      {dataTemplate.template
                        ? dataTemplate.template
                        : intl.formatMessage({
                            id: 'pages.setting.adsCampaign.adsCampaignNoSelect',
                          })}
                    </span>
                    <span
                      style={{
                        marginLeft: '172px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onClick={showModal}
                    >
                      {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignAdjust' })}
                    </span>
                  </div>
                </div>
                <div>
                    {dataTemplate !== 'Chưa Chọn' && (
                      <div className="page-content preview">
                        <div className="bl-preview-template preview-content">
                          {valueMethod === 'zalo' ? (
                            <div className="body-preview">
                              <div className="bl-cover">
                                <div className="content-preview">
                                  <img
                                    className="logo"
                                    src="https://stc-oa.zdn.vn/uploads/2c343b41a8f41e97228db1e28023db4f.png"
                                    alt="logo preview"
                                  />
                                  <h5 className="titlePreview">Chào mừng &lt;customer_name&gt;,</h5>
                                  <div className="group-desc">
                                    <p>
                                      Cám ơn quý khách (mã số{' '}
                                      <span className="param">&lt;customer_id&gt;</span>, mã đơn
                                      hàng <span className="param">&lt;order_code&gt;</span>) đã sử
                                      dụng <span className="param">&lt;service&gt;</span> của chúng
                                      tôi vào ngày <span className="param">&lt;date&gt;</span>. Chúc
                                      quý khách luôn khỏe mạnh, bình an và hạnh phúc.
                                    </p>
                                  </div>
                                  <Button
                                    sx={{ width: '100%' }}
                                    variant="contained"
                                    className="button-wrap"
                                  >
                                    <a
                                      className="buttonLink"
                                      href="https://oa.zalo.me/1117761745119064675"
                                      target="_blank"
                                    >
                                      {' '}
                                      Quan tâm OA OneNexus
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="body-preview">
                              {valueMethod === 'sms' ? (
                                <div className="previewSMSbody">
                                  {' '}
                                  <span className="previewSMS">{preview.preview}</span>
                                </div>
                              ) : (
                                handleConvertJSX(preview)
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                <div className="groups-name marginTop400" style={{ marginTop: '-10px' }}>
                  <span className="title">
                    {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignNameGroup' })}{' '}
                  </span>
                  <List
                    className={groupsList.length > 0 && 'listSelectGroups'}
                    style={{ marginTop: '30px', marginLeft: '-160px' }}
                  >
                    {groupsList.length > 0 ? (
                      groupsList.map((group, index) => {
                        const labelId = `checkbox-list-label-${group}`;

                        return (
                          <div className="Grlist">
                            <ListItem
                              placeholder={intl.formatMessage({
                                id: 'pages.setting.adsCampaign.adsCampaignNoSelect',
                              })}
                              key={index}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                  onClick={() => handRemoveGroups(index)}
                                >
                                  <IoMdTrash />
                                </IconButton>
                              }
                              disablePadding
                            >
                              <ListItemButton role={undefined} dense>
                                <ListItemText id={labelId} primary={group.groupName} />
                              </ListItemButton>
                            </ListItem>
                          </div>
                        );
                      })
                    ) : (
                      <span style={{ color: '#999999' }}>
                        {intl.formatMessage({
                          id: 'pages.setting.adsCampaign.adsCampaignNoSelect',
                        })}
                      </span>
                    )}
                  </List>
                  

                  <div className="searchGroupName-btn">
                    <Stack direction="row" spacing={2}>
                      <Button onClick={handleShowPopup}>
                        {intl.formatMessage({
                          id: 'pages.setting.adsCampaign.adsCampaignSelectGroup',
                        })}
                      </Button>
                    </Stack>
                  </div>
                </div>

                <div className="popup-listGroups">
                  <Dialog open={openSearchGroups} onClose={handleCloseSearchGroups}>
                    <div className="test ">
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 0, width: '50ch', margin: '0 20px 0 0' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label={intl.formatMessage({
                            id: 'pages.setting.adsCampaign.adsCampaignsearchGroup',
                          })}
                          variant="outlined"
                          value={groupName}
                          onChange={handleChangeSearch}
                        />
                      </Box>
                    </div>
                    <div
                      style={{
                        height: 300,
                        width: '600px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <DataGrid
                        rows={dataGroup}
                        columns={columnsGroup}
                        pageSize={15}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        selectionModel={selectedRows.map((row) => row.id)}
                        onSelectionModelChange={(ids) => handleChangeCheckedGroups(ids)}
                      />
                    </div>

                    <DialogActions>
                      <Button onClick={handleCloseSearchGroups}>
                        {intl.formatMessage({
                          id: 'pages.setting.adsCampaign.adsCampaignsearchGroupBtnBack',
                        })}
                      </Button>
                      <Button onClick={handleAddGroupsName} autoFocus>
                        {intl.formatMessage({
                          id: 'pages.setting.adsCampaign.adsCampaignsearchGroupBtnAdd',
                        })}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
              <></>
              <DialogActions>
                <Button sx={{ marginRight: '8px' }} variant="contained" onClick={handleCloseCreate}>
                  {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignBack' })}
                </Button>
                <Button type="submit" variant="contained" onClick={onsubmit}>
                  {intl.formatMessage({ id: 'pages.setting.adsCampaign.adsCampaignCreate' })}
                </Button>
              </DialogActions>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCampaign;
