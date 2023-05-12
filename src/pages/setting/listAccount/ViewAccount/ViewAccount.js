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


import './ViewAccount.css';
function ViewAccount({ data, openView, onCloseView }) {
    return (
        <div style={{ width: '500px' }}>
            <Dialog
                fullWidth
                open={openView}
            >
                <DialogTitle sx={{ textAlign: 'center', margin: '40px 0' }} id="alert-dialog-title">
                    {'Xem tài khoản'}
                </DialogTitle>
                <DialogContent>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, margin: '16px auto' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='item'>
                            <InputLabel sx={{ width: '150px' }}>Tên Tài Khoản:</InputLabel>
                            <TextField
                                multiline
                                variant="standard"
                                sx={{ flex: 1 }}
                                value={data ? data.row.available_name : ''} />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '150px' }}>Email:</InputLabel>
                            <TextField
                                multiline
                                variant="standard"
                                sx={{ flex: 1 }}
                                value={data ? data.row.email : ''}

                            />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '150px' }}>Quyền:</InputLabel>
                            <TextField
                                multiline
                                variant="standard"
                                sx={{ flex: 1 }}
                                value={data ? data.row.role : ''}

                            />


                        </div>

                    </Box>

                    <Stack sx={{ justifyContent: 'end', margin: '20px auto' }} spacing={2} direction="row">
                        <Button onClick={onCloseView}>Thoát</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ViewAccount;