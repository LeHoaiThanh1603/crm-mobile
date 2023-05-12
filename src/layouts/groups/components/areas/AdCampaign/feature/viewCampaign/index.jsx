import './index.css'
import { useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { getGroup, getListAdCampaign, sendMuiltibleChannel } from '@/untils/request';
import { ToastContainer, toast } from 'react-toastify';
function ViewCampaign({ Data, test }) {
    const [listdata, setListData] = React.useState([])
    console.log(listdata)
    console.log(Data)

    useEffect(() => {
        // getGroup('de').then(res => console.log(res.data))
        getListAdCampaign().then(res => setListData(res.data))

    }, [])

    const handleClose = () => {
        test(false)
    }

    const onSubmit = () => {
        sendMuiltibleChannel(Data.row.id).then(res => {

            if (res.status == 200) {
                toast.success("Chạy chiến dịch thành công!");
            }
        }).catch(err => console.log(err))
    }

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'time', headerName: 'Thời gian', width: 130 },
        {
            field: 'groupName', headerName: 'Chi tiết Nhóm', width: 230,
            // valueGetter: (params) =>
            //     `${params.row.groupName.slice(1)}`
        },
        {
            field: 'content',
            headerName: 'Nội dung',
            width: 300
        },
        { field: 'mode', headerName: 'Chế độ', width: 130 }
    ];
    return (
        <>
            <h3 className="header">XEM CHIẾN DỊCH</h3>
            <div className='container'>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={listdata.filter(item => (
                            item.id === Data.row.id
                        ))}
                        columns={columns}
                        pageSize={5}
                    />
                </Box>
            </div>
            <Stack direction="row" spacing={2} className='btn'>
                <Button variant="outlined" onClick={handleClose}>Thoát</Button>
                <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmit}>Gửi</Button>
            </Stack>
        </>
    );
}

export default ViewCampaign;