import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchBox from '../../../src/app/components/searchbox';

describe('COMPONENT::SearchBox', done => {
  let props;
  beforeEach(done => {
    props = {
      onSearch: sinon.spy()
    };
    done();
  });
  it('should render correctly', done => {
    const enzymeWrapper = shallow(<SearchBox {...props} />);

    expect(enzymeWrapper.find(TextField)).to.have.length(1);
    expect(enzymeWrapper.find(Button)).to.have.length(1);
    done();
  });

  it('should call onSearch when clicking button', done => {
    const enzymeWrapper = shallow(<SearchBox {...props} />);
    enzymeWrapper.find(Button).first().props().onClick();

    expect(props.onSearch.calledOnce).to.be.true;

    done();
  });
});