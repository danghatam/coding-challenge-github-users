import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SearchBox extends Component {
    constructor() {
        super();
        this.state = { searchStr: '' };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            searchStr: e.target.value
        });
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            this.handleSubmit();
        };
    }

    handleSubmit(e) {
        this.props.onSearch(this.state.searchStr);
    }

    render () {
        return (
            <div>
                <TextField
                    value={this.state.searchStr}
                    onChange={this.handleTextChange}
                    onKeyUp={this.handleEnter}
                    margin="normal"
                    style={{
                        width: 400,
                        marginRight: 10
                    }} />
                <Button variant="raised" color="primary" size="large" onClick={this.handleSubmit}>Search</Button>
            </div>
        );
    }
}

SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBox;
