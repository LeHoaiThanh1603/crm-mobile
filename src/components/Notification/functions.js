import { message } from 'antd';
import errorIcon from './asset/err.svg';
import successIcon from './asset/success.svg';
import warningIcon from './asset/warning.svg';
import { ItemNoti } from './index';

const notification = {
  error: (content, key) => {
    message.error({
      content: <ItemNoti img={errorIcon} content={content} type="error" />,
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
  success: (content, key) => {
    message.success({
      content: <ItemNoti img={successIcon} content={content} type="success" />,
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
  warning: (content, key) => {
    message.warning({
      content: <ItemNoti img={warningIcon} content={content} type="warning" />,
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
};

export default notification;
