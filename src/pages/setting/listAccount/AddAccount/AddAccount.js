import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import './AddAccount.css';
import { createAgent, setAgent, getListAgent } from '@/untils/chatApi';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function AddAccount({ datasetAgent, openAdd, onCloseAdd }) {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [accountName, setAccountName] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [data, setData] = useState({})
    const [dataAgent, setDataAgent] = useState()

    const validate = () => {
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
        } else {
            setError(null);
        }
    }

    const onSubmit = () => {
        validate()
        if (accountName.length === 0 || email.length === 0 || password.length === 0 || repassword.length === 0) {
            alert()
        } else if (password !== repassword) {
            alert('mật khẩu không khớp!')
        }

        const data = {
            name: accountName,
            email,
            password,
            custom_attributes: {}
        }

        createAgent(data).then(res => {
            const test = res.data
            const setAgentAccount = {
                user_id: test.id,
                role: "agent"
            }
            console.log('log', setAgentAccount)

            setAgent(setAgentAccount).then(res => getListAgent().then(res => datasetAgent(res.data)))

        }).then(onCloseAdd)


    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='wrapper-add'>
            <Dialog
                fullScreen
                open={openAdd}
            >
                <DialogTitle sx={{ textAlign: 'center', margin: '40px 0' }} id="alert-dialog-title">
                    {'Thêm tài khoản'}
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
                            <TextField sx={{ flex: 1 }} id="outlined-basic" label="Nhập tên tài khỏan" variant="outlined"
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '180px' }} htmlFor="outlined-adornment-password">Email:</InputLabel>
                            <TextField sx={{ flex: 1 }} id="outlined-basic" label="Nhập Email của bạn" variant="outlined"
                                onChange={(e) => setEmail(e.target.value)} error={error}
                                helperText={error ? 'Email không đúng, xin vui lòng nhập lại..' : undefined}
                            />
                        </div>

                        <div className='item'>
                            <InputLabel sx={{ width: '180px' }} htmlFor="outlined-adornment-password">Mật khẩu:</InputLabel>
                            <TextField
                                sx={{ flex: 1 }}
                                type="password"
                                id="outlined-password-input"
                                label="Mật khẩu"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
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
                                onChange={(e) => setRePassword(e.target.value)}
                                error={password !== repassword && repassword.length !== 0}
                                helperText={password !== repassword && repassword.length !== 0 ? "Mật khẩu không khớp." : ''}
                            />
                        </div>
                    </Box>

                    <Stack sx={{ justifyContent: 'end', maxWidth: '1000px', margin: '20px auto' }} spacing={2} direction="row">
                        <Button onClick={onCloseAdd}>Thoát</Button>

                        <Button variant="contained" onClick={onSubmit} >Thêm</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddAccount;