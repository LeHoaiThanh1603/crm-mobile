import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


import './UpdateAccount.css';
function UpdateAccount({ data, openUpdate, onCloseUpdate }) {

    const [showPassword, setShowPassword] = useState(false);
    const [updateName, setUpdateName] = useState('')

    const onsubmit = () => {

    }

    return (
        <div className='wrapper-add'>
            <Dialog
                fullScreen
                open={openUpdate}
            >
                <DialogTitle sx={{ textAlign: 'center', margin: '40px 0' }} id="alert-dialog-title">
                    {'Sửa tài khoản'}
                </DialogTitle>
                <DialogContent>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '1000px', margin: '16px auto' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='item'>
                            <InputLabel sx={{ width: '180px' }} htmlFor="outlined-adornment-password">Tên Tài Khoản:</InputLabel>
                            <TextField onChange={e => setUpdateName(e.target.value)} sx={{ flex: 1 }} id="outlined-basic" label="Tên tài khỏan" variant="outlined" value={data ? data.row.available_name : ''} />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '180px' }} htmlFor="outlined-adornment-password">Mật khẩu:</InputLabel>
                            <TextField
                                sx={{ flex: 1 }}
                                type="password"
                                id="outlined-password-input"
                                label="Mật khẩu"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '180px' }} htmlFor="outlined-adornment-password">Nhập lại mật khẩu:</InputLabel>
                            <TextField
                                sx={{ flex: 1 }}
                                id="outlined-password-input"
                                label="Nhập lại mật khẩu"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                    </Box>

                    <Stack sx={{ justifyContent: 'end', maxWidth: '1000px', margin: '20px auto' }} spacing={2} direction="row">
                        <Button onClick={onCloseUpdate}>Thoát</Button>

                        <Button variant="contained" onClick={onsubmit} >Lưu tài khoản</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateAccount;