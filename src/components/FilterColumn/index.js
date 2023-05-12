import React, { useState, useEffect, useRef } from 'react';
import Setting from './asset/setting.svg';
import './FilterColumn.less';
import { input } from '@/components/Input';
import arrayMove from 'array-move';
import SortableList, { SortableItem } from 'react-easy-sort';
import { FormattedMessage, setLocale, history, useIntl, useModel } from 'umi';
function FilterColumn({ column, onFilter, colunmfilter, id, value, className }) {
  const [filtercolumn, setFiltercolumn] = useState([]);
  const [data, setData] = useState(column);
  const [open, setOpen] = useState(false);
  const [positionY, setPositionY] = useState();
  const popup = useRef();
  const doneRef = useRef(false);
  const { updateSettingUser, settingUser } = useModel('systemuser');
  const onCLick = (e) => {
    if (popup.current) {
      if (!popup.current.contains(e.target)) {
        setOpen(false);
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (settingUser && doneRef.current == false) {
      if (
        settingUser.find((x) => x.id === id) &&
        settingUser.find((x) => x.id === id).value.split('/')
      ) {
        let userValue = settingUser.find((x) => x.id === id);
        let columns = [];
        if (userValue.value.split('/') && userValue.value.split('/')[0] != '') {
          let arr = [];
          userValue.value
            .split('/')[0]
            .split(',')
            .map((i) => {
              arr.push(column.find((j) => j.key == i));
            });
          let arr2 = [];
          arr.map((i, index) => {
            i ? (i.key != arr[index - 1] ? arr2.push(i) : undefined) : undefined;
          });
          setData(arr2);
        }
        column.map((i) => {
          if (userValue.value.split('/') && userValue.value.split('/')[1]) {
            userValue.value
              .split('/')[1]
              .split(',')
              .map((j) => {
                j == i.key && j != '' ? columns.push(i) : undefined;
              });
          } else {
            userValue.value.split(',').map((j) => {
              j == i.key && j != '' ? columns.push(i) : undefined;
            });
          }
          setFiltercolumn(columns);
        });
      } else {
        let columns = [];
        column.map((i) => {
          columns.push(i);
        });
        setFiltercolumn(columns);
      }
      doneRef.current = true;
    }
  }, [settingUser]);
  //////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let columns = [];
    let arr = '';
    if (settingUser) {
      filtercolumn
        ? filtercolumn.map((y) => {
            arr = `${arr},${y.key}`;
          })
        : undefined;
      if (settingUser.find((x) => x.id === id)) {
        let userValue = settingUser.find((x) => x.id === id).value;
        let arr1 = userValue.split('/')[0];
        if (userValue.split('/')) {
          arr != '' ? updateSettingUser(id, `${arr1}/${arr}`) : '';
        } else {
          arr != '' ? updateSettingUser(id, `/${arr}`) : '';
        }
      } else {
        data
          ? data.map((y) => {
              arr = `${arr},${y.key}`;
            })
          : undefined;

        updateSettingUser(id, `/${arr}`);
      }

      column.map((i) => {
        arr.split(',').map((j) => {
          j == i.key ? columns.push(i) : '';
        });
      });
    }

    onFilter ? onFilter({ id: id, columns: columns }) : '';
  }, [filtercolumn]);
  //////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    document.addEventListener('mousedown', onCLick);
    return () => document.removeEventListener('mousedown', onCLick);
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////
  const onSortEnd = (oldIndex, newIndex) => {
    let arr = [...data];
    let a1 = arr[oldIndex];
    let a2 = arr[newIndex];
    arr[oldIndex] = a2;
    arr[newIndex] = a1;
    setData(arr);
    let arr2 = '';
    arr.map((i) => (i ? (arr2 == '' ? (arr2 = i.key) : (arr2 = arr2 + ',' + i.key)) : undefined));
    if (settingUser.find((x) => x.id === id)) {
      let userValue = settingUser.find((x) => x.id === id).value;
      let arr1 = userValue.split('/')[1];

      if (userValue.split('/')) {
        updateSettingUser(id, `${arr2}/${arr1}`);
      } else {
        updateSettingUser(id, `${arr2}/`);
      }
    } else {
      updateSettingUser(id, `${arr2}/`);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div
      ref={popup}
      className={`${className} FilterColumn-component d-flex align-items-center`}
      style={{ cursor: 'pointer' }}
    >
      <div
        onClick={(event) => {
          setOpen(!open);
          {
            localStorage.setItem('idUser', id);
            setPositionY(event.clientY);
          }
        }}
      >
        <img
          className={open ? 'animation' : undefined}
          src={Setting}
          onClick={() => {
            setOpen(!open);
          }}
        ></img>
      </div>
      {open ? (
        <div className={`${positionY < 550 ? 'position' : 'position2'} dropdow-column`}>
          <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragg">
            {column
              ? data.map((i, index) =>
                  i ? (
                    <SortableItem key={index}>
                      <div className={` filter-column-i`}>
                        <input.checkbox
                          checked={filtercolumn.filter((a) => a.key == i.key) != 0 ? true : false}
                          onChange={(event) => {
                            event.target.checked == true
                              ? setFiltercolumn([...filtercolumn, i])
                              : setFiltercolumn(filtercolumn.filter((a) => a.key != i.key));
                          }}
                          id={i.key}
                        ></input.checkbox>
                        <label htmlFor={i.key}>{i.title}</label>
                      </div>
                    </SortableItem>
                  ) : undefined,
                )
              : ''}
          </SortableList>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

const Filter = (column, filtercolumn, render) => {
  if (filtercolumn.columns) {
    const { settingUser } = useModel('systemuser');
    let id = filtercolumn.id;

    if (settingUser && settingUser.find((x) => x.id === id)) {
      if (settingUser.find((x) => x.id === id).value.split('/')[0] != '') {
        let index = [];
        settingUser
          .find((x) => x.id === id)
          .value.split('/')[0]
          .split(',')
          .map((i) =>
            i
              ? index.push(filtercolumn.columns.find((j) => (j ? j.key == i : undefined)))
              : undefined,
          );
        if (index[0]) {
          filtercolumn.columns = index;
        }
      }
    }

    let abc = filtercolumn.columns.filter((x) =>
      column.some((s) => (s && x ? s.key == x.key : undefined)),
    );
    let abc2 = [];
    abc.map((i, index) =>
      index != 0 ? (i.key != abc[index - 1].key ? abc2.push(i) : undefined) : abc2.push(i),
    );
    return abc2.filter((x) => column.some((s) => (s && x ? s.key == x.key : undefined)));
  } else {
    const { settingUser } = useModel('systemuser');
    let id = localStorage.getItem('idUser');

    if (settingUser && settingUser.find((x) => x.id === id)) {
      if (settingUser.find((x) => x.id === id).value.split('/')[0] != '') {
        let index = [];
        settingUser
          .find((x) => x.id === id)
          .value.split('/')[0]
          .split(',')
          .map((i) =>
            i ? index.push(filtercolumn.find((j) => (j ? j.key == i : undefined))) : undefined,
          );
        if (index[0]) {
          filtercolumn = index;
        }
      }
    }

    let abc = filtercolumn.filter((x) =>
      column.some
        ? column.some((s) => (s && x ? s.key == x.key : undefined))
        : column.columns.some((s) => (s && x ? s.key == x.key : undefined)),
    );
    let abc2 = [];
    abc.map((i, index) =>
      index != 0 ? (i.key != abc[index - 1].key ? abc2.push(i) : undefined) : abc2.push(i),
    );
    if (id)
      return abc2.filter((x) =>
        column.some
          ? column.some((s) => (s && x ? s.key == x.key : undefined))
          : column.columns.some((s) => (s && x ? s.key == x.key : undefined)),
      );
  }
};

export { Filter, FilterColumn };
