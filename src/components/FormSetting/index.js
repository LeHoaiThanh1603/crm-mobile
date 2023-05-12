import React, { useEffect, useRef, useState } from 'react';
import './setting.less';
import 'antd/dist/antd.css';
import searchBt from './asset/searchOpen.svg';
import searchBt2 from './asset/searchClose.svg';
import thungrac from './asset/thungrac.svg';
import addbt from './asset/add.svg';
import closeTab from './asset/close.svg';
import saveButton from './asset/save.svg';
import Button, { buttonList } from '@/components/Button';
import { Checkbox } from 'antd';
import { render } from 'enzyme';
import { CheckBox } from '@mui/icons-material';
import { set } from 'js-cookie';

export default function DefineUser({ data, listData }) {
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
  const [sbt, setSbt] = useState(false);
  const [table, setTable] = useState([]);

  return (
    <div className="table-define">
      <div className="group-button">
        <div onClick={() => setEdit(!editt)}>
          <buttonList.edit />
        </div>
        <div
          onClick={() => {
            setTable({ ...table, data: [...table.data, newRoom] });
            scrollAuto.current.scrollTop = scrollAutoTo.current.scrollHeight;
          }}
        >
          <buttonList.add />
        </div>
        <buttonList.undo />
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
              <div
                onClick={() => {
                  setSbt(!sbt);
                }}
              >
                +
              </div>
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

        {editt ? (
          <div onClick={onDel}>
            <buttonList.delete />{' '}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="tableRoomInput">
        <div className="table-content" ref={scrollAuto}></div>
      </div>
    </div>
  );
}
