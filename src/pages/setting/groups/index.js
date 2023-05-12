import Slide from '@mui/material/Slide';
import { Col, message, Row } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './index.css';
import './ViewGroups/index';

import { useIntl } from 'umi';
import ListGroups from './ListGroup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const { default: AddGroups } = require('./addGroups/index');
const { ContextProvider } = require('./context/ContextProvider');
const { default: ViewGroups } = require('./ViewGroups');

function Groups(props) {
  const intl = useIntl();
  const { showAddGroups } = props;

  const [a, setA] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOkMethod = () => {
    setIsModalOpen(false);
    setA(true);
  };
  const handleCancelMethod = () => {
    setIsModalOpen(false);
  };
  // //==============View Group============
  const [openView, setOpenView] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        setOpenView(false);
        resolve(null);
        success;
      }, 3000);
    });

  // ===========color row table===========
  const rowClassName = (record, rowIndex) => {
    if (rowIndex % 2 === 0) {
      return 'row-even';
    }
    return 'row-odd';
  };
  // ===========/color row table===========
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    setActiveTab('tab1');
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="tab-content">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={13} md={15} lg={17} xl={17} xxl={19}>
          <div className="tab-panels menuHideWidth">
            {activeTab === 'tab1' && (
              <div className="tab-panel">
                <ContextProvider>
                <ListGroups />
                </ContextProvider>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className="tab-panel">
                <ContextProvider>
                  <AddGroups closeCreate={setA} />
                </ContextProvider>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
    // </div>
  );
}

export default Groups;
