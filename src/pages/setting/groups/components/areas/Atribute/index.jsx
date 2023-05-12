import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { findCustomerInGroupByProp, getProperities, insertProperities, deleteProperities } from '@/untils/request';
import { ToastContainer, toast } from 'react-toastify';

function Atribute() {
  const [atribute, setAtribute] = useState('');
  const [expression, setExpression] = useState('');
  const [inputData, setInputData] = useState('');

  const [data, setData] = useState([]);

  const [properities, setProperities] = useState([]);

  useEffect(() => {
    getProperities().then((res) => setProperities(res.data));
  }, []);

  const handleChange = (event) => {
    setAtribute(event.target.value);
  };
  const handleChangeExpression = (event) => {
    setExpression(event.target.value);
  };
  const handleChangeNationality = (e) => {
    setExpressionNationality(e.target.value);
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
        if(response.status == 200){
          toast.success("Tìm khách hàng thành công");
          setData(response.data);
        }
        
      })
      .catch((error) => toast.error("Tìm thất bại"));
  };

  const onDeleteProperities = (id) => {
    deleteProperities(id).then(res => {if(res.status ==200){toast.success("Xóa thành công")}}).catch((error) => console.error(error));
    setProperities(properities.filter(p => p.id != id)) 
  };

  const onInsertProperities = () => {
    const data = {
      atributeCustomer: atribute,
      expressionCustomer: expression,
      valueCustomer: inputData,
    };
    insertProperities(data).then(res =>{if(res.status == 200){
         getProperities()
     .then((res) => {
      if(res.status == 200){
        toast.success("Thêm điều kiện thành công")
        setProperities(res.data)
      }
     })
     .catch((error) => console.error(error));
    }  }  ) .catch((error) => console.error(error));
    ;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'maKhach', headerName: 'Ma Khach', width: 130 },
    { field: 'maDangKy', headerName: 'maDangKy', width: 130 },
    {
      field: 'ten',
      headerName: 'Ten',
      type: 'number',
      width: 90,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'This column has a value getter and is not sortable.',
    },
    {
      field: 'dienThoai',
      headerName: 'SDT',
      type: 'number',
      width: 90,
    },
    {
      field: 'dien',
      headerName: 'Xoa',
      type: 'number',
      width: 90,
    },
  ];

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center my-3">ĐIỀU KIỆN CỦA THUỘC TÍNH</div>
      <div className="d-flex justify-content-between my-3">
        <div>Thuộc tính</div>
        <div>Toán Tử</div>
        <div>Giá trị</div>
        <div>Xóa</div>
      </div>
      {properities?.map((properity) => (
        <div key={properity.id} className="d-flex justify-content-between my-3">
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

      <div className="d-flex justify-content-between my-3">
        <Button onClick={onInsertProperities}>Thêm điều kiện</Button>
        <Button variant="contained" onClick={onSubmit}>
          Tìm kiếm
        </Button>
      </div>

      {data && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
}

export default Atribute;
