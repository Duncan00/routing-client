import produce from 'immer';
import { pick } from 'lodash';
import {
  LOAD_ROUTE,
  LOAD_ROUTE_SUCCESS,
  LOAD_ROUTE_ERROR,
  CREATE_ROUTE,
  CREATE_ROUTE_SUCCESS,
  CREATE_ROUTE_ERROR,
  RESET,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  api: process.env.API,
  user_data: {
    route_token: '',
    route: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ROUTE:
        draft.loading = true;
        draft.error = false;
        draft.user_data.route = false;
        break;

      case LOAD_ROUTE_SUCCESS:
        draft.user_data.route = pick(action.data, [
          'path',
          'total_distance',
          'total_time',
        ]);
        draft.loading = false;
        break;

      case LOAD_ROUTE_ERROR:
        draft.error = action.error.message;
        draft.loading = false;
        break;

      case CREATE_ROUTE:
        draft.loading = true;
        draft.error = false;
        draft.user_data.route_token = '';
        break;

      case CREATE_ROUTE_SUCCESS: {
        draft.loading = false;
        draft.user_data.route_token = action.data.token;
        break;
      }

      case CREATE_ROUTE_ERROR:
        draft.loading = false;
        draft.error = action.error.message;
        break;

      case RESET:
        return initialState;
    }
  });

export default appReducer;
