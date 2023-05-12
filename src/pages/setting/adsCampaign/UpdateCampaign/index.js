import { getGroup, getListAdCampaign, insertRecord } from '@/untils/request';
import Box from '@mui/material/Box';
import { useEffect, useState, forwardRef } from 'react';
import './index.css';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { updateAdCampaign } from '@/untils/request';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useStateContext } from '../context/ContextProvider';
import Cookies from 'js-cookie';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function UpdateAdCampaign({ Data, dataAdCampaign }) {
    const [dataContent, setDataContent] = useState("");
    const [time, setTime] = useState("");
    const [method, setMethod] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [dataGroup, setDataGroup] = useState([]);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false)
    const [groupsList, setGroupsList] = useState([])
    const [checkedGroup, setCheckedGroup] = useState([])
    const [openNoti, setOpenNoti] = useState(false)
    const [openNotiFail, setOpenNotiFail] = useState(false)
    const { setCloseUpdate } = useStateContext()

    useEffect(() => {
        onSubmitSearchNameGroup()
    }, [])

    const handleChangeContent = (e) => {
        setDataContent(e.target.value);
    }

    const handleChangeTime = (time) => {
        setTime(time)
    }

    const handleChangeSearch = (e) => {
        setGroupName(e.target.value)

    }

    const onSubmit = () => {
        if (dataContent.length === 0) {
            setOpenNotiFail(true)
        } else {
            let groupIds = [];
            for (var name = 0; name < groupsList.length; name++) {
                groupIds.push(checkedGroup[name].id)
            }

            console.log(groupIds)
            const data = {
                "id": Data.row.id,
                "time": time.$d,
                "groupIds": groupIds.slice(',').join(),
                "content": dataContent,
                "mode": method.toString(),
            }
            updateAdCampaign(data).then(() => getListAdCampaign().then(res => {

                if (res.status == 200) {

                    dataAdCampaign(res.data)
                    toast.success("Sửa thành công")
                }
            })).catch(e => toast.error("Sửa thất bại")).then(() => {
                setTimeout(() => {
                    setCloseUpdate(false)
                }, 1000)
            })
        }

    }


    const onSubmitSearchNameGroup = () => {
        setLoading(true)
        getGroup(groupName).then(res => setDataGroup(res.data))
            .then(() => setLoading(false))
        setGroupName('')
    }
    const onSelectGroupName = (e) => {
        setGroupName(e.row.groupName)
    }

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'groupName', headerName: 'Tên Nhóm', width: 130 },
        { field: 'groupDescription', headerName: 'Chi tiết Nhóm', width: 130 },
        {
            field: 'method',
            headerName: 'Phương Thức',
        },
    ];

    const onClickCheckMethod = (e) => {
        setMethod(prev => {
            const isChecked = prev.includes(e.target.value)
            console.log(isChecked)
            if (isChecked) {
                return prev.filter(item => item !== e.target.value)
            } else {
                return [...prev, e.target.value]
            }
        })

    }

    const handleShowPopup = () => {
        onSubmitSearchNameGroup()
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
        setDataGroup([])

    };


    const handleToggle = (group) => () => {
        const currentIndex = checked.indexOf(group);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(group);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handRemoveGroups = (index) => {
        const newGroups = [...groupsList]
        newGroups.splice(index, 1)
        setGroupsList(newGroups)
    }

    const handleCheckGroupList = (ids) => {
        const selectedRowsData = ids.map((id) => dataGroup.find((data) => data.id === id));
        setCheckedGroup(selectedRowsData)

    }

    const handleAddGroupsName = () => {
        setGroupsList(checkedGroup)
        setOpen(false)
    }

    const handleCloseNoti = () => {
        setOpenNoti(false)
    }
    return (
        <div className="container-fluid">
            <h3 className="header">SỬA CHIẾN DỊCH</h3>
            <div className=" container">
                <div className="item">
                    <span className="title">Nội dung: </span>
                    <div className="content">
                        <TextField
                            error={dataContent.length !== 0 ? false : true}
                            helperText={dataContent.length !== 0 ? false : 'Vui long nhap truong nay!'}
                            id="outlined-basic"
                            className='content-box'
                            label="Nhập nội dung"
                            value={dataContent}
                            onChange={handleChangeContent} variant="outlined" />
                    </div>
                </div>

                <div className="item">
                    <span className="title">Thời Gian: </span>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            onError={() => 'loi'}
                            label="Thời gian"
                            value={time}
                            onChange={time => handleChangeTime(time)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className="item">
                    <span className="title">Phương Thức: </span>
                    <FormGroup sx={{
                        display: 'flex',
                    }} >
                        <FormControlLabel control={<Checkbox value={"SMS"} onChange={(e) => onClickCheckMethod(e)} />} label="SMS" />
                        <FormControlLabel control={<Checkbox value={"Zalo"} onChange={(e) => onClickCheckMethod(e)} />} label="Zalo" />
                        <FormControlLabel control={<Checkbox value={"Email"} onChange={(e) => onClickCheckMethod(e)} />} label="Email" />
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

                <div className='popup-listGroups'>
                    <Dialog
                        open={open}
                        onClose={handleClose}
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
                            <div>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={onSubmitSearchNameGroup}>Tìm Nhóm</Button>
                                </Stack>
                            </div>

                        </div>
                        <div style={{ height: 300, width: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {loading ?
                                <CircularProgress />
                                : <DataGrid
                                    sx={{
                                        padding: '0 30px ',
                                    }}
                                    rows={dataGroup}
                                    columns={columns}
                                    pageSize={5}
                                    onRowClick={onSelectGroupName}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    onSelectionModelChange={ids => handleCheckGroupList(ids)}

                                />}

                        </div>

                        <DialogActions>
                            <Button onClick={handleClose}>Thoátt</Button>
                            <Button onClick={handleAddGroupsName} autoFocus>Thêm</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div >
                    <Stack direction="row" spacing={2} className="save-btn">
                        <Button variant="contained" onClick={onSubmit}>Lưu chiến dịch</Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}


export default UpdateAdCampaign

    ;
