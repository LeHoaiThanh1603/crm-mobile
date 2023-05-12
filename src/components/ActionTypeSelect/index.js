import { label } from '../Label';
import { useModel, useIntl } from 'umi';
import { select } from '../Select';
import { Row, Col } from 'antd';

const ActionTypeSelect = ({ onChange, value, className, style }) => {
  const intl = useIntl();
  const { actionType } = useModel('messagedata');

  return (
    <Row style={ { ...style } }>
      <Col span={ 6 }>
        <label.titlemd>
          { intl.formatMessage({ id: 'component.languageselect.actiontype' }) }
        </label.titlemd>
      </Col>
      <Col span={ 18 }>
        <div style={ { width: '100%' } }>
          <select.group
            allowClear={ false }
            value={ value }
            onChange={ onChange }
            placeholder={ intl.formatMessage({ id: 'component.languageselect.actiontype' }) }
          >
            { actionType.map((item) => {
              return (
                <select.option key={ item.id } value={ item.id }>
                  { item.name }
                </select.option>
              );
            }) }
          </select.group>
        </div>
      </Col>
    </Row>
  );
};

export { ActionTypeSelect };
