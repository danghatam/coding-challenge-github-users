import { CALL_API } from '../middleware/api';
import * as Types from '../constants/ActionTypes';

const handleSearchUser = (name) => {
  return {
    [CALL_API]: {
      types: [Types.SEARCH_USER_REQUEST, Types.SEARCH_USER_SUCCESS, Types.SEARCH_USER_FAILURE],
      endpoint: `/users/${name}`
    }
  };
};

export const searchUsers = searchStr => {
  return dispatch => {
    // clear after searching
    dispatch(handleClear());
    // search
    const searchArr = searchStr.split(',');
    searchArr.forEach(name => dispatch(handleSearchUser(name)));
  };
};

export const handleClear = () => {
  return {
    type: Types.CLEAR_USER_LIST
  };
};

////////////////////////////////////////////////////////////////////////
// CAN USE THE BELOW CODE IF YOU WANT TO DISPATCH ONLY ONE FOR ALL USERS
//
// export const searchUsers = searchStr => {
//   return async (dispatch, getState) => {
//     const searchArr = searchStr.split(',');
//     const result = searchArr.map(name => new Promise(async (resolve, reject) => {
//       const response = await fetch(`http://localhost:8080/api/users/${name}`);
//       const result = await response.json();
//       return resolve(result);
//     }));
//     const list = await Promise.all(result);
//     return dispatch({
//       type: 'SEARCH_USERS_SUCCESS',
//       users: list
//     });
//   };
// };
