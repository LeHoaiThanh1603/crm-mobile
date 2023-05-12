import { useEffect } from 'react'
import UpdateAdCampaign from '../UpdateCampaign';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';



import Stack from '@mui/material/Stack';

import { useStateContext } from '@/layouts/groups/context/ContextProvider';
import {
  createAdCampaign,
  deleteAdCampaign,
  getListAdCampaign,
  insertRecord
} from '@/untils/request';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import './index.css';
// ===================================================
import { getGroup } from '@/untils/request';
import TextField from '@mui/material/TextField';


import ViewCampaign from '../ViewCampaign';



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

//==========/Add AdCampaign=============

function AddCampaign() {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])
  const [dataUpdate, setDateUpdate] = useState()
  const { closeUpdate, setCloseUpdate } = useStateContext()


  const columns = [
    { field: 'id', headerName: 'STT', width: '200' },
    {
      field: 'groupName', headerName: 'Tên Nhóm', width: 300, valueGetter: (params) =>
        `${params.row.groupName.slice(1)}`
    },
    { field: 'content', headerName: 'Nội dung', width: 300 },
    { field: 'time', headerName: 'Thời gian tạo', width: 200 },
    { field: 'mode', headerName: 'Phương thức gửi', width: 200 },
    {
      field: 'View',
      headerName: 'Xem', width: 130,
      renderCell: (cell) => (
        <Button onClick={e => {
          console.log('e', e, 'cell', cell)
          onViewAdCampaign(e, cell);
          setOpen(true)

        }}>
          <td><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" data-inspector-line="423" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></td>
        </Button>
      )
    },
    // {
    //   field: 'Edit',
    //   headerName: 'Sửa', width: 130,
    //   renderCell: (cell) => (
    //     <Button onClick={e => {
    //       onEditAdCampaign(e, cell);
    //       console.log("cell", cell)
    //       setDateUpdate(cell)
    //       setCloseUpdate(true)

    //     }}>
    //       <td><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" data-inspector-line="426" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></td>
    //     </Button>
    //   )
    // },
    {
      field: 'Delete',
      headerName: 'Xoá', width: 130,
      // key: adCampaign.id,
      renderCell: (cell) => (
        <Button onClick={id => {
          onDeleteAdCampaign(id, cell);
        }}>
          <td><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" data-inspector-line="429" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></td>
        </Button>
      )
    },
  ];
  const { adCampaign, setAdCampaign } = useStateContext();
  // console.log(adCampaign);

  const onViewAdCampaign = (e, cell) => {
    console.log('view', cell)
    setData(cell)
  }
  const onEditAdCampaign = (e, cell) => {
    setDateUpdate(cell)
  }
  const onDeleteAdCampaign = (id, cell) => {
    deleteAdCampaign(cell.row.id).then(() => getListAdCampaign().then((res) => {
      if (res.status == 200) {
        toast.success("Xóa chiến dịch thành công")
        setAdCampaign(res.data)
      }
    }));
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseUpdate = () => {
    setCloseUpdate(false)
  }

  //=====================ADD AdCampaign============================
  const [groupName, setGroupName] = useState("");
  const [dataGroup, setDataGroup] = useState([]);
  const [method, setMethod] = useState("");
  const [content, setContent] = useState("")
  const [time, setTime] = useState("")
  const [openSearchGroups, setOpenSearchGroups] = useState(false)

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [groupsList, setGroupsList] = useState([])
  console.log('gr', groupsList)

  const onClickOpen = () => setOpenCreate(true);

  const onClose = () => setOpenCreate(false);
  const columnsGroup = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'groupName', headerName: 'Tên Nhóm', width: 150 },
    { field: 'groupDescription', headerName: 'Mô Tả Nhóm', width: 200 },
    { field: 'method', headerName: 'Phương thức', width: 100 },
  ];

  const handleChangeSearch = (e) => {
    setGroupName(e.target.value)
    console.log(e.target.value)
  }
  const onSubmitSearchNameGroup = () => {
    getGroup(groupName).then(res => setDataGroup(res.data))
  }

  useEffect(() => {
    onSubmitSearchNameGroup()
  }, [])

  const onSubmitCreateAdCampaign = (e) => {
    let groupName = ""
    for (var i = 0; i < selectedRows.length; i++) {
      groupName = groupName + "," + selectedRows[i].groupName
    }
    const data = {
      content: content,
      time: time,
      mode: method,
      groupName: groupName
    }
    createAdCampaign(data).then(res => {
      if (res.status == 200) {
        toast.success("Tạo chiến dịch thành công");
      }
      const dataRecord = {
        UserName: JSON.parse(Cookies.get('userlogin')).name,
        CreatedTime: new Date(),
        RecordName: `Tạo mới dịch `
      }
      insertRecord(dataRecord)
    })
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onChangeTime = (e) => {
    setTime(e.target.value)
  }
  const onClickCheckMethod = (e) => {
    setMethod(e.target.value)
    console.log(e.target.value)
  }

  const handleCloseSearchGroups = () => {
    setOpenSearchGroups(false)
  }

  const onSelectGroupName = (e) => {
    setGroupName(e.row.groupName)
  }

  const handRemoveGroups = (index) => {
    const newGroups = [...groupsList]
    newGroups.splice(index, 1)
    setGroupsList(newGroups)
  }

  const handleShowPopup = () => {
    setOpenSearchGroups(true)
  }

  const handleAddGroupsName = () => {
    setGroupsList(selectedRows)
    setOpenSearchGroups(false)
  }

  const handleToggle = (group) => () => {
    const currentIndex = checked.indexOf(group);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(group);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // setChecked(newChecked);
  };
  //====================/ADD AdCampaign=============================
  return (

    <div style={{ height: 400, width: '100%' }}>
      <h5 className="TextCenter" >Danh sách chiến dịch </h5>
      <Button className="btn-right" variant="contained" onClick={() => { onClickOpen() }}>Thêm chiến dịch1</Button>
      <Button variant="contained" className="btn_mr15" >Xoá chiến dịch</Button>


      <Dialog
        open={openCreate}
        // TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >

        <DialogTitle sx={{ fontSize: '30px' }} >{'Thêm Chiến Dịch'}</DialogTitle>
        <form onSubmit={onSubmitCreateAdCampaign} method="POST" style={{ width: '1000px', margin: '0 auto' }}>

          <DialogContent>
            <div className='flex mb'>
              <span className="title">Nội dung: </span>


              <TextField name="Nội dung" fullWidth label="Nội dung" value={content} onChange={onChangeContent} />
            </div>

            <div className='flex mb'>
              <span className="title">Thời Gian: </span>

              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="datetime-local"
                  label="Thời gian"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={time} onChange={onChangeTime}
                />
              </Stack>
            </div>

            <div className='flex mb'>
              <span className="title">Phương thức: </span>
              <FormGroup className='ml_50'>
                <FormControlLabel control={<Checkbox value={"SMS"} onChange={onClickCheckMethod} />} label="SMS" />
                <FormControlLabel control={<Checkbox value={"Zalo"} onChange={onClickCheckMethod} />} label="Zalo" />
                <FormControlLabel control={<Checkbox value={"Email"} onChange={onClickCheckMethod} />} label="Email" />
              </FormGroup>
            </div>

            <div className='groups-name'>
              <span className="title">Tên Nhóm: </span>

              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {groupsList.map((group, index) => {
                  const labelId = `checkbox-list-label-${group}`;

                  return (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments" onClick={() => handRemoveGroups(index)}>
                          x
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(group)} dense>

                        <ListItemText id={labelId} primary={group.groupName} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>

              <div className='searchGroupName-btn'>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleShowPopup}>Tìm Nhóm</Button>
                </Stack>
              </div>
            </div>
            <Dialog
              open={open}

              fullScreen
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <ViewCampaign Data={data} test={setOpen} />

            </Dialog>

            <Dialog
              open={closeUpdate}

              fullScreen
              // onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {console.log('re render')}
              <UpdateAdCampaign Data={dataUpdate} dataAdCampaign={setAdCampaign} />

              <Stack direction="row" spacing={2} className='btn'>
                <Button variant="outlined" onClick={handleCloseUpdate}>Thoát</Button>
              </Stack>
            </Dialog>

            <div className='popup-listGroups'>
              <Dialog
                open={openSearchGroups}
                onClose={handleCloseSearchGroups}
              >
                <div className="test ">
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 0, width: '50ch', margin: '0 20px 0 0' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" label="Nhập tên nhóm..." variant="outlined"
                      value={groupName} onChange={handleChangeSearch} />
                  </Box>

                </div>
                <div style={{ height: 300, width: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <DataGrid
                    rows={dataGroup}
                    columns={columnsGroup}
                    pageSize={10}
                    rowsPerPageOptions={[4]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRows = dataGroup.filter((row) =>
                        selectedIDs.has(row.id),
                      );
                      setSelectedRows(selectedRows);
                    }}

                  />
                </div>

                <DialogActions>
                  <Button onClick={handleCloseSearchGroups}>Thoát</Button>
                  <Button onClick={handleAddGroupsName} autoFocus>Thêm</Button>
                </DialogActions>
              </Dialog>
            </div>

          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Thoát</Button>
            <Button type="submit" >

              Xác nhận

            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* /AddAdCampaign */}


      <DataGrid
        rows={adCampaign}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection

      />
    </div>

  );
}

export default AddCampaign;
