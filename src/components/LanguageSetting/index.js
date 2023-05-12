import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Row, Col, Space } from 'antd';
import { buttonList } from '@/components/Button';
import { SystemLang, UpdateSystemLang } from '@/e2e/configSystem';
import { useFetch } from '@/components/Fetch/useFetch';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import { input } from '@/components/Input';
import Modal from '@/components/Popup';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { history, useIntl, useModel } from 'umi';
import { FilterColumn, Filter } from '@/components/FilterColumn';
import './styles.less';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function LanguageSetting({ pageId }) {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleAdd, setVisibleAdd] = useState(false);
  const [isSystemAlert, setIsSystemAlert] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dataAdd, setDataAdd] = useState({ id: '' });
  const searchInput = useRef(null);
  const inputAdd = useRef(null);
  const intl = useIntl();

  let keyList = [];

  const handleKeyDown = (event) => {
    if (event.keyCode == 16 || event.keyCode == 221 || event.keyCode == 219) {
      keyList.push(event.keyCode);
    }
    if (keyList.some((x) => x == 16) && keyList.some((x) => x == 221)) setVisible(true);

    if (keyList.some((x) => x == 16) && keyList.some((x) => x == 219)) {
      setIsSystemAlert(true);
      setVisible(true);
    }
  };

  const handleKeyUp = (event) => {
    keyList = [];
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (!isSystemAlert) {
        let path = history.location.pathname;
        if (pageId) path = path.replaceAll('/' + pageId, '');

        let pathname = path.replaceAll('/', '.');

        setDataSource(SystemLang.filter((x) => x.id.startsWith('pages' + pathname)));
      } else {
        setDataSource(SystemLang.filter((x) => x.id.startsWith('systemalert.')));
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisibleAdd) {
      inputAdd.current?.focus();
    }
  }, [isVisibleAdd]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
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
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
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

  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'id',
      width: '25%',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'America',
      dataIndex: 'en',
      editable: true,
      key: 'en',
      width: '25%',
      ...getColumnSearchProps('en'),
    },
    {
      title: 'Japan',
      dataIndex: 'jp',
      editable: true,
      key: 'jp',
      width: '25%',
      ...getColumnSearchProps('jp'),
    },
    {
      title: 'Vietnamese',
      dataIndex: 'vi',
      editable: true,
      key: 'vi',
      width: '25%',
      ...getColumnSearchProps('vi'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <buttonList.form.delete />
          </Popconfirm>
        ) : null,
      width: '10%',
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleOpenAdd = () => {
    setVisibleAdd(true);

    let path = history.location.pathname;
    if (pageId) path = path.replaceAll('/' + pageId, '');

    let pathname = path.replaceAll('/', '.');

    const newData = {
      id: 'pages' + pathname + '.',
      en: null,
      jp: null,
      vi: null,
    };

    setDataAdd(newData);
  };

  const handleAdd = () => {
    if (dataSource.some((x) => x.id == dataAdd.id)) {
      notification.error(intl.formatMessage({ id: 'component.languagesetting.add.exists' }));
      return;
    }

    useFetch(
      '/api/Defines/CreateOrUpdateLanguages',
      'post',
      'application/json',
      JSON.stringify(dataAdd),
      (res) => {
        if (res.success == 1) {
          const data = [...dataSource];
          data.unshift(dataAdd);
          setDataSource([...data]);
          setVisibleAdd(false);
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const handleDelete = (key) => {
    let data = new FormData();
    data.append('id', key);

    useFetch(
      '/api/Defines/DeleteLanguages',
      'delete',
      '',
      data,
      (res) => {
        if (res.success == 1) {
          const newData = dataSource.filter((item) => item.id !== key);
          setDataSource(newData);
          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const { languageSetting, updateLanguageSetting } = useModel('messagedata');

  useEffect(() => {
    if (!isSystemAlert) {
      let path = history.location.pathname;
      if (pageId) path = path.replaceAll('/' + pageId, '');

      let pathname = path.replaceAll('/', '.');

      setDataSource(languageSetting.filter((x) => x.id.startsWith('pages' + pathname)));
    } else {
      setDataSource(languageSetting.filter((x) => x.id.startsWith('systemalert.')));
    }
  }, [languageSetting]);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    useFetch(
      '/api/Defines/CreateOrUpdateLanguages',
      'post',
      'application/json',
      JSON.stringify({ ...item, ...row }),
      (res) => {
        if (res.success == 1) {
          updateLanguageSetting();

          notification.success(intl.formatMessage({ id: res.mess }), res.mess);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Modal
        visibleOK={false}
        cancelTitle={intl.formatMessage({
          id: 'component.button.normal',
        })}
        visible={isVisible}
        onClose={() => {
          setVisible(false);
          setIsSystemAlert(false);
        }}
        size={'xl'}
        title={intl.formatMessage({
          id: 'component.languagesetting.title',
        })}
      >
        <Modal
          onOK={handleAdd}
          visible={isVisibleAdd}
          onClose={() => setVisibleAdd(false)}
          size={'s'}
          title={intl.formatMessage({
            id: 'component.languagesetting.add',
          })}
        >
          <Row className="language-container mt-3">
            <Col span={24}>
              <label.titlesm>
                {intl.formatMessage({ id: 'component.languagesetting.addpageid' })}
              </label.titlesm>
              <input.medium
                value={dataAdd.id}
                onChange={(e) => {
                  setDataAdd({ ...dataAdd, id: e.target.value });
                }}
                ref={inputAdd}
              ></input.medium>
            </Col>
          </Row>
        </Modal>
        <Row className="language-container mt-3">
          <Col span={24} className="mb-3 d-flex justify-content-between">
            <buttonList.add onClick={handleOpenAdd} />
            <FilterColumn
              id="component.languagesetting.table"
              onFilter={setColumnFilter}
              column={columns}
            ></FilterColumn>
          </Col>
          <Col span={24}>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={Filter(columns, columnFilter)}
              rowKey="id"
              scroll={{ y: 450 }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
