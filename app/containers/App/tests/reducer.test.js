import produce from 'immer';

import appReducer from '../reducer';
import {
  loadRoute,
  routeLoaded,
  routeLoadingError,
  createRoute,
  routeCreated,
  routeCreatingError,
  reset,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      user_data: {
        route_token: '',
        route: false,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRoute action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.user_data.route = false;
    });

    expect(appReducer(state, loadRoute())).toEqual(expectedResult);
  });

  it('should handle the routeLoaded action correctly', () => {
    const fixture = {
      path: [['1.1, 1.1'], ['2.2, 2.2'], ['3.3, 3.3']],
      total_distance: 10,
      total_time: 100,
    };
    const expectedResult = produce(state, draft => {
      draft.user_data.route = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, routeLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the routeLoadingError action correctly', () => {
    const fixture = {
      message: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = fixture.message;
    });

    expect(appReducer(state, routeLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the createRoute action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.user_data.route_token = '';
    });

    expect(appReducer(state, createRoute())).toEqual(expectedResult);
  });

  it('should handle the routeCreated action correctly', () => {
    const fixture = {
      token: 'XXXXX',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.user_data.route_token = fixture.token;
    });

    expect(appReducer(state, routeCreated(fixture))).toEqual(expectedResult);
  });

  it('should handle the routeCreatingError action correctly', () => {
    const fixture = {
      message: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = fixture.message;
    });

    expect(appReducer(state, routeCreatingError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the reset action correctly', () => {
    const modifiedState = {
      loading: true,
      error: true,
      user_data: {
        route_token: 'XXXX',
        route: {
          path: [['1.1, 1.1'], ['2.2, 2.2'], ['3.3, 3.3']],
          total_distance: 10,
          total_time: 100,
        },
      },
    };

    const expectedResult = state;
    expect(appReducer(modifiedState, reset())).toEqual(expectedResult);
  });
});
