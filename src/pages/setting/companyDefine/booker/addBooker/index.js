import React, { useRef, useEffect, useState } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import './addBooker.less';
import { input } from '@/components/Input';
import { useIntl, useModel } from 'umi';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import Modal from '@/components/Popup';

function BookerAdd({ delDataEdit, visible, close, dataEdit, updateData }) {
  const intl = useIntl();
  const refEdit = useRef();
  const [data, setData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  });
  const { updateBooker } = useModel('companydata');
  useEffect(() => {
    if (!visible) {
      delDataEdit ? delDataEdit() : '';
      setData({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        note: '',
      });
    }
  }, [visible]);

  useEffect(() => {
    refEdit.current.focus();
    if (dataEdit && dataEdit.id != '' && visible) {
      setData({
        id: dataEdit.id,
        name: dataEdit.name,
        email: dataEdit.email,
        phone: dataEdit.phone,
        address: dataEdit.address,
        note: dataEdit.note,
      });
    }
  }, [dataEdit, visible]);

  const editRoomService = (event) => {
    event.preventDefault();
    useFetch(
      '/api/Company/UpdateBooker',
      'PUT',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({ id: 'pages.setting.hotelService.editService' }),
          );
          close();
          updateBooker();
          updateData();
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const addRoomService = (event) => {
    event.preventDefault();
    useFetch(
      '/api/Company/CreateBooker',
      'POST',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          close();
          updateBooker();
          notification.success(intl.formatMessage({ id: 'pages.setting.hotelService.addService' }));
          updateData();
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  return (
    <form
      onSubmit={dataEdit ? (dataEdit.id == 0 ? addRoomService : editRoomService) : addRoomService}
    >
      <Modal
        width={'auto'}
        height={'auto'}
        title={intl.formatMessage({ id: 'pages.setting.companydefine.company.booker' })}
        onOK={dataEdit ? (dataEdit.id == 0 ? addRoomService : editRoomService) : undefined}
        visible={visible}
        onClose={close}
      >
        <div className=" bookeraddpopup ">
          <div>
            <label.titlexl>
              {intl.formatMessage({ id: 'pages.setting.companydefine.booker.name' })}{' '}
              <input.medium
                value={data.name}
                onChange={(event) => {
                  setData({ ...data, name: event.target.value });
                }}
                ref={refEdit}
              ></input.medium>
            </label.titlexl>
          </div>
          <div>
            {' '}
            <label.titlexl>
              {intl.formatMessage({ id: 'pages.setting.companydefine.booker.email' })}{' '}
              <input.medium
                value={data.email}
                onChange={(event) => {
                  setData({ ...data, email: event.target.value });
                }}
              ></input.medium>
            </label.titlexl>
          </div>
          <div>
            {' '}
            <label.titlexl>
              {intl.formatMessage({ id: 'pages.setting.companydefine.booker.phone' })}{' '}
              <input.medium
                value={data.phone}
                onChange={(event) => {
                  setData({ ...data, phone: event.target.value });
                }}
              ></input.medium>
            </label.titlexl>
          </div>
          <div>
            {' '}
            <label.titlexl>
              {intl.formatMessage({ id: 'pages.setting.companydefine.booker.address' })}{' '}
              <input.medium
                value={data.address}
                onChange={(event) => {
                  setData({ ...data, address: event.target.value });
                }}
              ></input.medium>
            </label.titlexl>
          </div>
          <div>
            <label.titlexl>
              {intl.formatMessage({ id: 'pages.setting.companydefine.booker.note' })}{' '}
              <input.medium
                value={data.note}
                onChange={(event) => {
                  setData({ ...data, note: event.target.value });
                }}
              ></input.medium>
            </label.titlexl>
          </div>{' '}
        </div>
      </Modal>
    </form>
  );
}

export { BookerAdd };
