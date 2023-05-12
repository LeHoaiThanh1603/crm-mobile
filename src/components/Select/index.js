import React, { useState, useEffect, useRef } from 'react';
import { Empty } from 'antd';
import './select.less';
import ChangePass from './../../pages/login/changePass';
import dropsvg from './asset/dropdow.svg';
import upsvg from './asset/up.svg';
import closeIcon from './asset/close.svg';
import addIcon from './asset/add.svg';
import { propsToClassKey } from '@mui/styles';
import zIndex from '@mui/material/styles/zIndex';
import { borderRadius } from '@mui/system';

const SelectComponent = ({ listSL, className }) => {
  const [open, setOpen] = useState(false);
  const [sl, setSl] = useState('Select');
  const selectRef = useRef();
  const onCLick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onCLick);
    return () => document.removeEventListener('mousedown', onCLick);
  }, []);

  return (
    <div
      className={`component-select ${className}`}
      ref={selectRef}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{
          border: '1px solid #3E5C76',
          height: '50px',
          borderRadius: `${open ? '10px 10px 0px 0px' : '10px'}`,

          paddingLeft: '5px',
        }}
      >
        {sl}
      </div>
      <div className={`dropDown-component ${open ? 'd-block' : 'd-none'}`}>
        {listSL &&
          listSL.map((i, index) => (
            <div
              onClick={() => {
                setSl(i);
              }}
              key={index}
            >
              {i}
            </div>
          ))}
      </div>
    </div>
  );
};

const select = {
  color: ({ onChange, className }) => {
    const [color, setColor] = useState(0);
    const [open, setOpen] = useState(false);
    const selectRef = useRef();
    const value = [
      'none',
      'red',
      'green',
      'blue',
      'yellow',
      'purple',
      'pink',
      'orange',
      'black',
      'orther',
    ];

    const onCLick = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      return () => document.removeEventListener('mousedown', onCLick);
    }, []);

    return (
      <div
        ref={selectRef}
        className={`${className} sl-color d-flex `}
        style={{
          gap: '5%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {' '}
        <div
          onChange={onchange ? onChange(value[color]) : ''}
          onClick={() => {
            setOpen(!open);
          }}
          style={{
            borderRadius: '5px',
            cursor: 'pointer',
            background: `${value[color]}`,
            height: '80%',
            width: '60%',
          }}
        >
          {color != '' ? '' : 'color'}
        </div>
        <div
          style={{
            display: `flex`,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#4086F7',
            borderRadius: '3px',
            height: '70%',
            width: '20%',
            gap: '25%',
          }}
        >
          <img
            onClick={() => {
              if (color < value.length) {
                setColor(color + 1);
              }
            }}
            style={{ cursor: 'pointer', width: '60%' }}
            src={upsvg}
          ></img>
          <img
            onClick={() => {
              if (color > 0) {
                setColor(color - 1);
              }
            }}
            style={{ cursor: 'pointer', width: '60%', transform: 'rotate(180deg)' }}
            src={upsvg}
          ></img>
        </div>
        <div
          style={{
            top: '120%',
            display: `${open ? 'block' : 'none'}`,
            position: 'absolute',
            width: '200%',
            zIndex: '22',
            background: 'white',

            padding: '10px',
            boxShadow: '0px 0px 5px black',
          }}
        >
          {value.map((i, index) => (
            <div
              onClick={() => {
                setColor(index);
                setOpen(!open);
              }}
              className="d-flex justify-content-center align-items-center color-hover"
              style={{ cursor: 'pointer', gap: '10px' }}
            >
              <div
                key={index}
                style={{
                  background: `${i}`,
                  height: '20px',
                  width: '30%',
                }}
              ></div>
              <div
                style={{
                  width: '50%',
                }}
              >
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },

  option: ({ value, children, onClick, size, onOptionClick, className }) => {
    return (
      <div
        className={`${className}`}
        style={{ fontSize: size === 'large' ? '16px' : '14px' }}
        onClick={() => {
          onClick(value, children);
          if (onOptionClick) {
            onOptionClick();
          }
        }}
      >
        {children}
      </div>
    );
  },

  group: ({
    className,
    children,
    onChange,
    value,
    placeholder,
    size,
    allowClear = true,
    showSearch = true,
    defaultValue = null,
    allowAdd,
    onAdd,
  }) => {
    const defaultPlaceholder = 'Select Value';
    const [isClose, setIsClose] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [open, setOpen] = useState(false);
    const [sl, setSl] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const selectRef = useRef();
    const inputRef = useRef();
    const onCLick = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onOptionClick = (value, children) => {
      setSl(children);
      if (isSearch) {
        setIsSearch(false);
        setSearchValue('');
      }
      if (onChange) {
        onChange(value);
      }
    };

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { onClick: onOptionClick, size: size ? size : null });
      }
      return child;
    });

    const resetData = () => {
      setSl(defaultPlaceholder);
      if (placeholder) {
        setSl(placeholder);
      }

      if (showSearch && value === null) {
        setIsSearch(true);
      }
    };

    useEffect(() => {
      setOpen(false);
    }, []);

    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      resetData();
      // setSl(defaultPlaceholder);
      if (value !== null) {
        React.Children.forEach(children, (child) => {
          if (child.props.value == value) {
            setSl(child.props.children);
            setIsSearch(false);
            // if (onChange) {
            //   onChange(child.props.value);
            // }
          }
        });
      } else {
        resetData();
      }
      return () => document.removeEventListener('mousedown', onCLick);
    }, [value]);

    useEffect(() => {
      inputRef.current?.focus();
    }, [isSearch]);

    useEffect(() => {
      if (showSearch && searchValue !== '') {
        setOpen(true);
      }
    }, [searchValue]);

    return (
      <div className={`component-select ${className}`} ref={selectRef}>
        <div
          onMouseEnter={() => {
            if (sl != placeholder && sl != defaultPlaceholder) {
              setIsClose(true);
            }
          }}
          onMouseLeave={() => setIsClose(false)}
          className={`d-flex align-items-center select-content`}
          style={{
            border: `1px solid ${open ? '#55AEC6' : '#3E5C76'} `,
            height: `${size === 'large' ? '48px' : '30px'}`,
            borderRadius: `10px`,
            width: '100%',
            paddingLeft: '8px',
            fontSize: `${size === 'large' ? '16px' : '14px'}`,
            position: 'relative',
            paddingRight: '8px',
            backgroundColor: 'white',
          }}
        >
          <div
            className={`${
              sl == placeholder || sl == defaultPlaceholder ? 'select-placeholder' : ''
            }`}
            style={{
              textOverflow: 'ellipsis',
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {isSearch ? (
              <input
                value={searchValue}
                className={`select-input-search ${size === 'large' ? 'large-placeholer' : ''}`}
                placeholder="Input to search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                ref={inputRef}
              />
            ) : (
              sl
            )}
          </div>
          {allowClear && isClose ? (
            <img
              style={{
                position: 'absolute',
                right: allowAdd ? '35px' : '15px',
                width: '10px',
              }}
              src={closeIcon}
              onClick={() => {
                resetData();
                setOpen(true);
                setSearchValue('');
                if (onChange) {
                  onChange(defaultValue);
                }
                setIsClose(false);
              }}
            ></img>
          ) : (
            <img
              style={{
                position: 'absolute',
                right: allowAdd ? '30px' : '10px',
              }}
              src={dropsvg}
              onClick={() => {
                setOpen(!open);
              }}
            ></img>
          )}
          {allowAdd && <img src={addIcon} onClick={onAdd} />}
        </div>
        <div
          className={`dropDown-component-group ${open ? 'd-block' : 'd-none'}`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {childrenWithProps?.filter((item) =>
            item.props.children.toLowerCase().includes(searchValue.toLowerCase()),
          ).length !== 0 ? (
            <div className="dropdown-group-inner">
              {childrenWithProps?.filter((item) =>
                item.props.children.toLowerCase().includes(searchValue.toLowerCase()),
              )}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    );
  },
};

const dropdown = {
  normal: ({ className, content, contentDrop }) => {
    const [open, setOpen] = useState(false);
    const selectRef = useRef();
    const onCLick = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      return () => document.removeEventListener('mousedown', onCLick);
    }, []);

    return (
      <div
        className={`component-select ${className}`}
        ref={selectRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            // height: '50px',
            // borderRadius: '10px',
            // paddingLeft: '5px',
          }}
        >
          {content}
        </div>
        <div style={{zIndex: "9999",marginLeft: "20px",textAlign: "center"}} className={`dropDown-component-n ${open ? 'd-block' : 'd-none'}`}>{contentDrop}</div>
      </div>
    );
  },
};

export { dropdown, SelectComponent, select };
