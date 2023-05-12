import Button from '@mui/material/Button';
import { Input } from 'antd';
import { useState } from 'react';
//===========inputTags==================
import { notification } from '@/components/Notification';
import ListGroups from '../ListGroup';
import './index.css';
//===========/inputTags=================
import { useIntl } from 'umi';

function AddGroupsToDK({ onSelectMethod }) {
  const intl = useIntl();
  const [createAdd, setCreateAdd] = useState(false);
  //===============Điều kiện===================
  const [inputRows, setInputRows] = useState([
    {
      firstCell: 'Gender',
      secondCell: '=',
      thirdCell: 'Male',
    },
  ]);

  const handleAddInputRow = () => {
    if (inputRows.length >= 3) return;
    setInputRows([
      ...inputRows,
      {
        firstCell: 'Gender',
        secondCell: '=',
        thirdCell: 'Male',
      },
    ]);
  };

  const handleDeleteInputRow = (index) => {
    setInputRows(inputRows.filter((_, i) => i !== index));
  };

  const handleFirstCellChange = (index, value) => {
    const newInputRows = [...inputRows];
    newInputRows[index].firstCell = value;
    setInputRows(newInputRows);
  };

  const handleSecondCellChange = (index, value) => {
    const newInputRows = [...inputRows];
    newInputRows[index].secondCell = value;
    setInputRows(newInputRows);
  };

  const handleThirdCellChange = (index, value) => {
    const newInputRows = [...inputRows];
    newInputRows[index].thirdCell = value;
    setInputRows(newInputRows);
  };

  //===============/Điều kiện==================

  //================sự kiện=====================
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const onChangeContentName = (e) => {
    setName(e.target.value);
  };
  const onChangeContentDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async (e) => {
    //================filter=======================
    const numCondition = inputRows.length;
    const conditions = [
      ...inputRows.map((row) => ({
        filterName: row.firstCell,
        filterOps: row.secondCell,
        filterValue: row.thirdCell,
      })),
    ];
    const Filter = conditions
      .map((condition) => JSON.stringify(condition))
      .join(',')
      .replace(/"/g, '\\"')
      .replace(/^{/, '[{')
      .replace(/}$/, '}]');

    //===============/filter========================
    switch (true) {
      case Name.trim().length === 0:
        return notification.warning(intl.formatMessage({ id: 'pages.setting.groups.enterName' }));
      case Description.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.groups.enterDescription' }),
        );
    }
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('Name', Name);
      formData.append('Description', Description);
      formData.append('Type', 1);
      formData.append('Filter', Filter);
      // Send data to API
      const response = await fetch('http://api.cm.onexus.net/api/Group/CreateGroup', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // Handle response data here
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    //Sau khi tạo nhóm thành công, ẩn component AddGroupsToTags và hiển thị component Groups
    setCreateAdd(true);
    return notification.success(
      intl.formatMessage({ id: 'pages.setting.groups.createGroupSuccess' }),
    );
  };

  //================/sự kiện======================
  return (
    <div>
      {createAdd ? (
        <ListGroups />
      ) : (
        <>
          <div style={{marginTop: "170px" }}>
            <h2
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              {intl.formatMessage({ id: 'pages.setting.groups.titleAddGroupToConditional' })}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ height: '550px' }}>
                <div style={{ marginBottom: '40px' }}>
                  {intl.formatMessage({ id: 'pages.setting.groups.Step2AddGroup' })}
                </div>
                <div>
                  <p className="title" style={{ width: '150px', margin: '0' }}>
                    {intl.formatMessage({ id: 'pages.setting.groups.nameGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentName}
                  />
                </div>
                <div>
                  <p className="title" style={{ width: '150px',margin: '0',paddingTop:"15px"}}>
                    {intl.formatMessage({ id: 'pages.setting.groups.descriptionGroup' })}:{' '}
                  </p>
                  <Input
                    onChange={onChangeContentDescription}
                  />
                </div>
                {/* ======================================== */}
                <div>
                  <div className="d-flex justify-content-center my-3">
                    {intl.formatMessage({
                      id: 'pages.setting.groups.titleAddGroupToConditionalTitle',
                    })}
                  </div>
                  <table className="tableWidth">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'center' }}>
                          {intl.formatMessage({ id: 'pages.setting.groups.Criteria' })}
                        </th>
                        <th style={{ textAlign: 'center' }}>
                          {intl.formatMessage({ id: 'pages.setting.groups.Operator' })}
                        </th>
                        <th style={{ textAlign: 'center' }}>
                          {intl.formatMessage({ id: 'pages.setting.groups.Value' })}
                        </th>
                        <th style={{ textAlign: 'center' }}>
                          {intl.formatMessage({ id: 'pages.setting.groups.Delete' })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputRows.map((inputRow, index) => (
                        <tr key={index} style={{ marginTop: '50px', textAlign: 'center' }}>
                          <td style={{ height: '60px !important' }}>
                            <select
                              className="input1"
                              value={inputRow.firstCell}
                              onChange={(e) => handleFirstCellChange(index, e.target.value)}
                            >
                              <option value="Gender">Giới tính</option>
                              <option value="Nationality">Quốc tịch</option>
                              <option value="Age">Tuổi</option>
                            </select>
                          </td>
                          <td
                            style={{
                              paddingLeft: '10px',
                              height: '60px',
                              textAlign: 'center',
                            }}
                          >
                            {inputRow.firstCell === 'Gender' ? (
                              <select
                                className="input2"
                                value={inputRow.secondCell}
                                onChange={(e) => handleSecondCellChange(index, e.target.value)}
                              >
                                <option value="=">=</option>
                              </select>
                            ) : inputRow.firstCell === 'Nationality' ? (
                              <select
                                className="input2"
                                value={inputRow.secondCell}
                                onChange={(e) => handleSecondCellChange(index, e.target.value)}
                              >
                                <option value="=">=</option>
                              </select>
                            ) : (
                              <select
                                className="input2"
                                value={inputRow.secondCell}
                                onChange={(e) => handleSecondCellChange(index, e.target.value)}
                              >
                                <option value="=">=</option>
                                <option value="<">&lt;</option>
                                <option value=">">&gt;</option>
                                <option value="<=">&lt;=</option>
                                <option value=">=">&gt;=</option>
                              </select>
                            )}
                          </td>
                          <td
                            style={{
                              height: '60px',
                              paddingLeft: '10px',
                              textAlign: 'center',
                            }}
                          >
                            {inputRow.firstCell === 'Gender' ? (
                              <select
                                className="input3"
                                value={inputRow.thirdCell}
                                onChange={(e) => handleThirdCellChange(index, e.target.value)}
                              >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                              </select>
                            ) : inputRow.firstCell === 'Nationality' ? (
                              <select
                                className="input3"
                                value={inputRow.thirdCell}
                                onChange={(e) => handleThirdCellChange(index, e.target.value)}
                              >
                                <option value="Vietnam">Vietnam</option>
                                <option value="English">English</option>
                              </select>
                            ) : (
                              <input
                                className="input3"
                                type="number"
                                value={inputRow.thirdCell}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value); // chuyển giá trị nhập vào sang kiểu số nguyên
                                  if (Number.isInteger(value) && value > 0) {
                                    // kiểm tra giá trị nhập vào có phải số nguyên dương không
                                    handleThirdCellChange(index, value);
                                  }
                                }}
                              />
                            )}
                          </td>
                          {/* <td style={{ width: '50px', paddingLeft: '10px' }}>
                            <button
                              onClick={() => handleDeleteInputRow(index)}
                              style={{ border: 'none', backgroundColor: '#fff' }}
                            >
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                data-inspector-line="429"
                                data-inspector-column="26"
                                data-inspector-relative-path="src\layouts\groups\tabs\Group.js"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                              </svg>
                            </button>
                          </td> */}
                          <td style={{ width: '50px', paddingLeft: '10px' }}>
                          {index === inputRows.length - 1 && inputRows.length > 1  ? (
                              <button
                                onClick={() => handleDeleteInputRow(index)}
                                style={{ border: 'none', backgroundColor: '#fff' }}
                              >
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  stroke-width="0"
                                  viewBox="0 0 1024 1024"
                                  data-inspector-line="429"
                                  data-inspector-column="26"
                                  data-inspector-relative-path="src\layouts\groups\tabs\Group.js"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                                </svg>
                              </button>
                            ):(<td style={{ width: '50px' }}></td>)}

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* =======================DK====================== */}

                  <div className="d-flex justify-content-between my-3">
                    <Button onClick={handleAddInputRow}>
                      {intl.formatMessage({ id: 'pages.setting.groups.addConditiona' })}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            {/* ======================================== */}
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" onClick={onSelectMethod}>
                {intl.formatMessage({ id: 'pages.setting.groups.btnBack' })}
              </Button>
              <Button style={{ marginLeft: '10px' }} variant="contained" onClick={handleSubmit}>
                {intl.formatMessage({ id: 'pages.setting.groups.btnCreateGroup' })}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddGroupsToDK;
