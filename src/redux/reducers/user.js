import * as Types from '../constants/ActionTypes';

const user = (state = {
  list: []
}, action) => {
  switch (action.type) {
    case Types.CLEAR_USER_LIST:
      return Object.assign({}, state, {list: []});

    case Types.SEARCH_USER_SUCCESS:
      const newList = state.list.concat(action.response);
      return Object.assign({}, state, { list: newList });

    default: return state;
  }
};
export default user;
