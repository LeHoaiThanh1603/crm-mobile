import { message } from 'antd';
import errorIcon from './asset/err.svg';
import successIcon from './asset/success.svg';
import warningIcon from './asset/warning.svg';
import { ItemNoti } from './itemNoti';

const notification = {
  error: (content, key) => {
    message.error({
      content: (
        <ItemNoti img={errorIcon} content={content} type="error" style="1px solid #e05959" />
      ),
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
  success: (content, key) => {
    message.success({
      content: (
        <ItemNoti img={successIcon} content={content} type="success" style="1px solid #63df60" />
      ),
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
  warning: (content, key) => {
    message.warning({
      content: (
        <ItemNoti img={warningIcon} content={content} type="warning" style="1px solid #f3ca40" />
      ),
      duration: 2.5,
      icon: <></>,
      key,
    });
  },
};

export { notification };
