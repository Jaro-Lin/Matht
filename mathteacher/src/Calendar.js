import React, { Component } from 'react';
import './index.css'
import 'antd/dist/antd.css';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class Cal extends Component {
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
        return ( <
            >
            <
            Alert message = { `You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}` }
            /> <
            Calendar value = { value }
            onSelect = { this.onSelect }
            onPanelChange = { this.onPanelChange }
            /> <
            />
        );
    }
}
export default Cal;