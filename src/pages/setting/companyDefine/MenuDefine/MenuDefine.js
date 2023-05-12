import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Row, Col, Space, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';

import './MenuDefine.less';
import MenuPopup from './MenuPopup/MenuPopup';
import { LanguageSelect } from '@/components/LanguageSelect';
import ProductDefine from './ProductDefine/ProductDefine';
import { ProductPopup } from './ProductDefine/ProductPopup/ProductPopup';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import { label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { useFetch } from '@/components/Fetch/useFetch';
import MenuSideBar from './menuSideBar/menuSideBar';
import { formatNumber } from '@/e2e/extensionMethod';
import { URL_API } from '../../../../e2e/configSystem';
import { set } from 'lodash';
import { margin } from '@mui/system';
import { getDataDetail } from '@microsoft/signalr/dist/esm/Utils';
import { notification } from '@/components/Notification';
import noImg from './noimage.svg';
export default function MenuDefine() {
  const { category, updateCategory, product, updateProduct } = useModel('productdata');
  const [language, setLanguage] = useState('EN');
  const [edit, setEdit] = useState();
  const [editItem, setEditItem] = useState({
    edit: [],
  });
  const intl = useIntl();
  const [id, setId] = useState(0);
  const urlImage = URL_API + '/assets/images/serviceitem/';
  const [item, setItem] = useState();
  const [columnFilter, setColumnFilter] = useState([]);
  const columnSearch = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters = true }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search here"
          style={{ height: 30, marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 140, height: 30 }}
            onClick={() => confirm()}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters(clearFilters)}
            size="small"
            style={{ width: 100, height: 30 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });
  const { groupService } = useModel('productdata');
  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.menu.image',
      }),
      key: 'image',
      dataIndex: 'image',
      render: (e) => (
        <>
          <img
            src={`${e != '' ? `${URL_API}/assets/images/serviceitem/${e}` : noImg}`}
            style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'contain' }}
          />
        </>
      ),
      width: '5%',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.nameByLang',
      }),
      dataIndex: 'nameByLang',
      key: 'nameByLang',
      ...columnSearch('nameByLang'),
      width: '7%',
      align: 'center',
      render: (e) => (
        <>
          {e.find((i) => i.language == language)
            ? e.find((i) => i.language == language).name
            : 'No Name'}
        </>
      ),
    },

    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.groupService',
      }),
      dataIndex: 'groupService',
      key: 'groupService',
      ...columnSearch('groupService'),
      align: 'center',
      width: '6%',
      render: (i) => (
        <>
          {groupService.find((j) => j.id == i).nameByLang.find((a) => a.language == language)
            ? groupService.find((j) => j.id == i).nameByLang.find((a) => a.language == language)
                .name
            : 'No Name'}
        </>
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.menu.serviceCode',
      }),
      dataIndex: 'serviceCode',
      key: 'serviceCode',
      ...columnSearch('serviceCode'),
      width: '8%',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.menu.price',
      }),
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      width: '4%',
      render: (i) => <span>{formatNumber(i)}</span>,
    },

    {
      title: intl.formatMessage({
        id: 'pages.setting.hotelservice.menu.tableaction',
      }),
      dataIndex: '',
      key: 'action',
      align: 'center',
      width: '5%',
      render: (record) => (
        <div className="d-flex" style={{ justifyContent: 'center' }}>
          <Popconfirm
            placement="leftTop"
            title={intl.formatMessage({ id: 'pages.setting.hotelservice.menu.confirmdelete' })}
            okText={intl.formatMessage({ id: 'pages.setting.hotelservice.menu.yes' })}
            cancelText={intl.formatMessage({ id: 'pages.setting.hotelservice.menu.no' })}
            onConfirm={() => deleteProduct(record.id)}
          >
            <buttonList.form.delete />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
  });
  const [menu, setMenu] = useState([]);

  const [categorySelected, setCategorySelected] = useState('');
  const [oldDataUpdate, setOldDataUpdate] = useState({
    lspMaSo: '',
    lspMaSoCha: null,
    lspTenLoai: '',
    lspMoTa: '',
    lspImage: null,
    lspIsVisible: true,
    lspLetter: '',
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('');
  const [addOrUpdateProduct, setAddOrUpdateProduct] = useState('');
  const [recordUpdateProduct, setRecordUpdateProduct] = useState({});

  const deleteProduct = (id) => {
    const formData = new FormData();
    formData.append('id', id);
    useFetch(
      '/api/Defines/DeleteServiceItem',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          getProduct();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  const getProduct = () => {
    useFetch(
      '/api/Defines/GetServiceItem',
      'GET',
      '',
      null,

      setItem,

      (err) => {
        console.log(err);
      },
    );
  };

  const getMenu = () => {
    useFetch(
      '/api/Defines/GetGroupService',
      'GET',
      '',
      null,

      setMenu,

      (err) => {
        console.log(err);
      },
    );
  };

  const handleShowAddCategory = () => {
    setAddOrUpdate('add');
    setIsShowModal(true);
  };

  const handleUpdateCategory = (item) => {
    setAddOrUpdate('update');
    setIsShowModal(true);
    setEdit(item);
  };
  const onDelete = (idDelete) => {
    const formData = new FormData();
    formData.append('id', idDelete);
    useFetch(
      '/api/Defines/DeleteGroupService',
      'DELETE',
      '',
      formData,
      (res) => {
        if (res.success == 1) {
          getMenu();
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const updateEdit = (data) => {};
  const updateId = (i) => {
    setId(i);
  };
  const handleShowAddProduct = () => {
    setAddOrUpdateProduct('add');
    setIsShowModalProduct(true);
  };

  const handleShowUpdateProduct = (record) => {
    setAddOrUpdateProduct('update');
    setIsShowModalProduct(true);
    editItem.edit = record;
  };

  useEffect(() => {
    getMenu();
    getProduct();
  }, []);

  return (
    <div className="menu-container">
      <div
        style={{
          borderBottom: '1px solid gray',
          paddingBottom: '5px',
          marginBottom: '10px',
        }}
      >
        <LanguageSelect
          onChange={(e) => setLanguage(e)}
          value={language}
          style={{
            width: '290px',
            paddingTop: '10px',
            flexDirection: 'column',
            gap: '5px',
            paddingBottom: '5px',
          }}
        ></LanguageSelect>
      </div>
      <Row gutter={[8, 8]}>
        <MenuPopup
          language={language}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          addOrUpdate={addOrUpdate}
          parent={menu}
          edit={edit}
          updateCategory={getMenu}
          oldDataUpdate={oldDataUpdate}
        />

        <ProductPopup
          language={language}
          id={id}
          isShowModalProduct={isShowModalProduct}
          setIsShowModalProduct={setIsShowModalProduct}
          updateCategory={getProduct}
          edit={editItem.edit}
          addOrUpdateProduct={addOrUpdateProduct}
          recordUpdateProduct={recordUpdateProduct}
        />
        <Col xs={10} sm={10} md={8} lg={6} xxl={4}>
          <buttonList.add
            className="w-auto"
            title={intl.formatMessage({
              id: 'pages.setting.hotelservice.menu.addcategory',
            })}
            onClick={handleShowAddCategory}
          />
        </Col>
        <Col xs={10} sm={12} md={14} lg={16} xxl={18}>
          <buttonList.add
            className="w-auto"
            title={intl.formatMessage({
              id: 'pages.setting.hotelservice.menu.addproduct',
            })}
            onClick={handleShowAddProduct}
          />
        </Col>
        <Col className="d-flex justify-content-center" xs={4} sm={2}>
          <FilterColumn
            id="pages.setting.hotelservice"
            onFilter={setColumnFilter}
            column={columns}
          ></FilterColumn>
        </Col>
        <Col xs={24} sm={10} md={8} lg={6} xxl={4}>
          <MenuSideBar
            updateId={updateId}
            onDelete={onDelete}
            handleUpdateCategory={handleUpdateCategory}
            menu={menu}
            setMenu={setMenu}
            language={language}
            setCategorySelected={setCategorySelected}
          />
        </Col>
        <Col xs={24} sm={13} md={15} lg={17} xl={17} xxl={19}>
          <div className="content">
            <ProductDefine
              id={id}
              update={updateEdit}
              language={language}
              data={item}
              columns={columns}
              columnFilter={columnFilter}
              categorySelected={categorySelected}
              handleShowUpdateProduct={handleShowUpdateProduct}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
