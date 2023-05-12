import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
// ===================================================
import { notification } from '@/components/Notification';
import { getGroup } from '@/untils/request';
import { Radio } from 'antd';
import { useIntl } from 'umi';

//===========import component==================
import AddGroupsToExcel from './AddGroupsToExcel';
import AddGroupsToTags from './AddGroupsToTags';
import AddGroupsToDK from './AddGroupToDK';
//===========/import component=================

//==========/Add Group=============
function AddGroups({ closeCreate, handleShowAddGroups }) {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [dataUpdate, setDateUpdate] = useState();
  const { closeUpdate, setCloseUpdate } = useStateContext();
  const [closeAdd, setCloseAdd] = useState(false);
  //=====================ADD Group============================
  const [groupName, setGroupName] = useState('');
  const [dataGroup, setDataGroup] = useState([]);
  const [method, setMethod] = useState('');
  const [content, setContent] = useState('');

  const columnsGroup = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'groupName',
      headerName: 'Tên Nhómm',
      width: 150,
    },
    { field: 'groupDescription', headerName: 'Mô Tả Nhóm', width: 200 },
    { field: 'method', headerName: 'Phương thức', width: 100 },
  ];

  const onSubmitSearchNameGroup = () => {
    getGroup(groupName).then((res) => setDataGroup(res.data));
  };

  useEffect(() => {
    onSubmitSearchNameGroup();
  }, []);
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // ====================/ADD Groups=============================
  const [value, setValue] = useState(1);
  const [valueMethod, setValueMethod] = useState('tag');
  const [selectMethod, setSelectMethod] = useState(true);

  const [showAddGroupsTo, setShowAddGroupsTo] = useState(false);

  const handleShowAddGroupsTo = () => {
    setShowAddGroupsTo(!showAddGroupsTo);
  };

  const onChangeMethod = (e) => {
    setValueMethod(e.target.value);
  };
  const onSelectMethod = (valueMethod) => {
    if (valueMethod === '') {
      notification.warning('Vui lòng chọn phương thức');
    } else {
      setSelectMethod(!selectMethod);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex' }}>
        <form style={{ width: '50%' }}>
          <>
            {selectMethod ? (
              <div style={{marginTop: "170px" }}>
                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                  {intl.formatMessage({ id: 'pages.setting.groups.titleAddGroup' })}
                </h2>
                <div style={{ height: '500px' }}>
                  <div style={{ marginBottom: '40px' }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.Step1AddGroup' })}
                  </div>
                  <Radio.Group
                    defaultValue={'tag'}
                    onChange={onChangeMethod}
                    value={valueMethod}
                    style={{ marginLeft: '10px',marginTop: "-30px"}}
                  >
                    <Radio defaultValue={'tag'} value={'tag'} style={{ display: "block" }}>
                      {intl.formatMessage({ id: 'pages.setting.groups.tags' })}
                    </Radio>
                    <Radio value={'dieuKien'} style={{ display: "block" }}>
                      {intl.formatMessage({ id: 'pages.setting.groups.conditional' })}
                    </Radio>
                    <Radio value={'excel'} style={{ display: "block" }}>{intl.formatMessage({ id: 'pages.setting.groups.toExcel' })}</Radio>
                  </Radio.Group>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button variant="contained" onClick={handleShowAddGroups}>
                  {intl.formatMessage({ id: 'pages.setting.groups.btnBack' })}
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    variant="contained"
                    onClick={() => {
                      onSelectMethod();
                      handleShowAddGroupsTo();
                    }}
                  >
                    {intl.formatMessage({ id: 'pages.setting.groups.btnNext' })}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {(() => {
                    switch (valueMethod) {
                      case 'tag':
                        return <AddGroupsToTags onSelectMethod={onSelectMethod} />;
                      case 'dieuKien':
                        return <AddGroupsToDK onSelectMethod={onSelectMethod} />;
                      case 'excel':
                        return <AddGroupsToExcel onSelectMethod={onSelectMethod} />;
                    }
                  })()}
                </div>
              </div>
            )}
          </>
        </form>
      </div>
    </div>
  );
}

export default AddGroups;
