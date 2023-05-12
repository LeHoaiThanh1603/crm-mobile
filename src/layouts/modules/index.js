import { useIntl } from 'umi';
import './index.less';
import ModuleHeader from '../../components/ModuleHeader';

export default function Layout({ children, location, route, history, match }) {
  let path = location.pathname;
  const intl = useIntl();

  const defaultTitle = intl.formatMessage({
    id: 'pages' + path.replaceAll('/', '.'),
    defaultMessage: 'Proud PMS',
  });

  document.title = defaultTitle;

  return (
    <div className="layout-bg">
      <ModuleHeader />
      {location.pathname == '/modules/outlet' || location.pathname == '/modules/outlet/'}
      {children}
    </div>
  );
}
