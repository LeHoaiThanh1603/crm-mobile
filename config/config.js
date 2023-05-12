// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
    baseSeparator: '-',
  },
  dynamicImport: {
    loading: '@/components/LoadingLogo/loading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },

        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/reception',
      layout: false,
      component: './modules',
    },
    {
      path: '/rate',
      layout: false,
      component: './VoteStar',
    },
    {
      path: '/roommap',
      layout: false,
      component: './roommap',
    },
    {
      path: '/login',
      layout: false,
      component: './login',
    },
    {
      exact: false,
      path: '/setting',
      component: '@/layouts/setting/index',
      routes: [
        // {
        //   exact: true,
        //   path: '/setting/hoteldefine',
        //   name: 'hoteldefine',
        //   component: './setting/hotelDefine',
        // },
        // {
        //   exact: true,
        //   path: '/setting/roomdefine',
        //   name: 'roomdefine',
        //   component: './setting/roomDefine',
        // },
        // {
        //   exact: true,
        //   path: '/setting/companydefine',
        //   name: 'companydefine',
        //   component: './setting/companyDefine',
        // },
        // {
        //   exact: true,
        //   path: '/setting/userdefine',
        //   name: 'userdefine',
        //   component: './setting/userDefine',
        // },
        // {
        //   exact: true,
        //   path: '/setting/templatemessage',
        //   name: 'systemdefine',
        //   component: './setting/systemDefine',
        // },
        // {
        //   exact: true,
        //   path: '/setting/other',
        //   name: 'other',
        //   component: './setting/other',
        // },
        // {
        //   exact: true,
        //   path: '/setting/guestlist',
        //   name: 'tabledefine',
        //   component: './setting/tableDefine',
        // },
        {
          exact: true,
          path: '/setting/groups',
          name: 'groups',
          component: './setting/groups',
        },
        {
          exact: true,
          path: '/setting/adsCampaign',
          name: 'adsCampaign',
          component: './setting/adsCampaign',
        },
        {
          exact: true,
          path: '/setting/InboxChat',
          name: 'InboxChat',
          component: './setting/InboxChat',
        },
        // {
        //   exact: true,
        //   path: '/setting/ListRating',
        //   name: 'listRating',
        //   component: './setting/ListRating',
        // },
      ],
    },
    {
      exact: false,
      path: '/report',
      component: '@/layouts/report/index',
      routes: [
        {
          exact: true,
          path: '/report/televisionstatus',
          name: 'televisionstatus',
          component: './report/televisionstatus',
        },
        {
          exact: true,
          path: '/report/dailyorder',
          name: 'dailyorder',
          component: './report/dailyorder',
        },
        {
          exact: true,
          path: '/report/televisionusetime',
          name: 'televisionusetime',
          component: './report/televisionusetime',
        },
        {
          exact: true,
          path: '/setting/templatemessage',
          name: 'templatemessage',
          component: './setting/systemDefine',
        },
        {
          exact: true,
          path: '/report/topchannel',
          name: 'topchannel',
          component: './report/topchannel',
        },
        {
          exact: true,
          path: '/report/userrating',
          name: 'userrating',
          component: './report/userrating',
        },
      ],
    },
    {
      exact: false,
      path: '/groups',
      component: '@/layouts/groups/index',
    },
    // {
    //   exact: false,
    //   path: '/message',
    //   component: '@/layouts/InboxChat/index',
    //   routes: [
    //     {
    //     },
    //   ],
    // },
    // {
    //   exact: false,
    //   path: '/reception',
    //   component: '@/layouts/reception/index',
    //   routes: [
    //     {
    //       exact: true,
    //       path: '/reception/login',
    //       name: 'login',
    //       icon: 'CodepenOutlined',
    //       component: './user/Login',
    //     },
    //     {
    //       exact: true,
    //       path: '/reception/roommap',
    //       name: 'roommap',
    //       component: './roommap',
    //     },
    //     {
    //       exact: true,
    //       path: '/reception/booking',
    //       name: 'booking',
    //       component: './booking',
    //     },
    //   ],
    // },
    // {
    //   exact: false,
    //   path: '/modules',
    //   component: '@/layouts/modules/index',
    //   routes: [
    //     {
    //       exact: true,
    //       path: '/modules/outlet',
    //       name: 'outlet',
    //       component: './area',
    //     },
    //     {
    //       exact: true,
    //       path: '/modules/area',
    //       name: 'area',
    //       component: './area/areaListTable',
    //     },
    //     {
    //       exact: true,
    //       path: '/modules/bill',
    //       name: 'bill',
    //       component: './area/bill',
    //     },
    //   ],
    // },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  //openAPI: [
  //  {
  //    requestLibPath: "import { request } from 'umi'",
  //    // 或者使用在线的版本
  //    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //    schemaPath: join(__dirname, 'oneapi.json'),
  //    mock: false,
  //  },
  //  {
  //    requestLibPath: "import { request } from 'umi'",
  //    schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //    projectName: 'swagger',
  //  },
  //],
  nodeModulesTransform: {
    type: 'none',
  },
  //mfsu: {},
  webpack5: {},
  exportStatic: {},
});
