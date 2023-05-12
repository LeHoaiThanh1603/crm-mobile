import { set, map } from 'lodash';
import React, { useState } from 'react';
import { input } from '../Input';
import { Switch } from '@/components/Switch';
import { buttonList } from '@/components/Button';
import './table.less';

function Table() {
  const [data, setData] = useState([
    {
      v: 'abc',
      ob: {
        open: false,
        open2: false,
        c: [
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
        ],
        dichvu: [
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
        ],
      },
    },
    {
      v: 'ab2c',
      ob: {
        open: false,
        c: [
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
        ],
        dichvu: [
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
          {
            checked: false,
            a: 'sàas',
            b: 'àasfasf',
          },
        ],
        open2: false,
      },
    },
    {
      v: 'abc3',
      ob: {
        open: false,
        c: [{ checked: false, a: 'sàas', b: 'àasfasf' }],
        dichvu: [
          { checked: false, a: 'sàas', b: 'àasfasf' },
          { checked: false, a: 'sàas', b: 'àasfasf' },
        ],
        open2: false,
      },
    },
  ]);

  return (
    <div className="table-component">
      <buttonList.importExcel></buttonList.importExcel>
      <buttonList.normal></buttonList.normal>
      <Switch
        onClick={(status) => {
          alert(status);
        }}
      ></Switch>
      <table>
        <tr>
          <th
            style={{
              width: '30px',
            }}
          ></th>

          <th>id</th>
          <th>name</th>
        </tr>
        {data.map((i, indexx) => (
          <>
            <tr>
              <td
                onClick={() => {
                  let temp = [...data];
                  let tempp = { ...temp[indexx] };
                  i.open ? '' : (tempp.ob.open2 = false);
                  tempp.ob.open = !tempp.ob.open;
                  temp[indexx] = tempp;
                  setData(temp);
                }}
                style={{ cursor: 'pointer' }}
              >
                +
              </td>
              <td>{indexx}</td>
              <td>{i.v}</td>
            </tr>
            {i.ob.open ? (
              <tr>
                <td colSpan={4}>
                  <table className="table2">
                    {' '}
                    <tr className="childTable">
                      <th></th>
                      <th>
                        <input.checkbox
                          onClick={() => {
                            i.ob.c.map((i, indexxx) => {
                              let item = [...data];
                              item[indexx].ob.c[indexxx].checked = event.target.checked;
                              setData(item);
                            });
                          }}
                        ></input.checkbox>
                      </th>
                      <th>id</th>
                      <th>NAme</th>
                      <th>NAme</th>
                    </tr>
                    {i.ob.c.map((y, index) => (
                      <tr className="childTable2">
                        <td>
                          {' '}
                          {index == i.ob.c.length - 1 ? (
                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                let tem = [...data];
                                let item = { ...tem[indexx] };
                                item.ob.open2 = !item.ob.open2;
                                tem[indexx] = item;

                                setData(tem);
                              }}
                            >
                              +
                            </span>
                          ) : (
                            ''
                          )}{' '}
                        </td>
                        <td>
                          {' '}
                          <input.checkbox
                            checked={y.checked}
                            onClick={() => {
                              let item = [...data];
                              item[indexx].ob.c[index].checked = !item[indexx].ob.c[index].checked;
                              setData(item);
                            }}
                          ></input.checkbox>
                        </td>
                        <td style={{ position: 'relative' }}> {index}</td>
                        <td>
                          {' '}
                          <input.medium
                            value={y.a}
                            onChange={() => {
                              let item = [...data];
                              item[indexx].ob.c[index].a = event.target.value;
                              setData(item);
                            }}
                          />
                        </td>
                        <input.medium
                          value={y.b}
                          onChange={() => {
                            let item = [...data];
                            item[indexx].ob.c[index].b = event.target.value;
                            setData(item);
                          }}
                        ></input.medium>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            ) : (
              ''
            )}
            {i.ob.open2 ? (
              <tr>
                <td colSpan={4}>
                  <table className="table2">
                    {' '}
                    <tr className="childTable">
                      <th></th>
                      <th>
                        <input.checkbox></input.checkbox>
                      </th>
                      <th>id</th>
                      <th>NAme</th>
                      <th>NAme</th>
                    </tr>
                    {i.ob.dichvu.map((y, index) => (
                      <tr className="childTable2">
                        <td></td>
                        <td>
                          <input.checkbox></input.checkbox>
                        </td>
                        <td>{index}</td>
                        <td>
                          <input.medium
                            value={y.a}
                            onChange={() => {
                              let item = [...data];
                              item[indexx].ob.dichvu[index].a = event.target.value;
                              setData(item);
                            }}
                          ></input.medium>
                        </td>
                        <td>
                          <input.medium
                            value={y.b}
                            onChange={() => {
                              let item = [...data];
                              item[indexx].ob.dichvu[index].b = event.target.value;
                              setData(item);
                            }}
                          ></input.medium>
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            ) : (
              ''
            )}
          </>
        ))}
      </table>
    </div>
  );
}

export { Table };
