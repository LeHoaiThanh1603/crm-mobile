import React, { useState, useEffect, useRef } from 'react';
import { buttonList } from '@/components/Button';
import { useIntl, useModel } from 'umi';
import { Table, Popconfirm, Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { formatNumber } from '@/e2e/extensionMethod';

import { SearchOutlined } from '@ant-design/icons';
import { useFetch } from '@/components/Fetch/useFetch';
import { Switch } from '@/components/Switch';
import { notification } from '@/components/Notification';
import CompanyModal from './companyModal';

import { FilterColumn, Filter } from '@/components/FilterColumn';
import './company.less';

const Company = () => {
  const intl = useIntl();
  const { sourceCode, margetSegment, companyType, companyIndustry, branch, booker, updateCompany } =
    useModel('companydata');
  const [columnFilter, setColumnFilter] = useState([]);
  const searchInputRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [popupType, setPopupType] = useState('add');
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const [data, setData] = useState({
    hang: 1,
    isUse: 0,
    ota: 0,
    id: '',
    congty: '',
    tenGiaoDich: '',
    loai: null,
    industry: '',
    dienthoai: '',
    email: '',
    diaChi: '',
    booker: null,
    taiKhoanNganHang: '',
    maSoThue: '',
    sourceCode: null,
    marketSegment: null,
    branch: null,
    arAcount: false,
    reCreditLimit: null,
    rateCode: null,
  });

  const companyIndustrySimple = [].concat.apply(
    [],
    companyIndustry.map((item) => item.children),
  );

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search name`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="d-flex align-items-center"
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    // onFilter: (value, record) =>
    //   record[dataIndex]
    //     ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //     : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
    render: (text) => {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      );
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    fetchData({
      results: pagination.pageSize,
      page: '1',
      sortField: '',
      sortOrder: '',
      searchInfo: selectedKeys[0],
    });
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
    fetchData({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: '',
      sortOrder: '',
      searchInfo: '',
    });
  };

  const handleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const columns = [
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.id',
      }),
      sorter: true,
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.name',
      }),
      // sorter: true,
      dataIndex: 'CongTy',
      key: 'CongTy',
      ...getColumnSearchProps('CongTy'),
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.legalname',
      }),
      sorter: true,
      dataIndex: 'TenGiaoDich',
      key: 'TenGiaoDich',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.address',
      }),
      dataIndex: 'DiaChi',
      key: 'DiaChi',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.tax',
      }),
      dataIndex: 'MaSoThue',
      key: 'MaSoThue',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.phone',
      }),
      dataIndex: 'DienThoai',
      key: 'DienThoai',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.email',
      }),
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.ar',
      }),
      dataIndex: 'ArAcount',
      key: 'ArAcount',
      render: (record) => {
        return <Switch value={record} readOnly />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.creditlimit',
      }),
      dataIndex: 'ReCreditLimit',
      key: 'ReCreditLimit',
      render: (text) => {
        return text != null ? formatNumber(text) : '';
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.bankaccount',
      }),
      dataIndex: 'TaiKhoanNganHang',
      key: 'TaiKhoanNganHang',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.booker',
      }),
      dataIndex: 'Booker',
      key: 'Booker',
      filters: booker.map((item) => {
        return {
          text: item.name,
          value: item.id,
        };
      }),
      render: (text) => {
        return booker.find((item) => item.id == text)?.name;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.ratecode',
      }),
      dataIndex: 'RateCode',
      key: 'RateCode',
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.industrycompany',
      }),
      dataIndex: 'Industry',
      key: 'Industry',
      render: (text) => {
        let renderArray = [];
        const idArray = text?.split(',');
        idArray?.forEach((item) => {
          renderArray.push(
            companyIndustrySimple.find((industry) => {
              return industry.ma == item;
            })?.tenNganh,
          );
        });
        return renderArray.join('; ');
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.sourcecode',
      }),
      dataIndex: 'SourceCode',
      key: 'SourceCode',
      filters: sourceCode.map((item) => {
        return {
          text: item.sourceCode,
          value: item.ma,
        };
      }),
      render: (text) => {
        return sourceCode.find((item) => item.ma == text)?.sourceCode;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.marketsegment',
      }),
      dataIndex: 'MarketSegment',
      key: 'MarketSegment',
      filters: margetSegment.map((item) => {
        return {
          text: item.marketSegment,
          value: item.ma,
        };
      }),
      render: (text) => {
        return margetSegment.find((item) => item.ma == text)?.marketSegment;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.type',
      }),
      filters: companyType.map((item) => {
        return {
          text: item.loaiCongTy,
          value: item.ma,
        };
      }),
      dataIndex: 'Loai',
      key: 'Loai',

      render: (text) => {
        return companyType.find((item) => item.ma == text)?.loaiCongTy;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.setting.companydefine.company.branch',
      }),
      dataIndex: 'Branch',
      key: 'Branch',
      filters: branch.map((item) => {
        return {
          text: item.branch,
          value: item.ma,
        };
      }),
      render: (text) => {
        return branch.find((item) => item.ma == text)?.branch;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.companydefine.company.action' }),
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <Popconfirm
          placement="leftTop"
          onConfirm={() => {
            deleteCompany(record.Ma);
          }}
          title={intl.formatMessage({ id: 'pages.setting.roomdefine.confirmdelete' })}
          okText={intl.formatMessage({ id: 'pages.setting.roomdefine.yes' })}
          cancelText={intl.formatMessage({ id: 'pages.setting.roomdefine.no' })}
        >
          <buttonList.form.delete />
        </Popconfirm>
      ),
    },
  ];

  const resetData = () => {
    setData({
      hang: 1,
      isUse: 0,
      ota: 0,
      id: '',
      congty: '',
      tenGiaoDich: '',
      loai: null,
      industry: '',
      dienthoai: '',
      email: '',
      diaChi: '',
      booker: null,
      taiKhoanNganHang: '',
      maSoThue: '',
      sourceCode: null,
      marketSegment: null,
      branch: null,
      arAcount: false,
      reCreditLimit: null,
      rateCode: null,
    });
  };

  const deleteCompany = (ma) => {
    const deleteFormData = new FormData();
    deleteFormData.append('ma', ma);
    useFetch(
      '/api/Company/DeleteCompany',
      'DELETE',
      null,
      deleteFormData,
      (res) => {
        if (res.success == 1) {
          fetchData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: '',
            sortOrder: '',
            searchInfo: searchText,
          });
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          updateCompany();
        } else if (res.success == 0) {
          notification.error(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const fetchData = (params = {}) => {
    const formData = new FormData();
    formData.append('param', JSON.stringify(params));
    useFetch(
      '/api/Company/GetCompany',
      'POST',
      null,
      formData,
      (success) => {
        setTableData(JSON.parse(success.data));
        setPagination({
          current: params.page,
          pageSize: params.results,
          total: success.totalRow,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      results: pagination.pageSize,
      page: pagination.current,
      searchInfo: searchText,
      ...filters,
    });
  };

  useEffect(() => {
    fetchData({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: '',
      sortOrder: '',
      searchInfo: searchText,
    });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <buttonList.add
          className="mb-3"
          onClick={() => {
            resetData();
            setPopupType('add');
            setIsModalVisible(true);
          }}
        />
        <FilterColumn
          id="pages.setting.companydefine.tablecompany"
          onFilter={setColumnFilter}
          column={columns}
        ></FilterColumn>
      </div>
      <CompanyModal
        state={data}
        isModalVisible={isModalVisible}
        handleModalVisible={handleModalVisible}
        popupType={popupType}
        resetData={resetData}
        fetchData={fetchData}
        pagination={pagination}
        searchText={searchText}
      />
      <Table
        scroll={{ x: 1500, y: 'calc(100vh - 360px)' }}
        rowKey={(record) => record.Ma}
        columns={Filter(columns, columnFilter)}
        dataSource={tableData}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={(record) => {
          return {
            onMouseEnter: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'pointer';
            }, // mouse enter row
            onMouseLeave: (e) => {
              if (e.target.nodeName == 'TD') e.target.closest('tr').style.cursor = 'auto';
            }, // mouse leave row
            onClick: (e) => {
              if (e.target.nodeName == 'TD') {
                setPopupType('edit');
                setData({
                  ...data,
                  ma: record.Ma,
                  id: record.ID,
                  congty: record.CongTy,
                  tenGiaoDich: record.TenGiaoDich,
                  loai: record.Loai,
                  industry: record.Industry,
                  dienthoai: record.DienThoai,
                  email: record.Email,
                  diaChi: record.DiaChi,
                  booker: record.Booker,
                  taiKhoanNganHang: record.TaiKhoanNganHang,
                  maSoThue: record.MaSoThue,
                  sourceCode: record.SourceCode,
                  marketSegment: record.MarketSegment,
                  branch: record.Branch,
                  arAcount: record.ArAcount,
                  reCreditLimit: record.ReCreditLimit,
                  rateCode: record.RateCode,
                });
                setIsModalVisible(true);
              }
            },
          };
        }}
      />
    </>
  );
};

export default Company;
