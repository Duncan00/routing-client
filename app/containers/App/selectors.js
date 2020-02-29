import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectApi = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.api,
  );

const makeSelectRouteToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user_data.route_token,
  );

const makeSelectRoute = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user_data.route,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

export {
  makeSelectApi,
  makeSelectRouteToken,
  makeSelectRoute,
  makeSelectError,
  makeSelectLoading,
};
