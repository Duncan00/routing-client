import {
  selectGlobal,
  makeSelectApi,
  makeSelectRouteToken,
  makeSelectRoute,
  makeSelectError,
  makeSelectLoading,
} from '../selectors';

describe('App/selectors', () => {
  describe('selectGlobal', () => {
    describe('When global state is falsy', () => {
      it('should return the global initial state', () => {
        const mockedState = {
          global: null,
        };
        expect(selectGlobal(mockedState)).toMatchSnapshot();
      });
    });
  });

  describe('makeSelectApi', () => {
    const apiSelector = makeSelectApi();
    it('should select api', () => {
      const api = 'mock_api';
      const mockedState = {
        global: {
          api,
        },
      };
      expect(apiSelector(mockedState)).toEqual(api);
    });
  });

  describe('makeSelectApi', () => {
    const apiSelector = makeSelectApi();
    it('should select api', () => {
      const api = 'mock_api';
      const mockedState = {
        global: {
          api,
        },
      };
      expect(apiSelector(mockedState)).toEqual(api);
    });
  });

  describe('makeSelectRouteToken', () => {
    const routeTokenSelector = makeSelectRouteToken();
    it('should select api', () => {
      const routeToken = 'XXX';
      const mockedState = {
        global: {
          user_data: {
            route_token: routeToken,
          },
        },
      };
      expect(routeTokenSelector(mockedState)).toEqual(routeToken);
    });
  });

  describe('makeSelectRoute', () => {
    const routeSelector = makeSelectRoute();
    it('should select api', () => {
      const route = {};
      const mockedState = {
        global: {
          user_data: {
            route,
          },
        },
      };
      expect(routeSelector(mockedState)).toEqual(route);
    });
  });

  describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();
    it('should select the loading', () => {
      const loading = false;
      const mockedState = {
        global: {
          loading,
        },
      };
      expect(loadingSelector(mockedState)).toEqual(loading);
    });
  });

  describe('makeSelectError', () => {
    const errorSelector = makeSelectError();
    it('should select the error', () => {
      const error = 404;
      const mockedState = {
        global: {
          error,
        },
      };
      expect(errorSelector(mockedState)).toEqual(error);
    });
  });
});
