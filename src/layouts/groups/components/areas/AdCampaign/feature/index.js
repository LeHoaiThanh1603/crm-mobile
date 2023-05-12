// import { useState } from 'react'
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import * as React from 'react';


// import { useStateContext } from '@/layouts/groups/context/ContextProvider';
// import {
//     deleteAdCampaign,
//     getListAdCampaign
// } from '@/untils/request';
// import { DataGrid } from '@mui/x-data-grid';
// import './index.css';

// import ViewCampaign from './ViewCampaign';
// import UpdateAdCampaign from './UpdateCampaign';
// import AddCampaign from './AddCampaign';


// function AdCampaign() {
//     const [open, setOpen] = React.useState(false);
//     const [data, setData] = useState([])
//     const [dataUpdate, setDateUpdate] = useState()
//     const [openCreate, setOpenCreate] = useState(false);
//     const [openView, setOpenView] = useState(false);
//     const [openUpdate, setOpenUpdate] = useState(false);
//     const [openAddGroups, setOpenAddGroups] = useState(false);
//     const onClose = () => setOpenCreate(false);

//     const { closeUpdate, setCloseUpdate } = useStateContext()


//     const columns = [
//         { field: 'id', headerName: 'ID AdCampaign', width: '200' },
//         {
//             field: 'groupName', headerName: 'Group Name', width: 300
//         },
//         { field: 'content', headerName: 'Content', width: 300 },
//         { field: 'time', headerName: 'Created Time', width: 200 },
//         { field: 'mode', headerName: 'Mode', width: 200 },
//         {
//             field: 'View',
//             headerName: 'View', width: 130,
//             renderCell: (cell) => (
//                 <Button onClick={e => {
//                     console.log('e', e, 'cell', cell)
//                     onViewAdCampaign(e, cell);
//                     setOpenView(true)

//                 }}>
//                     <td><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" data-inspector-line="423" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></td>
//                 </Button>
//             )
//         },
//         {
//             field: 'Edit',
//             headerName: 'Edit', width: 130,
//             renderCell: (cell) => (
//                 <Button onClick={e => {
//                     onEditAdCampaign(e, cell);
//                     console.log("cell", cell)
//                     setDateUpdate(cell)
//                     setCloseUpdate(true)

//                 }}>
//                     <td><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" data-inspector-line="426" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></td>
//                 </Button>
//             )
//         },
//         {
//             field: 'Delete',
//             headerName: 'Delete', width: 130,
//             // key: adCampaign.id,
//             renderCell: (cell) => (
//                 <Button onClick={id => {
//                     onDeleteAdCampaign(id, cell);
//                 }}>
//                     <td><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" data-inspector-line="429" data-inspector-column="26" data-inspector-relative-path="src\layouts\groups\tabs\Group.js" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></td>
//                 </Button>
//             )
//         },
//     ];
//     const { adCampaign, setAdCampaign } = useStateContext();
//     // console.log(adCampaign);

//     const onViewAdCampaign = (e, cell) => {
//         console.log('view', cell)
//         setData(cell)
//     }
//     const onEditAdCampaign = (e, cell) => {
//         setDateUpdate(cell)
//     }
//     const onDeleteAdCampaign = (id, cell) => {
//         deleteAdCampaign(cell.row.id).then(() => getListAdCampaign().then((res) => {
//             if (res.status == 200) {
//                 toast.success("Xóa chiến dịch thành công")
//                 setAdCampaign(res.data)
//             }
//         }));
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }

//     const handleCloseUpdate = () => {
//         setCloseUpdate(false)
//     }

//     const onSubmitCreateAdCampaign = (e) => {
//         let groupName = ""
//         for (var i = 0; i < selectedRows.length; i++) {
//             groupName = groupName + "," + selectedRows[i].groupName
//         }
//         const data = {
//             content: content,
//             time: time,
//             mode: method,
//             groupName: groupName
//         }
//         createAdCampaign(data).then(res => {
//             if (res.status == 200) {
//                 toast.success("Tạo chiến dịch thành công");
//             }
//         })
//     }

//     return (
//         <form onSubmit={onSubmitCreateAdCampaign} method="POST" style={{ width: '1000px', margin: '0 auto' }}>
//             <div style={{ height: 400, width: '100%' }} >
//                 {/* <h5 className="TextCenter" >LIST ADCAMPAIGN </h5> */}
//                 <Button className="btn-right" variant="contained" onClick={() => { setOpenAddGroups(true) }}>Add AdCampaign</Button>
//                 <Button variant="contained" className="btn_mr15" >Delete AdCampaign</Button>

//                 <Dialog
//                     open={openCreate}
//                     // TransitionComponent={Transition}
//                     keepMounted
//                     onClose={onClose}
//                     aria-describedby="alert-dialog-slide-description"
//                     fullScreen
//                 >

//                 </Dialog>
//                 <DataGrid
//                     rows={adCampaign}
//                     columns={columns}
//                     pageSize={10}
//                     rowsPerPageOptions={[5]}
//                     checkboxSelection

//                 />



//                 <Dialog
//                     open={openAddGroups}
//                     onClose={handleClose}
//                     fullScreen
//                 >

//                     <DialogContent>
//                         <AddCampaign />

//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Disagree</Button>
//                         <Button onClick={handleClose} autoFocus>
//                             Agree
//                         </Button>
//                     </DialogActions>
//                 </Dialog>


//                 <Dialog
//                     open={openView}
//                     onClose={handleClose}
//                     fullScreen
//                 >

//                     <DialogContent>
//                         <ViewCampaign Data={data} test={setOpen} />

//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Disagree</Button>
//                         <Button onClick={handleClose} autoFocus>
//                             Agree
//                         </Button>
//                     </DialogActions>
//                 </Dialog>


//                 <Dialog
//                     open={closeUpdate}
//                     onClose={handleClose}
//                     fullScreen
//                 >

//                     <DialogContent>
//                         <UpdateAdCampaign Data={dataUpdate} dataAdCampaign={setAdCampaign} />

//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Disagree</Button>
//                         <Button onClick={handleClose} autoFocus>
//                             Agree
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>

//         </form>
//     )
// }

// export default AdCampaign;