import { deleteTemplate, GetTemplateByChannelLanguage } from '@/untils/request';
import { SearchOutlined } from '@ant-design/icons';
import ButtonMui from '@mui/material/Button';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { Parser } from 'html-to-react';
import { useEffect, useRef, useState } from 'react';
import AddTemplate from '../AddTemplate';
import EditTemplate from '../EditTemplate';
import './style.css';
import { useIntl, useModel } from 'umi';

function TemplateEmail({ method, language }) {
  //table
  const intl = useIntl();
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [dataEdit, setDataEdit] = useState();
  const searchInput = useRef(null);
  const [dataEmail, setDataEmail] = useState([]);
  // const [method, setMethod] = useState('');
  // const [language, setLanguage] = useState('');
  // console.log(dataEmail);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupAdd, setShowPopupAdd] = useState(false);

  // //handleConvertJSX
  const handleConvertJSX = (text) => {
    const html = text;
    const parser = new Parser();
    const jsx = parser.parse(html);
    return jsx;
  };

  useEffect(() => {
    const data = {
      channel: method,
      language: language,
    };
    GetTemplateByChannelLanguage(data).then((res) => setDataEmail(res.data));
  }, [method]);

  const reloadData = () => {
    const data = {
      channel: method,
      language: language,
    };
    GetTemplateByChannelLanguage(data).then((res) => setDataEmail(res.data));
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const onDeleteTemplateEmail = async (e, record) => {
    console.log(record.id);
    e.stopPropagation(); // stop propagation to prevent triggering onClick for parent elements
    try {
      await deleteTemplate(record.id);
      setDataEmail(dataEmail.filter((teamPlate) => teamPlate.id !== record.id));
    } catch (error) {
      console.error(error);
    }
  };
  const dataList = dataEmail.map((item, i) => ({
    id: item.id,
    stt: i + 1,
    name: item.name,
    subject: item.subject,
    message: item.message,
    channel: item.channel,
    language: item.language,
    paramConfigs: item.paramConfigs,
  }));
  const handleAddTemplate = () => {
    setShowPopupAdd(true);
  };
  const columns = [
    {
      title: intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.stt' }),
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.name' }),
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      ...getColumnSearchProps('name'),
    },
    {
      title: intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.view' }),
      dataIndex: 'view',
      key: 'view',
      render: (_, record) => (
        <Space size="middle" onClick={() => {}}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            data-inspector-line="423"
            data-inspector-column="26"
            data-inspector-relative-path="src\layouts\groups\tabs\Group.js"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
          </svg>
        </Space>
      ),
    },
    // {
    //   title: 'Sửa',
    //   dataIndex: 'edit',
    //   key: 'edit',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <BsPencilSquare size={18} />
    //     </Space>
    //   ),
    // },
    {
      title: intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.delete' }),
      dataIndex: 'delete',
      key: 'delete',
      render: (e, record) => (
        <Popconfirm
          placement="bottom"
          title={`Bạn có chắc chắn muốn xóa?`}
          onConfirm={(e) => onDeleteTemplateEmail(e, record)}
          okText="Có"
          cancelText="Không"
        >
          <Button style={{ border: 'none', background: 'none' }}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              data-inspector-line="429"
              data-inspector-column="26"
              data-inspector-relative-path="src\layouts\groups\tabs\Group.js"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
            </svg>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <AddTemplate
        visible={showPopupAdd}
        close={() => setShowPopupAdd(false)}
        method={method}
        language={language}
        reloadData={reloadData}
      />
      <EditTemplate data={dataEdit} visible={showPopupEdit} close={() => setShowPopupEdit(false)} />

      <h2 className="titleTemplate">{intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.title' })}</h2>
      <div className="btn-addTemplate">
        <ButtonMui variant="contained" onClick={handleAddTemplate}>
          {intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.add' })}
        </ButtonMui>
      </div>
      <Table
        columns={columns}
        dataSource={dataList}
        rowClassName={(_, index) => {
          if (index % 2 !== 0) {
            return 'custom';
          }
          return '';
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {},
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          };
        }}
      />
    </>
  );
}
export default TemplateEmail;
