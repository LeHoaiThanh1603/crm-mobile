import { Button, Drawer, Space } from 'antd'
import React from 'react'
import { Collapse } from 'antd';
import './index.css'
import { useIntl } from 'umi';

const { Panel } = Collapse;

export default function PinMessage({ openPinMessage, closePinMessage, size }) {
    const intl = useIntl();

    const onChange = (key) => {
        console.log(key);
    };

    const handleClosePinMessage = () => {
        closePinMessage(false)
    }
    return (
        <Drawer
            className="width50"
            title={intl.formatMessage({ id: 'pages.setting.chat.pinChat' })}
            placement="right"
            size={size}
            onClose={handleClosePinMessage}
            open={openPinMessage}
        >
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header={intl.formatMessage({ id: 'pages.setting.chat.foder' })} key="1">
                    <ul className='pin'>
                        <li className='pinMess'>Thanh: Hello world !</li>
                        <li className='pinMess'>Thanh: Ghim tin nhắn này !</li>
                        <li className='pinMess'>Thanh: gút baiii !</li>
                    </ul>
                </Panel>
                <Panel header={intl.formatMessage({ id: 'pages.setting.chat.foder2' })} key="2">
                    {/* <p>{text}</p> */}
                </Panel>
                <Panel header={intl.formatMessage({ id: 'pages.setting.chat.foder3' })} key="3">
                    {/* <p>{text}</p> */}
                </Panel>
            </Collapse>
        </Drawer>
    )
}
