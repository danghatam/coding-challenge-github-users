import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import User from '../../../src/app/components/user';
import Table from '../../../src/app/components/table';

describe('COMPONENT::Table', done => {
  let props;
  beforeEach(done => {
    props = {
      list: [{
        login: 'tomdang',
        avatar_url: 'fake-link',
        public_repos: 100
      }, {
        login: 'esco',
        avatar_url: 'fake-link-2',
        public_repos: 200
      }]
    };
    done();
  });
  it('should render correctly', done => {
    const enzymeWrapper = shallow(<Table {...props} />);
    expect(enzymeWrapper.find(List)).to.have.length(1);
    expect(enzymeWrapper.find(User)).to.have.length(2);
    done();
  });
});