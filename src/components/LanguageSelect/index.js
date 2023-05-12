import { label } from '../Label';
import { useModel, useIntl } from 'umi';
import { select } from '../Select';
import { Row, Col } from 'antd';

const LanguageSelect = ({ onChange, value, className, style }) => {
  const intl = useIntl();
  const { language } = useModel('messagedata');

  return (
    <Row gutter={[0, 15]} style={ { ...style } }>
      <Col span={ 6 }>
        <label.titlemd>
          { intl.formatMessage({ id: 'component.languageselect.language' }) }
        </label.titlemd>
      </Col>
      <Col span={ 18 }>
        <div style={ { width: '100%' } }>
          <select.group
            allowClear={ false }
            value={ value }
            onChange={ onChange }
            placeholder={ intl.formatMessage({ id: 'component.languageselect.language' }) }
          >
            { language.map((item) => {
              return (
                <select.option key={ item.name } value={ item.name }>
                  { item.national }
                </select.option>
              );
            }) }
          </select.group>
        </div>
      </Col>
    </Row>
  );
};

export { LanguageSelect };
