import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import User from '../../../src/app/components/user';

describe('COMPONENT::User', done => {
  let props;
  beforeEach(done => {
    props = {
      info: {
        login: 'tomdang',
        avatar_url: 'fake-link',
        public_repos: 100
      }
    };
    done();
  });
  it('should render correctly', done => {
    const enzymeWrapper = shallow(<User {...props} />);

    expect(enzymeWrapper.find(ListItem)).to.have.length(1);
    expect(enzymeWrapper.find(Avatar)).to.have.length(1);
    expect(enzymeWrapper.find(ListItemText)).to.have.length(1);
    done();
  });
});