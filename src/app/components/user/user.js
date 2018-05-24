import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class User extends Component {
    render () {
        return (
            <ListItem>
                <Avatar src={this.props.info.avatar_url} />
                <ListItemText primary={this.props.info.login} secondary={`public repos: ${this.props.info.public_repos}`} />
            </ListItem>
        );
    }
}

User.propTypes = {
    info: PropTypes.object.isRequired
};

export default User;
