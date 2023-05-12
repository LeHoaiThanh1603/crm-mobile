import { useState, useEffect } from 'react'
import AddAccount from './AddAccount/AddAccount';
import ViewAccount from './ViewAccount/ViewAccount'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateAccount from './UpdateAccount/UpdateAccount';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import './index.css'
import { getListAgent, removeAgent } from './../../../untils/chatApi';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ListUser() {
    const [openAdd, setOpenAdd] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)
    const [data, setData] = useState([])
    const [view, setView] = useState()
    const [update, setUpdate] = useState()
    const [remove, setRemove] = useState(false)
    console.log(remove)

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Tên Tài khoản',
            width: 400,
        },
        {
            field: 'view',
            headerName: 'Xem',
            width: 150,
            renderCell: (cell) => (
                <Button onClick={() => {
                    setView(cell)
                    setOpenView(true)
                }}>
                    <VisibilityIcon />
                </Button>
            )
        },
        {
            field: 'edit',
            headerName: 'Sửa',
            sortable: false,
            width: 150,
            renderCell: (cell) => (
                <Button onClick={() => {
                    setUpdate(cell)
                    setOpenUpdate(true)
                }}>
                    <EditIcon />
                </Button>
            )
        },
        {
            field: 'delete',
            headerName: 'Xóa',
            sortable: false,
            width: 150,
            renderCell: (cell) => (

                <Button onClick={() => {
                    // setOpenRemove(true)
                    removeAgent(cell.id).then(() => getListAgent().then(res => {
                        setData(res.data)
                        setOpenRemove(false)
                    }))
                }}


                
                >
                    <DeleteIcon />
                </Button>
            )
        },
    ];

    useEffect(() => {

        getListAgent().then(res => setData(res.data))
    }, [])


    return (
        <div className='wrapper-account'>
            <h2 style={{ textAlign: 'center' }}>Danh Sách Tài Khoản</h2>
            <Stack spacing={2} direction="row" sx={{ margin: '40px 0 20px', justifyContent: 'end' }}>
                <Button
                    variant="contained"
                    onClick={() => setOpenAdd(!openAdd)}
                >
                    Tạo tài khoản</Button>
            </Stack>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            <AddAccount datasetAgent={setData} openAdd={openAdd} onCloseAdd={() => setOpenAdd(false)} />
            <ViewAccount data={view} openView={openView} onCloseView={() => setOpenView(false)} />
            <UpdateAccount data={update} openUpdate={openUpdate} onCloseUpdate={() => setOpenUpdate(false)} />


            {openRemove && <Dialog
                open={openRemove}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>{"Bạn có chắc chắn xóa tài khoản này không !"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRemove(false)}>Thoát</Button>
                    <Button onClick={() => setRemove(true)}>Xóa</Button>
                </DialogActions>
            </Dialog>}
        </div>
    );
}

export default ListUser;