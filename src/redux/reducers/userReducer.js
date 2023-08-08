/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import {
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL
} from "../actions/userAction";

const initialState = {
  loading: false,
  error: {},
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      {
        return {
          ...state,
          loading: false,
          error: null
        };
      }
    case REGISTER_FAIL:
      {
        return {
          ...state,
          loading: true,
          error: action.payload.error.response.data
        };
      }
    case LOGIN_FAIL:
      {
        return {
          ...state,
          loading: true,
          error: action.payload.error ? action.payload.error.response.data : null,
        };
      }
    case GET_USERS_SUCCESS:
      {
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null
        };
      }
    case GET_USERS_FAIL:
      {
        return {
          ...state,
          loading: true,
          error: action.payload.error.response.data
        };
      }
    default:
      return state;
  }
};
