
import React, { useState,useEffect } from "react";
import './index.css'
import { useIntl } from 'umi';
import { Row, Col, Space, Button, Input, Popconfirm } from 'antd';
import { buttonList } from '@/components/Button';
import TemplateZalo from "./TemplateZalo";
import TeamplateSms from "./TeamplateSms";
import TeamplateEmail from "./TeamplateEmail";

const TemplateMessageACP = () => {
  const intl = useIntl();
  const [method, setMethod] = useState('');
  const [language, setLanguage] = useState('');
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab("tab1");
    setMethod('email');
    setLanguage('VNM');
  }, []);

  const handleTabChange = tab => {
    setActiveTab(tab);
    switch (tab) {
      case 'tab1':
        setMethod('email');
        setLanguage('VNM');
        break;
      case 'tab2':
        setMethod('sms');
        setLanguage('VNM');
        break;
      case 'tab3':
        setMethod('zalo');
        setLanguage('VNM');
        break;
      default:
        setMethod('email');
        setLanguage('VNM');
        break;
    }
  };
  return (
    <div className="tab-content">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={10} md={8} lg={6} xxl={4}>
            <div className="tabs">
                <div
                className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabChange("tab1")}
                >
                   <span>Email</span>
                </div>
                <div
                className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabChange("tab2")}
                >
                   <span>SMS</span>
                </div>
                <div
                className={`tab ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => handleTabChange("tab3")}
                >
                   <span>Zalo</span>
                </div>
            </div>
        </Col>

        <Col xs={24} sm={13} md={15} lg={17} xl={17} xxl={19}>
            <div className="tab-panels">
                {activeTab === "tab1" && (
                    <div className="tab-panel">
                        <TeamplateEmail method={method} language={language}/>
                    </div>
                )}
                {activeTab === "tab2" && (
                    <div className="tab-panel">
                        <TeamplateSms method={method} language={language}/>
                    </div>
                )}
                {activeTab === "tab3" && (
                    <div className="tab-panel">
                        <TemplateZalo method={method} language={language}/>
                    </div>
                )}
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default TemplateMessageACP;