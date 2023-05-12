import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { dataDistricts } from '@/e2e/configSystem';

export default class Districts extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isChange: false,
      value: this.props.value
    }
  }

  render() {
    const children = [];
    dataDistricts.data.filter(x => x.provinceId == this.props.provinceId).forEach((item) => {
      children.push(<Option key={ item.id } value={ item.id }>{ item.type + ' ' + item.name }</Option>);
    });
    return (
      <Select size='large' style={ { width: '100%' } }
        showSearch
        allowClear
        getPopupContainer={ node => node.parentNode }
        onChange={ (value) => { this.props.onChange ? this.props.onChange(value) : '' } }
        value={ this.props.value }
        filterOption={ (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) != -1;
        } }
      >
        { children }
      </Select>
    );
  }
}
