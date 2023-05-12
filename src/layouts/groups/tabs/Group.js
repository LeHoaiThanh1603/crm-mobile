import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  deleteGroup,
  getListGroups,
  getGroupDetail,
  updateGroup,
  createGroup,
  removeCustomerInGroup,
  addCustomerIntoGroup,
} from '@/untils/request';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useStateContext } from '../context/ContextProvider';
import { DataGrid } from '@mui/x-data-grid';
import SearchField from '../components/SearchField/SearchField';
import Switch from '@mui/material/Switch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'STT',
  },
  {
    id: 'groupName',
    numeric: false,
    disablePadding: false,
    label: 'Tên Nhóm',
  },
  { id: 'details', numeric: false, disablePadding: false, label: 'Thông tin' },
  { id: 'edit', numeric: false, disablePadding: false, label: 'Sửa' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Xoá' },
];

const columns = [
  { field: 'id', headerName: 'STT', width: 90 },
  {
    field: 'maKhach',
    headerName: 'Mã khách',
    width: 150,
    editable: false,
  },
  {
    field: 'ten',
    headerName: 'Tên Khách Hàng',
    width: 250,
    editable: false,
  },
  {
    field: 'tenDangKy',
    headerName: 'Tên đăng ký',
    // type: 'number',
    width: 250,
    editable: false,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 150,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Phương thức',
    width: 150,
    editable: false,
    renderCell: (params) => {
      const {
        unConfirmedGuess,
        setUnConfirmedGuess,
        action,
        guessInGroup,
        setGuessInGroup,
        idDetail,
      } = useStateContext();
      return (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              if (action === 'Create') {
                var filteredExcept = unConfirmedGuess.filter(
                  (el) => el.maKhach != params.row.maKhach,
                );
                setUnConfirmedGuess(filteredExcept);
              } else if (action === 'Edit') {
                alert('Bạn có chắc muốn xoá nhóm này ?');
                var filteredExcept = guessInGroup.filter((el) => el.maKhach != params.row.maKhach);
                setGuessInGroup(filteredExcept);
                removeCustomerInGroup({
                  maKhach: params.row.maKhach,
                  id: idDetail.current,
                });
              } else if (action === '') {
                alert("This Dialog does't have permission to do this action");
                return;
              }
            }}
          >
            Xoá Khách
          </Button>
        </strong>
      );
    },
  },
];

export function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [openCreate, setOpenCreate] = useState(false);
  const [guessList, setGuessList] = useState(false);
  const { unConfirmedGuess, setAction, setData, switched, setSwitched } = useStateContext();

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const checkedGuessCode = unConfirmedGuess
      .reduce((acc, value) => [...acc, value.maKhach], [])
      .toString();
    const group = {
      groupName: e.target.groupName.value,
      groupDesCription: e.target.groupDescription.value,
      method: 0,
      maKhach: checkedGuessCode,
    };
    createGroup(group)
      .then((res) => {
        setData((pre) => [...pre, res.data.newGroup]);
        alert(`Thêm nhóm thành công: ${res.data.newGroup.groupName}`);
      })
      .catch(() => alert('Error In Create Action'));
  };

  const handleClickOpen = () => {
    setOpenCreate(true);
    setAction('Create');
  };

  const handleClose = () => {
    setOpenCreate(false);
    setAction('');
  };

  const handleGuessList = () => setGuessList(true);
  const handleCloseGuess = () => setGuessList(false);
  const onHandleSwitch = (e) => setSwitched(e.target.checked)

  return (
    <Toolbar>
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Danh sách nhóm
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm
      </Button>
      <Dialog
        open={openCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <DialogTitle>{'Tạo nhóm mới'}</DialogTitle>
        <form onSubmit={handleCreateSubmit}>
          <DialogContent>
            <TextField name="groupName" fullWidth label="Tên Nhóm" />
            <TextField name="groupDescription" fullWidth label="Mô Tả" className="w-full my-3" />
            {/* <TextField name="maKhach" fullWidth label="GuessID" /> */}
            <div>
              <Switch
                checked={switched}
                onChange={onHandleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <Button variant="outlined" onClick={handleGuessList} className="w-full my-2">
              Thêm Khách Hàng
            </Button>
            <Dialog
              open={guessList}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseGuess}
              aria-describedby="alert-dialog-slide-description"
              fullScreen
            >
              <DialogTitle>{'Thêm khách hàng vào nhóm'}</DialogTitle>
              <DialogContent>
                <SearchField />
              </DialogContent>
              <DialogActions>
                <Button>Huỷ</Button>
                <Button onClick={handleCloseGuess}>Xác nhận</Button>
              </DialogActions>
            </Dialog>
            <Box sx={{ height: 400, width: '100%' }} className="w-full my-5">
              <DataGrid
                rows={unConfirmedGuess}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
              // experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button type="submit" onClick={handleClose}>
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const {
    data,
    setData,
    setMaKhach,
    guessInGroup,
    setAction,
    codes,
    idDetail,
    switched,
    setSwitched,
  } = useStateContext();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [method, setMethod] = useState(0);
  const [guessList, setGuessList] = useState(false);

  useEffect(() => {
    if (idDetail.current) {
      getGroupDetail(idDetail.current)
        .then((res) => {
          setGroupName(res.data[0].groupName);
          setGroupDescription(res.data[0].groupDesCription);
          setMethod(res.data[0].method);
          const test = res.data.reduce((acc, val) => [...acc, val.customerId], []);
          setMaKhach(test);
        })
        .catch((error) => console.log(error));
    }
  }, [idDetail.current]);

  const handleDelete = (id) => {
    deleteGroup(id).then(() => getListGroups().then((res) => setData(res.data)));
  };

  const handleOpenDetail = (id) => {
    setOpenDetail(true);
    idDetail.current = id;
    setAction('');
  };

  const handleOpenEdit = (id) => {
    setOpenEdit(true);
    idDetail.current = id;
    setAction('Edit');
  };

  const handleClose = () => {
    setOpenEdit(false);
    setAction('');
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateGroup({
      id: idDetail.current,
      groupName: e.target.groupNameUpdate.value,
      groupDesCription: e.target.groupDescriptionUpdate.value,
      method: 0,
    })
      .then((res) => {
        const index = data.findIndex((item) => item.id === res.data.updatedGroup.id);

        const updatedGroup = data.map((val, i) => {
          if (i === index) return res.data.updatedGroup;
          return val;
        });

        setData(updatedGroup);
        alert('Cập nhật thông tin nhóm thành công');
      })
      .catch(() => alert('Lỗi cập nhật nhóm'));
    if (codes.current)
      addCustomerIntoGroup({
        customerId: codes.current,
        groupId: idDetail.current,
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    // console.log(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const onHandleSwitch = (e) => setSwitched(e.target.checked)

  return (
    <>
      <Dialog
        open={openDetail}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDetail(false)}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <DialogTitle>{'Thông tin nhóm'}</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            id="outlined-disabled"
            label="Tên Nhóm"
            value={groupName}
            fullWidth
            className='my-2'
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Mô tả nhóm"
            value={groupDescription}
            fullWidth
            className='my-2'
          />
          <Box sx={{ height: 400, width: '100%' }} className="my-5">
            <DataGrid
              rows={guessInGroup}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
            // experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetail(false)}>Huỷ</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenEdit(false)}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <DialogTitle>{'Cập nhật thông tin nhóm'}</DialogTitle>
        <form onSubmit={handleUpdateSubmit}>
          <DialogContent>
            <div className="w-full my-2">
              <TextField
                id="outlined-disabled"
                label="Tên Nhóm"
                name="groupNameUpdate"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full my-4">
              <TextField
                id="outlined-disabled"
                label="Mô tả của nhóm"
                name="groupDescriptionUpdate"
                value={groupDescription}
                onChange={(event) => setGroupDescription(event.target.value)}
                fullWidth
              />
            </div>
            <div className="w-full my-2">
              <Switch
                checked={switched}
                onChange={onHandleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <Button variant="outlined" onClick={() => setGuessList(true)} className="w-full my-2">
              Thêm khách hàng mới
            </Button>
            <Dialog
              open={guessList}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setGuessList(false)}
              aria-describedby="alert-dialog-slide-description"
              fullScreen
            >
              <DialogTitle>{'Thêm khách hàng vào nhóm'}</DialogTitle>
              <DialogContent>
                <SearchField />
              </DialogContent>
              <DialogActions>
                <Button>Huỷ</Button>
                <Button onClick={() => setGuessList(false)}>Xác nhận</Button>
              </DialogActions>
            </Dialog>
            <Box sx={{ height: 400, width: '100%' }} className="w-full my-5">
              <DataGrid
                rows={guessInGroup}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
              // experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button type="submit" onClick={handleClose}>
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">{row.id}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.groupName}
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          <AiOutlineEye onClick={() => handleOpenDetail(row.id)} />
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          <AiOutlineEdit onClick={() => handleOpenEdit(row.id)} />
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          <AiOutlineDelete
                            onClick={() => {
                              if (window.confirm('Bạn đã chắc chắn xoá nhóm này ?')) {
                                handleDelete(row.id);
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
