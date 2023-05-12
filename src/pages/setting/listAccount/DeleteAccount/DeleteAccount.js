import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import './DeleteAccount.css';
import { removeAgent } from '@/untils/chatApi';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteAccount({ onRemove, removeID = {}, openRemove, onCloseRemove }) {
    console.log('id', removeID.id)


    const handleRemove = () => {
        // removeAgent(removeID.id)
    }

    return (
        <Dialog
            open={openRemove}
            TransitionComponent={Transition}
            keepMounted
        // onClose={handleClose}
        >
            <DialogTitle>{"Bạn có chắc chắn xóa tài khoản này không !"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseRemove}>Thoát</Button>
                <Button onClick={() => {
                    onRemove()
                    onCloseRemove
                }}>Xóa</Button>
            </DialogActions>
        </Dialog>

    );
}

export default DeleteAccount;