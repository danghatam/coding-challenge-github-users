import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import User from '../user';
import Styles from './styles';

class Table extends Component {
    render() {
        const users = this.props.list.map((item, index) => (
            <User key={index} info={item} />
        ));

        return (
            <List style={Styles.wrapper}>
                <div style={Styles.table}>{users}</div>
            </List>
        );
    }
}

Table.propTypes = {
    list: PropTypes.array.isRequired
};

export default Table;
