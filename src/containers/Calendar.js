import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    default:
  }
  return listData || [];
}

class Calendars extends Component {
  state = {
    value: moment('2020-11-01'),
    selectedValue: moment('2020-11-01'),
  };

  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default Calendars;