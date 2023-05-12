import { input } from '@/components/Input';
import { label } from '@/components/Label';
import Modal from '@/components/Popup';
import { GetIncomTemplate } from '@/untils/request';
import { Button, Col, Row, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import { BiHelpCircle } from 'react-icons/bi';
import { Modal as ModelHelp } from 'antd';
import './AddTemplate.css';
import { notification } from '@/components/Notification';

function AddTemplate({ visible, close, method, language, reloadData }) {
  const intl = useIntl();
  const [api, setApi] = useState([]);
  const [optionData, setOptiondata] = useState();
  const [valueSelect, setValueSelect] = useState(false);
  const [dataTemplateIncomAdd, setDataTemplateIncomAdd, createTemplate] = useState([]);
  useEffect(() => {
    const data = {
      channel: method,
    };
    GetIncomTemplate(data).then((res) => setDataTemplateIncomAdd(res.data));
  }, [method]);

  //=================Xử Lý==============
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('');
  const [incomTemplateCode, setIncomTemplateCode] = useState('');
  const [paramConfigsValue, setParamConfigsValue] = useState([]);
  const [param, setParam] = useState('');
  const [configsValue, setConfigsValue] = useState([]);
  const [paramList, setParamList] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [openHelp, setOpenHelp] = useState(false);
  const optionsSelect = dataTemplateIncomAdd.map((item) => {
    return {
      label: item.incomTemplateCode,
      value: item.incomTemplateCode,
    };
  });
  const chang = (value) => {
    const item = dataTemplateIncomAdd.find((item) => item.incomTemplateCode === value);
    setIncomTemplateCode(item.incomTemplateCode);
    setParamList(item.paramList);
    console.log('item.incomTemplateCode', item.incomTemplateCode);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const onChangeParamConfigsValue = (name, value) => {
    const updatedParamValues = [...paramConfigsValue];
    const paramIndex = updatedParamValues.findIndex((param) => param.name === name);
    if (paramIndex !== -1) {
      updatedParamValues[paramIndex].value = value;
    } else {
      updatedParamValues.push({ name, value });
      const jsonString = updatedParamValues
        .map((updatedParamValues) => JSON.stringify(updatedParamValues))
        .join(',')
        .replace(/"/g, '"')
        .replace(/^{/, '[{')
        .replace(/}$/, '}]');
      setParam(jsonString);
    }
  };

  const handleSubmit = async (e) => {
    switch (true) {
      case name.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.templateName.AddTemplate.name' }),
        );
      case subject.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.templateName.AddTemplate.subject' }),
        );
      case message.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.templateName.AddTemplate.message' }),
        );
      case incomTemplateCode.trim().length === 0:
        return notification.warning(
          intl.formatMessage({ id: 'pages.setting.templateName.AddTemplate.incomTemplateCode' }),
        );
    }
    try {
      await axios.post(`http://api.cm.onexus.net/api/CRM/SaveTemplate`, {
        name: name,
        subject: subject,
        message: message,
        channel: method,
        language: language,
        incomTemplateCode: incomTemplateCode,
        paramConfigs: param,
      });
    } catch (error) {
      console.log(error);
    }
    reloadData();
    close();
    return notification.success(intl.formatMessage({ id: 'pages.setting.templateName.AddTemplate.CreateSuccess' }));
  };

  const handleCancelHelp = () => {
    console.log('Clicked cancel button');
    setOpenHelp(false);
  };
  console.log(openHelp);

  return (
    <>
      {/** Model Help */}
      <ModelHelp
        title={intl.formatMessage({ id: 'pages.setting.templateName.AddTemplateTitle' })}
        open={openHelp}
        width="600px"
        footer={[
          <Button key="cancel" onClick={handleCancelHelp}>
            {intl.formatMessage({ id: 'pages.setting.templateName.AddTemplateBack' })}
          </Button>,
        ]}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancelHelp}
      >
        <>
          <Row>
            <Col span={12}>
              <ul className="list">
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[customer_name] : </span>
                   <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateNameCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[customer_id] : </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateCodeCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[service_name] : </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateServiceName',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[service_date] : </span>
                   <span>
                    {intl.formatMessage({ id: 'pages.setting.templateName.AddTemplateDateUse' })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[booking_code] : </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateBookingCoder',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">[hotel_name] : </span>
                   <span>
                    {intl.formatMessage({ id: 'pages.setting.templateName.AddTemplateHotelName' })}
                  </span>
                </li>
              </ul>
            </Col>
            <Col span={12}>
              <ul className="list">
                <li>
                  <span className="dot">•</span>
                  <span className="bold">birthday: </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateDateOfBirthCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">address: </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateAddressCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">telephone: </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplatePhoneCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">email: </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateEmailCustomer',
                    })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">branch_name: </span>
                  <span>
                    {intl.formatMessage({ id: 'pages.setting.templateName.AddTemplateNamebranch' })}
                  </span>
                </li>
                <li>
                  <span className="dot">•</span>
                  <span className="bold">nationality: </span>
                  <span>
                    {intl.formatMessage({
                      id: 'pages.setting.templateName.AddTemplateNationalityCustomer',
                    })}
                  </span>
                </li>
              </ul>
            </Col>
          </Row>
        </>
      </ModelHelp>
      <Modal
        visible={visible}
        onClose={close}
        size="sm"
        onOK={handleSubmit}
        title={intl.formatMessage({ id: 'pages.setting.AddTemplateACP.modal.title' })}
      >
        <div className="AddTemplate">
          <div className="itemAddTemplate">
            <label.titlexl>
              {intl.formatMessage({
                id: 'pages.setting.templateName.info',
              })}
              <span style={{ color: 'red' }}>*</span>
            </label.titlexl>
            <input.medium required={true} value={name} onChange={onChangeName} />
          </div>
          <div className="itemAddTemplate">
            <label.titlexl>
              {intl.formatMessage({
                id: 'pages.setting.templateName.templateSubject',
              })}
            </label.titlexl>
            <input.medium required={true} value={subject} onChange={onChangeSubject} />
          </div>
          <div className="itemAddTemplate">
            <label.titlexl>
              {intl.formatMessage({
                id: 'pages.setting.templateName.templateMessage',
              })}
            </label.titlexl>
            <input.medium required={true} value={message} onChange={onChangeMessage} />
          </div>
          <div className="itemAddTemplate">
            <label.titlexl>
              {intl.formatMessage({
                id: 'pages.setting.templateName.templateMethod',
              })}
            </label.titlexl>
            {/* <input.medium required={true} placeholder="sms"  disabled/> */}
            <p>{method}</p>
          </div>
          <div className="itemAddTemplate">
            <label.titlexl>
              {intl.formatMessage({
                id: 'pages.setting.templateName.templateLanguage',
              })}
            </label.titlexl>
            {/* <input.medium required={true} placeholder="VNM" disabled={true} /> */}
            <p>{language}</p>
          </div>

          <div className="itemAddTemplate">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <label.titlexl>
                {intl.formatMessage({
                  id: 'pages.setting.templateInCom.info',
                })}
              </label.titlexl>
              <span
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                onClick={() => setOpenHelp(true)}
              >
                {<BiHelpCircle size={20} />}
              </span>
            </div>
            <Select
              className="dropDownTemplate"
              defaultValue={intl.formatMessage({
                id: 'pages.setting.templateName.noSelectTemplate',
              })}
              onChange={chang}
              options={optionsSelect}
            />
          </div>
          {paramList.length > 0 && (
            <div>
              {paramList.map((param) => (
                <div>
                  <label.titlexl>{param.name}</label.titlexl>
                  <input.medium
                    required={true}
                    placeholder={param.type}
                    key={param.name}
                    // onChange={onChangeParamConfigsValue}
                    onChange={(event) => onChangeParamConfigsValue(param.name, event.target.value)}
                  ></input.medium>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <button onClick={handleSubmit}>Save</button> */}
      </Modal>
    </>
  );
}
export default AddTemplate;
