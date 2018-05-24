import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchBox from '../../../src/app/components/searchbox';
import Table from '../../../src/app/components/table';
import { Home } from '../../../src/app/pages/home/home';

describe('PAGE::Home', done => {
  let props, context;
  beforeEach(done => {
    props = {
      user: { list : [] },
      handleSearch: sinon.spy()
    };
    context = {
        router: {
            push: sinon.spy(),
            replace: sinon.spy()
        }
    };
    done();
  });
  it('should render correctly', done => {
    const enzymeWrapper = shallow(<Home {...props} />, { context });

    expect(enzymeWrapper.find(Table)).to.have.length(1);
    expect(enzymeWrapper.find(SearchBox)).to.have.length(1);
    done();
  });
});
