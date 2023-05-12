import PageLoading from '@/components/LoadingLogo/loading';
import { notification } from 'antd';
import { history, Link } from 'umi';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery-ui/themes/base/all.css';
import 'devextreme/dist/css/dx.light.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css';
import 'devexpress-reporting/dist/css/dx-webdocumentviewer.css';

import '@devexpress/analytics-core/dist/css/dx-querybuilder.css';
import 'devexpress-reporting/dist/css/dx-reportdesigner.css';
import '@/e2e/customstyle.less';
import NoAccessPage from './pages/403';
/*const isDev = process.env.NODE_ENV === 'development';*/
const isDev = false;
const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const currentUser = JSON.parse(Cookies.get('userlogin'));
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // Nếu đó là trang đăng nhập, không thực thi

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}
/**
 //-----English
    200: The server successfully returned the requested data. ',
    201: New or modified data is successful. ',
    202: A request has entered the background queue (asynchronous task). ',
    204: Data deleted successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: The user does not have permission (token, username, password error). ',
    403: The user is authorized, but access is forbidden. ',
    404: The request sent was for a record that did not exist. ',
    405: The request method is not allowed. ',
    406: The requested format is not available. ',
    410':
        'The requested resource is permanently deleted and will no longer be available. ',
    422: When creating an object, a validation error occurred. ',
    500: An error occurred on the server, please check the server. ',
    502: Gateway error. ',
    503: The service is unavailable. ',
    504: The gateway timed out. ',
 * @see https://beta-pro.ant.design/docs/request-cn
 */

export const request = {
  errorHandler: (error) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: 'Kết nối mạng bị gián đoạn, vui lòng kiểm tra lại!',
        message: 'Mạng gặp sự cố!',
      });
    }

    throw error;
  },
}; // ProLayout 支持的api https://procomponents.ant.design/components/layout

//export const layout = ({ initialState }) => {
//  initialState.settings.title = 'EzTime'
//  initialState.settings.layout = 'top'
//  initialState.settings.contentWidth = 'Fixed'
//  initialState.settings.navTheme = 'light'

//  return {
//    rightContentRender: () => <RightContent />,
//    disableContentMargin: false,
//    waterMarkProps: {
//      content: initialState?.currentUser?.name,
//    },
//    /*footerRender: () => <Footer />,*/
//    onPageChange: () => {
//      const cookie = Cookies.get('userlogin');
//      const { location } = history;
//      // Nếu bạn chưa đăng nhập, hãy chuyển hướng đăng nhập

//      if (!cookie && location.pathname !== loginPath ) {
//        history.push( loginPath );
//      }
//    },
//    links: isDev
//      ? [
//        <Link to="/umi/plugin/openapi" target="_blank">
//          <LinkOutlined />
//          <span>OpenAPI</span>
//        </Link>,
//        <Link to="/~docs">
//          <BookOutlined />
//          <span>Tài liệu</span>
//        </Link>,
//      ]
//      : [],
//    menuHeaderRender: undefined,
//    // Trang 403 tùy chỉnh
//    unAccessible: <NoAccessPage />,
//    ...initialState?.settings,
//  };
//};
