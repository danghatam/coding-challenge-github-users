import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBox from '../../components/searchbox';
import Table from '../../components/table';
import { searchUsers } from '../../../redux/actions/user';
import Styles from './styles';

export class Home extends Component {
  render() {
    return (
      <div style={Styles.container}>
        <h1 style={Styles.title}>Heftybyte Coding Challenge</h1>
        <SearchBox onSearch={this.props.handleSearch} />
        <Table list={this.props.user.list} />
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  handleSearch: searchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
