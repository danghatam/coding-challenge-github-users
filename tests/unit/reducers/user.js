import { expect } from 'chai';
import UserReducers from '../../../src/redux/reducers/user';
import * as Types from '../../../src/redux/constants/ActionTypes';

describe('REDUCERS::USER', function() {
  it('should return initial state', done => {
    const action = {
      type: 'unknown'
    };

    const initState = {
      list: []
    };

    const newState = UserReducers(undefined, action);

    expect(newState).to.deep.equal(initState);

    done();
  });

  it('should handle GET_USER_SUCCESS', done => {
    const action = {
      type: Types.SEARCH_USER_SUCCESS,
      response: {
        login: 'captain_america'
      }
    };
    const newState = UserReducers(undefined, action);
    expect(newState.list).to.deep.equal([action.response]);

    done();
  });
});
