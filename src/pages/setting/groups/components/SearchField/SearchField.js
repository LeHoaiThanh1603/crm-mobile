import React, { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { getComparator, stableSort } from '../../tabs/Group';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import { useStateContext } from '../../context/ContextProvider';
import {
  getListUsers,
  findCustomerInGroupByProp,
  getProperities,
  insertProperities,
  deleteProperities,
} from '@/untils/request';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Drawer } from '@material-ui/core';
import './SearchField.css';

const headCells = [
  {
    id: 'guessCode',
    numeric: false,
    disablePadding: false,
    label: 'Mã Khách',
  },
  {
    id: 'guessName',
    numeric: true,
    disablePadding: false,
    label: 'Tên Khách',
  },
  {
    id: 'guessTag',
    numeric: true,
    disablePadding: false,
    label: 'Tag',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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

const SearchField = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [atribute, setAtribute] = useState('');
  const [expression, setExpression] = useState('');
  const [inputData, setInputData] = useState('');

  const [properities, setProperities] = useState([]);

  const {
    guess,
    setGuess,
    setUnConfirmedGuess,
    action,
    guessInGroup,
    unConfirmedGuess,
    setGuessInGroup,
    selected,
    setSelected,
  } = useStateContext();
  const [searchType, setsearchType] = useState('name');

  useEffect(() => {
    if (selected.length !== 0) setUnConfirmedGuess(selected);
  }, [selected]);

  useEffect(() => {
    if (action === 'Edit') {
      const newGuessAdded = unConfirmedGuess.concat(guessInGroup);

      const ids = newGuessAdded.map((o) => o.id);
      // const checkDuplicated = newGuessAdded.some((item, idx) => newGuessAdded.indexOf(item) != idx)
      // if (checkDuplicated) {
      //   alert('This user already added in this group !');
      //   return
      // }
      const filtered = newGuessAdded.filter(({ id }, index) => !ids.includes(id, index + 1));
      setGuessInGroup(filtered);
    }
  }, [unConfirmedGuess]);

  const onChangeSearchCustomer = (event) => {
    // event.preventDefault();
    const filtered = guess.filter((item) =>
      // item.maKhach.toLowerCase().includes(event.target.value.toLowerCase()) ||
      // item.ten.toLowerCase().includes(event.target.value.toLowerCase()) ||
      // item.tags?.toLowerCase().includes(event.target.value.toLowerCase()),
      searchType === 'name'
        ? item.ten.toLowerCase().includes(event.target.value.toLowerCase())
        : searchType === 'tag'
        ? item.tags?.toLowerCase().includes(event.target.value.toLowerCase())
        : alert('Lỗi tìm thuộc tính'),
    );
    if (filtered != undefined || filtered != null) setGuess(filtered);
    if (event.target.value == '') getListUsers().then((res) => setGuess(res.data));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = guess.map((n) => n);
      setSelected(newSelected);
      //   console.log(newSelected);
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (obj) => selected.indexOf(obj) !== -1;

  useEffect(() => {
    getProperities().then((res) => setProperities(res.data));
  }, []);

  const handleChange = (event) => {
    setAtribute(event.target.value);
  };
  const handleChangeExpression = (event) => {
    setExpression(event.target.value);
  };

  const handleChangeValue = (e) => {
    setInputData(e.target.value);
  };

  const onSubmit = () => {
    const data = {
      atributeCustomer: atribute,
      expressionCustomer: expression,
      valueCustomer: inputData,
    };
    findCustomerInGroupByProp(data)
      .then((response) => {
        if (response.status == 200) setGuess(response.data);
      })
      .catch((error) => console.log(error));
    setOpenSidebar(false);
  };

  const onDeleteProperities = (id) => {
    deleteProperities(id)
      .catch((error) => console.error(error));
    setProperities(properities.filter((p) => p.id != id));
  };

  const onInsertProperities = () => {
    const data = {
      atributeCustomer: atribute,
      expressionCustomer: expression,
      valueCustomer: inputData,
    };
    insertProperities(data)
      .then((res) => {
        if (res.status == 200) {
          getProperities()
            .then((res) => {
              if (res.status == 200) setProperities(res.data);
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - guess.length) : 0;

  const sideList = () => (
    <div className="w-100 d-flex flex-column">
      <div className="d-flex justify-content-center my-3">ĐIỀU KIỆN CỦA THUỘC TÍNH</div>

      {properities?.map((properity) => (
        <div key={properity.id} className="w-90 d-flex justify-content-around my-3">
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chọn thuộc tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={atribute}
                label="Chọn thuôc tính"
                onChange={handleChange}
              >
                <MenuItem value={'Danh Xung'}>Giới tính</MenuItem>
                <MenuItem value={'Tuổi'}>Tuổi</MenuItem>
                <MenuItem value={'Quốc tịch'}>Quốc tịch</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* <div>Toán Tử</div> */}
          {(() => {
            switch (atribute) {
              case 'Tuổi':
                {
                  return (
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-expression-age">Chọn toán tử</InputLabel>
                        <Select
                          labelId="demo-simple-select-label-expression-age"
                          id="demo-simple-select-expression-age"
                          value={expression}
                          label="Chọn thuôc tính"
                          onChange={handleChangeExpression}
                        >
                          <MenuItem value={'>'}>{'>'}</MenuItem>
                          <MenuItem value={'>='}>{'>='}</MenuItem>
                          <MenuItem value={'<='}>{'<='}</MenuItem>
                          <MenuItem value={'='}>{'='}</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  );
                }
                break;

              default:
                {
                  return (
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label-expression-default">
                          Toán tử
                        </InputLabel>
                        <Select
                          labelId="demo-simple-expression-default"
                          id="demo-simple-select-expression-default"
                          value={expression}
                          label="Chọn toán tử"
                          onChange={handleChangeExpression}
                        >
                          <MenuItem value={'='}>{'='}</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  );
                }
                break;
            }
          })()}
          {/* <div>Giá trị</div> */}
          {(() => {
            switch (atribute) {
              case 'Quốc tịch':
                return (
                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label-expression-nationality">
                        Chọn quốc tịch
                      </InputLabel>
                      <Select
                        labelId="demo-simple-expression-nationality"
                        id="demo-simple-select-expression-nationality"
                        value={inputData}
                        label="Chọn giá trị"
                        onChange={handleChangeValue}
                      >
                        <MenuItem value={'Việt Nam'}>Việt Nam</MenuItem>
                        <MenuItem value={'Khác'}>Khác</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                );
                break;
              case 'Danh Xung':
                {
                  return (
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-expression-sex">
                          Chọn giới tính
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label-expression-sex"
                          id="demo-simple-select-expression-sex"
                          value={inputData}
                          label="Chọn giá trị"
                          onChange={handleChangeValue}
                        >
                          <MenuItem value={'Nam'}>Nam</MenuItem>
                          <MenuItem value={'Nữ'}>Nữ</MenuItem>
                          <MenuItem value={'Khác'}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  );
                }
                break;

              case 'Tuổi':
                {
                  return (
                    <TextField
                      id="outlined-name"
                      label="Nhập tuổi"
                      value={inputData}
                      onChange={handleChangeValue}
                    />
                  );
                }
                break;

              default:
                {
                  return (
                    <TextField
                      id="filled-basic"
                      label="Filled readOnly"
                      variant="filled"
                      value=""
                      disabled
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  );
                }
                break;
            }
          })()}
          <Button onClick={() => onDeleteProperities(properity.id)}>Xóa</Button>
        </div>
      ))}

      <div className="w-75 d-flex justify-content-around my-3">
        <Button onClick={onInsertProperities}>Thêm điều kiện</Button>
        <Button variant="contained" onClick={onSubmit}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          sx={{ display: 'inline' }}
          value={searchType}
          onChange={(e) => setsearchType(e.target.value)}
        >
          <FormControlLabel value="name" control={<Radio />} label="Theo Tên" />
          <FormControlLabel value="tag" control={<Radio />} label="Theo Tag" />
          <FormControlLabel value="attribute" control={<Radio />} label="Theo Thuộc Tính" />
        </RadioGroup>
      </FormControl>
      {searchType !== 'attribute' && (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <TextField
            id="outlined-basic"
            label="Tìm khách hàng"
            variant="outlined"
            fullWidth
            onChange={onChangeSearchCustomer}
          />
        </Box>
      )}
      {searchType === 'attribute' && (
        <div className="d-flex justify-content-end">
          <Button variant="contained" onClick={() => setOpenSidebar((pre) => !pre)}>Điều Kiện</Button>
          <Drawer
            style={{ width: '50%' }}
            open={openSidebar}
            anchor="left"
            onClose={() => setOpenSidebar((pre) => !pre)}
          >
            {sideList()}
          </Drawer>
        </div>
      )}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
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
                rowCount={guess.length}
              />
              <TableBody>
                {stableSort(guess, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.ten}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.maKhach}
                        </TableCell>
                        <TableCell align="right">{row.ten}</TableCell>
                        <TableCell align="right">{row.tags}</TableCell>
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
            count={guess.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default SearchField;
