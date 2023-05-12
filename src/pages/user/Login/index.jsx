import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useAccess } from 'umi';
import Cookies from 'js-cookie'
import { URL_API } from '@/e2e/configSystem';
import styles from './index.less';
import '@/e2e/customstyle.less';
import { setLocale, getLocale } from 'umi';

const LoginMessage = ({ content }) => (
  <Alert
    style={ {
      marginBottom: 24,
    } }
    message={ content }
    type="error"
    showIcon
  />
);
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = (isReload) => {
  if (!history) return;
  const { query } = history.location;
  const { redirect } = query;
  history.push(redirect || '/');

  if (isReload)
    location.reload()
};

const Login = () => {
  const [ submitting, setSubmitting ] = useState(false);
  const [ userLoginState, setUserLoginState ] = useState({});
  const [ type, setType ] = useState('account');
  const intl = useIntl();
  const access = useAccess();

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      await fetch(URL_API + '/api/user/getCurrentUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.success == '1') {
              localStorage.setItem('avatar', result.avatar);

              const defaultloginSuccessMessage = intl.formatMessage({
                id: 'pages.login.success',
                defaultMessage: '登录成功！',
              });
              message.success(defaultloginSuccessMessage);
              Cookies.set('userlogin', JSON.stringify(result.data), values.autoLogin ? { expires: 7 } : { expires: 1 / 48 });

              setTimeout(() => {
                goto(false);
              }, 500)
            }
            else if (result.success == '0') {
              setUserLoginState({ status: result.mess, loginType: 'account' })
            }
          },
          (error) => {
            console.log(error);
          }
        )

      //const msg = await login({ ...values, type });

      //if ( msg.success === '1') {
      //  const defaultloginSuccessMessage = intl.formatMessage({
      //    id: 'pages.login.success',
      //    defaultMessage: '登录成功！',
      //  });
      //  message.success(defaultloginSuccessMessage);
      //  await fetchUserInfo();
      //  goto();
      //  return;
      //} // 如果失败去设置用户错误信息

      //setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultloginFailureMessage);
    }

    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={ styles.container }>
      <div className={ styles.lang } data-lang>
        { SelectLang && <SelectLang /> }
      </div>
      <div className={ styles.content }>
        <div className={ styles.top }>
          <div className={ styles.header }>
            <Link to="/">
              <img alt="logo" className={ styles.logo } src="/logo.svg" />
              <span className={ styles.title }>Dragon</span>
            </Link>
          </div>
          <div className={ styles.desc }>
            { intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            }) }
          </div>
        </div>

        <div className={ styles.main }>
          <ProForm
            initialValues={ {
              autoLogin: true,
              username: '',
              password: ''
            } }
            submitter={ {
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: 'login',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            } }
            onFinish={ async (values) => {
              await handleSubmit(values);
            } }
          >
            <Tabs activeKey={ type } onChange={ setType }>
              <Tabs.TabPane
                key="account"
                tab={ intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'Đăng nhập',
                }) }
              />
              {/*<Tabs.TabPane*/ }
              {/*  key="mobile"*/ }
              {/*  tab={ intl.formatMessage({*/ }
              {/*    id: 'pages.login.phoneLogin.tab',*/ }
              {/*    defaultMessage: '手机号登录',*/ }
              {/*  }) }*/ }
              {/*/>*/ }
            </Tabs>
            { status != null && type == 'account' && (
              <LoginMessage
                content={ intl.formatMessage({
                  id: status,
                  defaultMessage: 'Đăng nhập không thành công!',
                }) }
              />
            ) }
            { type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={ {
                    size: 'large',
                    prefix: <UserOutlined className={ styles.prefixIcon } />,
                  } }
                  placeholder={ intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: 'Email hoặc số điện thoại',
                  }) }
                  rules={ [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="Vui lòng nhập email hoặc số điện thoại!"
                        />
                      ),
                    },
                  ] }
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={ {
                    size: 'large',
                    prefix: <LockOutlined className={ styles.prefixIcon } />,
                  } }
                  placeholder={ intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: 'Mật khẩu!',
                  }) }
                  rules={ [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="Vui lòng nhập mật khẩu!"
                        />
                      ),
                    },
                  ] }
                />
              </>
            ) }

            { status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" /> }
            { type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={ {
                    size: 'large',
                    prefix: <MobileOutlined className={ styles.prefixIcon } />,
                  } }
                  name="mobile"
                  placeholder={ intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: '手机号',
                  }) }
                  rules={ [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ] }
                />
                <ProFormCaptcha
                  fieldProps={ {
                    size: 'large',
                    prefix: <LockOutlined className={ styles.prefixIcon } />,
                  } }
                  captchaProps={ {
                    size: 'large',
                  } }
                  placeholder={ intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                  }) }
                  captchaTextRender={ (timing, count) => {
                    if (timing) {
                      return `${ count } ${ intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: '获取验证码',
                      }) }`;
                    }

                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: '获取验证码',
                    });
                  } }
                  name="captcha"
                  rules={ [
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ] }
                />
              </>
            ) }
            <div
              style={ {
                marginBottom: 24,
              } }
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="Ghi nhớ đăng nhập" />
              </ProFormCheckbox>
              {/*<a*/ }
              {/*  style={ {*/ }
              {/*    float: 'right',*/ }
              {/*  } }*/ }
              {/*>*/ }
              {/*  <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />*/ }
              {/*</a>*/ }
            </div>
          </ProForm>
          {/*<Space className={ styles.other }>*/ }
          {/*  <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />*/ }
          {/*  <AlipayCircleOutlined className={ styles.icon } />*/ }
          {/*  <TaobaoCircleOutlined className={ styles.icon } />*/ }
          {/*  <WeiboCircleOutlined className={ styles.icon } />*/ }
          {/*</Space>*/ }
        </div>
      </div>
    </div>
  );
};

export default Login;
