import React, { useState, useRef, useEffect } from 'react';
import './input.less';
import { styles } from './../CropImage/styles';
import eye from './asset/openEyes.svg';
import { CaretLeftOutlined } from '@ant-design/icons';
import eye2 from './asset/closeEyes.svg';
import up from './asset/upIcon.svg';
import down from './asset/down.svg';
import clearIcon from './asset/clear.svg';
import { InputNumber, Checkbox, Space, Row, Col } from 'antd';
const input = {
  large: React.forwardRef(
    (
      {
        value,
        placeholder,
        type,
        required = false,
        onChange,
        blur,
        onFocus,
        status,
        prefix,
        suffix,
      },
      ref,
    ) => {
      return (
        <div className={`input-component ${status ? status : 'normal'} `}>
          <Row className="h-100 d-flex align-items-center">
            <Col flex={prefix ? '15px' : '0px'}>
              <span>{prefix}</span>
            </Col>
            <Col flex="auto">
              <input
                onFocus={onFocus}
                onBlur={blur}
                value={value}
                onChange={onChange}
                ref={ref}
                type={type}
                style={{ height: '100%', width: '100%', border: 'none' }}
                // className={`input-component ${status ? status : 'normal'} `}
                placeholder={placeholder}
                required={required}
              ></input>
            </Col>
            <Col flex={suffix ? '15px' : '0px'}>
              <span>{suffix}</span>
            </Col>
          </Row>
        </div>
      );
    },
  ),
  checkbox: React.forwardRef(
    (
      {
        value,
        onClick,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        style,
        status,
        prefix,
        suffix,
        checked,
        id,
      },
      ref,
    ) => {
      return (
        <input
          style={style}
          id={id}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={blur}
          checked={checked}
          value={value}
          onChange={onChange}
          ref={ref}
          type="checkbox"
          required={required}
        ></input>
      );
    },
  ),
  medium: React.forwardRef(
    (
      {
        onPressEnter,
        value,
        readOnly = false,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        status,
        className,
        style,
        prefix,
        suffix,
      },
      ref,
    ) => {
      const [isClear, setIsClear] = useState(false);
      const inputRef = useRef();
      return (
        <div
          style={{ ...style, height: '30px' }}
          className={` ${readOnly ? 'input-disalbed' : ''} input-component normal ${className} ${status ? status : 'normal'
            } `}
          onMouseEnter={() => {
            setIsClear(true);
          }}
          onMouseLeave={() => {
            setIsClear(false);
          }}
        >
          <Row className="d-flex align-items-center" style={{ height: '100%' }} wrap={false}>
            <Col flex={prefix ? '22px' : 'none'}>{prefix}</Col>
            <Col
              flex="auto"
              className={`
               d-flex align-items-center justify-content-between`}
            >
              <input
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && onPressEnter) {
                    onPressEnter();
                  }
                }}
                disabled={readOnly}
                className="medium"
                onFocus={onFocus}
                onBlur={blur}
                value={value}
                onChange={!readOnly ? onChange : undefined}
                style={{
                  height: '100%',
                  width: '100%',
                  border: 'none',
                  cursor: `${readOnly ? 'not-allowed' : ''}`,
                }}
                ref={ref ? ref : inputRef}
                type={type}
                placeholder={placeholder}
                required={required}
              ></input>
              {isClear && value && !readOnly && (
                <img
                  className="cursor-pointer"
                  onClick={() => {
                    const e = { target: { value: '' } };
                    onChange(e);
                    if (ref) {
                      ref.current.focus();
                    } else {
                      inputRef.current.focus();
                    }
                  }}
                  src={clearIcon}
                ></img>
              )}
            </Col>
            <Col className="h-100" flex={suffix ? '22px' : 'none'}>
              {suffix}
            </Col>
          </Row>
        </div>
      );
    },
  ),
  number: React.forwardRef(
    ({ value, onChange, blur, className, style, addonAfter, max, min, formatter, step }, ref) => {
      return (
        <InputNumber
          min={min}
          max={max}
          formatter={formatter}
          step={step}
          addonAfter={addonAfter}
          onBlur={blur}
          value={value}
          onChange={onChange}
          ref={ref}
          style={{ ...style, height: '30px' }}
          className={` ${className} `}
          interface={{
            color: 'red',
          }}
          controls={{ upIcon: <img src={up}></img>, downIcon: <img src={down}></img> }}
        ></InputNumber>
      );
    },
  ),


  comment: ({
    style,
    className,
    value,
    placeholder,
    blur,
    required = false,
    onChange,
    rows = 2,
  }) => {
    return (
      <textarea
        style={style}
        rows={rows}
        className={`text-component ${className}`}
        onBlur={blur}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      ></textarea>
    );
  },

  pass: ({ value, placeholder, blur, required = false, onChange, status }) => {
    const [hiden, setHiden] = useState(true);
    return (
      <div className="pass-input">
        <input
          onBlur={blur}
          value={value}
          onChange={onChange}
          type={hiden ? 'password' : 'text'}
          className={`input-component ${status ? status : 'normal'} `}
          placeholder={placeholder}
          required={required}
        ></input>
        <img
          onClick={() => {
            setHiden(!hiden);
          }}
          src={hiden ? eye2 : eye}
        ></img>
      </div>
    );
  },
};

export { input };
