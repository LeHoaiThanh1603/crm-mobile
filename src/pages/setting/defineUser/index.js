import React, { useEffect, useRef, useState } from 'react';
import './defineUser.less';
import 'antd/dist/antd.css';
import searchBt from './asset/searchOpen.svg';
import searchBt2 from './asset/searchClose.svg';
import thungrac from './asset/thungrac.svg';
import addbt from './asset/add.svg';
import closeTab from './asset/close.svg';
import saveButton from './asset/save.svg';
import Button, { buttonList } from '@/components/Button';
import { render } from 'enzyme';
import { CheckBox } from '@mui/icons-material';
import { set } from 'js-cookie';

export default function DefineUser({ state, close }) {
  const focusInput = useRef(null);
  const inputImg = useRef();
  const scrollAuto = useRef();
  const scrollAutoTo = useRef();
  const checkedAll = useRef([]);
  const searchR = useRef();
  const [fileImg, setFile] = useState('');
  const [search, setSearch] = useState('');
  const [checkDel, setF] = useState('');
  const [editt, setEdit] = useState(false);
  const [table, setTable] = useState({
    colum: [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '200px',
        render: () => {},
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
    ],
    data: [
      {
        id: '1',
        name: 'ok',
      },
      {
        id: '2',
        name: 'ok',
      },
      {
        id: '3',
        name: 'ok',
      },
      {
        id: '4',
        name: 'ok',
      },
      {
        id: '5',
        name: 'ok',
      },
      {
        id: '6',
        name: 'ok',
      },
      {
        id: '7',
        name: 'ok',
      },
      {
        id: '8',
        name: 'ok',
      },
    ],
  });
  const [newUser, setNewUser] = useState({
    id: 0,
    name: '',
  });
  const listSelect = [];

  useEffect(() => {}, [listSelect]);

  const [sbt, setSbt] = useState(false);
  useEffect(() => {
    focusInput.current.focus();
  }, [state]);

  const deleImg = () => {
    (inputImg.current.value = ''), setFile('');
  };

  const onSelectAll = () => {
    if (event.target.checked) {
      listSelect.splice(0, listSelect.length);
      table.data.map((i) => {
        listSelect.push(i);
      });
      for (let i = 0; i < checkedAll.current.length; i++) {
        if (checkedAll.current[i]) checkedAll.current[i].checked = true;
      }
    } else {
      for (let i = 0; i < checkedAll.current.length; i++) {
        if (checkedAll.current[i]) checkedAll.current[i].checked = false;
      }
    }
  };

  useEffect(() => {
    if (sbt) {
      searchR.current.focus();
    }
  }, [sbt]);

  useEffect(() => {
    setNewUser({
      id: 0,
      name: '',
    });
  }, [table]);

  const onChecked = (e, i) => {
    if (event.target.checked) {
      listSelect.push(i);
    } else {
      let index = listSelect.findIndex(function (o) {
        return o.id == i.id;
      });
      listSelect.splice(index, 1);
    }
    console.log(listSelect);
  };

  const onDel = () => {
    let arr = table.data;
    for (let i = 0; i < listSelect.length; i++) {
      arr = arr.filter((y) => y.id != listSelect[i].id);
    }
    setTable({ ...table, data: arr });
  };

  const Tablede = () => {
    return (
      <table ref={scrollAutoTo}>
        <thead>
          <tr className="head-tb">
            {editt ? (
              <th style={{ width: '5%' }}>
                {' '}
                <input
                  onChange={onSelectAll}
                  className="custom-control-input"
                  type="checkbox"
                ></input>
              </th>
            ) : (
              ''
            )}
            <th style={{ width: '10%' }}> ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {table.data.map((i, index) => {
            if (i.name.includes(search)) {
              return (
                <tr className="col">
                  {editt ? (
                    <td>
                      <input
                        ref={(rel) => (checkedAll.current[index] = rel)}
                        type="checkbox"
                        onChange={(e) => {
                          onChecked(e, i);
                        }}
                      ></input>
                    </td>
                  ) : (
                    ''
                  )}
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className={'defineUser ' + (state.isVisible ? 'd-flex' : 'd-none')}>
      <div className="defineUser-container">
        <div className="defineU">
          <div className="group-title">
            <div className="title-define">Branch</div>
          </div>
          <div
            onClick={() => {
              setTimeout(() => {
                close();
                setSbt(false);
                setEdit(false);
              }, 500);
            }}
          >
            {' '}
            <buttonList.close />
          </div>
          <buttonList.save />
          <div className="defineUnse-taskbar">
            <div className="note">Enter</div>
            <div className="search">
              <label>Name</label>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newUser.name != '') {
                    setTable({ ...table, data: [...table.data, newUser] });
                    scrollAuto.current.scrollTop = scrollAutoTo.current.scrollHeight;
                  }
                }}
              >
                <input
                  ref={focusInput}
                  value={newUser.name}
                  onChange={(e) => setNewUser({ id: table.data.length + 1, name: e.target.value })}
                ></input>
              </form>
              <img
                onMouseMove={() => {
                  document.querySelector('.note').style.opacity = '1';
                }}
                onMouseLeave={() => (document.querySelector('.note').style.opacity = '0')}
                src={addbt}
              />
            </div>
          </div>
          <div className="table-define">
            <div className="group-button">
              <div onClick={() => setEdit(!editt)}>
                <buttonList.edit />
              </div>
              <div
                onClick={() => {
                  if (newUser.name != '') {
                    setTable({ ...table, data: [...table.data, newUser] });
                    scrollAuto.current.scrollTop = scrollAutoTo.current.scrollHeight;
                  }
                }}
              >
                <buttonList.add />
              </div>
              <buttonList.undo />
              <div onClick={() => setEdit(!editt)}>
                <buttonList.edit />
              </div>
              {editt ? (
                <div onClick={onDel}>
                  <buttonList.delete />{' '}
                </div>
              ) : (
                ''
              )}
              <div className="search2">
                {sbt ? (
                  <>
                    {' '}
                    <img
                      onClick={() => {
                        setSbt(!sbt);
                      }}
                      style={{ padding: '7px' }}
                      src={searchBt}
                    ></img>
                    <div>+</div>
                    <input
                      ref={searchR}
                      onChange={() => setSearch(event.target.value)}
                      value={search}
                    ></input>
                  </>
                ) : (
                  <img onClick={() => setSbt(!sbt)} src={searchBt2}></img>
                )}
              </div>
            </div>
            <div className="tableContainer">
              <div className="table-content" ref={scrollAuto}>
                <Tablede />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
