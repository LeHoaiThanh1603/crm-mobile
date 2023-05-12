import React, { useState } from 'react';
import '@/components/Button/button.less';
import addbt from './asset/add.svg';
import undoSvg from './asset/undo.svg';
import editSvg from './asset/edit.svg';
import viewSvg from './asset/view.svg';
import delSvg from './asset/delete.svg';
import saveSvg from './asset/save.svg';
import create from './asset/create.svg';
import closeSvg from './asset/close.svg';
import closeModal from './asset/closeModal.svg';
import tang from './asset/tang.svg';
import giam from './asset/giam.svg';
import ex from './asset/ex.svg';
import moon from './asset/moon.svg';
import printSvg from './asset/print.svg';
import alertSvg from './asset/alert.svg';
import backSvg from './asset/back.svg';
import { useModel, history, useIntl } from 'umi';
import { select } from '@/components/Select';
import { label } from '../Label';

const ButtonForm = ({ className, onClick, children, img }) => {
  return (
    <button
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={`${className} buttonList d-flex justify-content-center align-items-center`}
      type="button"
    >
      <img style={{ height: '20px', width: '20px' }} src={img}></img> {children}
    </button>
  );
};

export const buttonList = {
  normal: function ({ className, title, onClick }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.normal',
      defaultMessage: 'Save',
    });
    if (!title) title = defaultTitle;

    return (
      <button
        onClick={onClick}
        className={`${className} button-component normal-button-component`}
        type="button"
      >
        <label.titlexl>{title}</label.titlexl>
      </button>
    );
  },
  submit: function ({ className, title, onClick }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.normal',
      defaultMessage: 'Save',
    });
    if (!title) title = defaultTitle;

    return (
      <button
        onClick={onClick}
        className={`${className} button-component normal-button-component`}
        type="submit"
      >
        <label.titlexl>{title}</label.titlexl>
      </button>
    );
  },
  cancel: function ({ className, title, onClick }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.cancel',
      defaultMessage: 'Cancel',
    });

    if (!title) title = defaultTitle;

    return (
      <div
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={
          className +
          ' button-component cancel-button-component d-flex justify-content-center align-items-center'
        }
        type="button"
      >
        <label.titlelg>{title}</label.titlelg>
      </div>
    );
  },
  icon: function ({ className, onClick, title, img }) {
    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList-icon d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={img}></img>
        {title && <label.titlelg>{title}</label.titlelg>}
      </button>
    );
  },
  add: function ({ className, onClick, title }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.add',
      defaultMessage: 'Add',
    });
    if (!title) title = defaultTitle;

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={create}></img> <label.titlelg>{title}</label.titlelg>
      </button>
    );
  },

  edit: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={editSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.edit',
            defaultMessage: 'Edit',
          })}
        </label.titlelg>
      </button>
    );
  },

  view: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={viewSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.View',
            defaultMessage: 'View',
          })}
        </label.titlelg>
      </button>
    );
  },

  undo: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={undoSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.undo',
            defaultMessage: 'Undo',
          })}
        </label.titlelg>
      </button>
    );
  },
  save: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="submit"
      >
        <img src={saveSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.save',
            defaultMessage: 'Save',
          })}
        </label.titlelg>
      </button>
    );
  },
  close: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList-close d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={closeSvg}></img>{' '}
      </button>
    );
  },
  closeModal: function ({ onClick }) {
    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className="buttonList-closeModal d-flex justify-content-center align-items-center"
        type="button"
      >
        <img src={closeModal}></img>{' '}
      </button>
    );
  },
  print: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={printSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.print',
            defaultMessage: 'Print',
          })}
        </label.titlelg>
      </button>
    );
  },
  alert: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={alertSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.alert',
            defaultMessage: 'Alert',
          })}
        </label.titlelg>
      </button>
    );
  },
  importExcel: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ width: 'max-content', cursor: 'pointer' }}
        className={`${className}  buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img style={{ width: '20px' }} src={ex}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.importexcel',
            defaultMessage: 'Import Excel',
          })}
        </label.titlelg>
      </button>
    );
  },
  back: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={backSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.back',
            defaultMessage: 'back',
          })}
        </label.titlelg>
      </button>
    );
  },
  delete: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={delSvg}></img>{' '}
        {title ? (
          title
        ) : (
          <label.titlelg>
            {intl.formatMessage({
              id: 'component.button.delete',
              defaultMessage: 'Delete',
            })}
          </label.titlelg>
        )}
      </button>
    );
  },
  form: {
    add: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={addbt}>
          {children}
        </ButtonForm>
      );
    },
    alert: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={alertSvg}>
          {children}
        </ButtonForm>
      );
    },
    undo: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={undoSvg}>
          {children}
        </ButtonForm>
      );
    },
    delete: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={delSvg}>
          {children}
        </ButtonForm>
      );
    },
    save: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={saveSvg}>
          {children}
        </ButtonForm>
      );
    },
    print: function ({ className, onClick, children }) {
      return (
        <ButtonForm className={className} onClick={onClick} img={printSvg}>
          {children}
        </ButtonForm>
      );
    },
  },
  selectDay: ({ onChange, className, onClick }) => {
    const [value, setValue] = useState(0);

    return (
      <div className={className + ' selectDay-component'}>
        <img
          onClick={() => {
            value != 0 ? setValue(value - 1) : '';
          }}
          style={{ cursor: 'pointer' }}
          src={giam}
        ></img>
        <div
          style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <input onChange={onChange ? onChange(value) : ''} value={value}></input>
          <img src={moon}></img>
        </div>

        <img
          onClick={() => {
            setValue(value + 1);
          }}
          style={{ cursor: 'pointer' }}
          src={tang}
        ></img>
      </div>
    );
  },
};
