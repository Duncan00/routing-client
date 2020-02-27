import { put, call, takeLatest } from 'redux-saga/effects';

import { CREATE_ROUTE, LOAD_ROUTE } from 'containers/App/constants';
import {
  routeLoaded,
  routeLoadingError,
  routeCreated,
  routeCreatingError,
} from 'containers/App/actions';

import routeData, { getRoute, createRoute, STATUS } from '../saga';

describe('getRoute Saga', () => {
  let getRouteGenerator;

  function getMockResponse(status) {
    return {
      status,
    };
  }

  beforeEach(() => {
    getRouteGenerator = getRoute();

    const selectApiDescriptor = getRouteGenerator.next().value;
    expect(selectApiDescriptor).toMatchSnapshot();

    const api = 'api.example.com';
    const selectTokenDescriptor = getRouteGenerator.next(api).value;
    expect(selectTokenDescriptor).toMatchSnapshot();

    const token = 'token';
    const callDescriptor = getRouteGenerator.next(token).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  describe("When status === 'success' in response", () => {
    it('should put routeLoaded', () => {
      const response = getMockResponse(STATUS.SUCCESS);
      const putDescriptor = getRouteGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(routeLoaded(response)));
    });
  });

  describe("When status === 'in progress' in response", () => {
    it("should retry call and put routeLoaded if status === 'success' in new response", () => {
      const inProgressResponse = getMockResponse(STATUS.IN_PROGRESS);
      const callDescriptor = getRouteGenerator.next(inProgressResponse).value;
      expect(callDescriptor).toMatchSnapshot();

      const successResponse = getMockResponse(STATUS.SUCCESS);
      const retryPutDescriptor = getRouteGenerator.next(successResponse).value;
      expect(retryPutDescriptor).toEqual(put(routeLoaded(successResponse)));
    });

    it("should throw error if status === 'in progress' in all 10 attempt responses", () => {
      const inProgressResponse = getMockResponse(STATUS.IN_PROGRESS);

      // Retry 9 times, total attempt 10 times
      for (let i = 0; i < 9; i += 1) {
        const callDescriptor = getRouteGenerator.next(inProgressResponse).value;
        expect(callDescriptor).toMatchSnapshot();
      }

      const putDescriptor = getRouteGenerator.next(inProgressResponse).value;
      expect(putDescriptor).toEqual(
        put(routeLoadingError(new Error('Server Busy. Please try again.'))),
      );
    });
  });

  describe("When status === 'failure' in response", () => {
    it('should put routeLoadingError', () => {
      const failureResponse = {
        ...getMockResponse(STATUS.FAILURE),
        error: 'Some errors',
      };
      const putDescriptor = getRouteGenerator.next(failureResponse).value;
      expect(putDescriptor).toEqual(
        put(routeLoadingError(new Error(failureResponse.error))),
      );
    });
  });
});

describe('createRoute Saga', () => {
  let createRouteGenerator;

  beforeEach(() => {
    createRouteGenerator = createRoute({
      startingLocation: 'starting_location',
      dropOffPoint: 'drop_off_point',
    });

    const selectApiDescriptor = createRouteGenerator.next().value;
    expect(selectApiDescriptor).toMatchSnapshot();

    const api = 'api.example.com';
    const callDescriptor = createRouteGenerator.next(api).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  describe('When it requests the data successfully', () => {
    it('should put routeLoaded action and call getRoute', () => {
      const response = {};
      const putDescriptor = createRouteGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(routeCreated(response)));

      const callDescriptor = createRouteGenerator.next().value;
      expect(callDescriptor).toEqual(call(getRoute));
    });
  });

  describe('When it responses errors', () => {
    it('should call routeLoadingError action', () => {
      const response = new Error('Some error');
      const putDescriptor = createRouteGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(routeCreatingError(response)));
    });
  });
});

describe('routeDataSaga', () => {
  const routeDataSaga = routeData();

  it('should start task to watch for CREATE_ROUTE actions', () => {
    const takeLatestLoadDescriptor = routeDataSaga.next().value;
    expect(takeLatestLoadDescriptor).toEqual(
      takeLatest(CREATE_ROUTE, createRoute),
    );
  });

  it('should start task to watch for LOAD_ROUTE actions', () => {
    const takeLatestVoteDescriptor = routeDataSaga.next().value;
    expect(takeLatestVoteDescriptor).toEqual(takeLatest(LOAD_ROUTE, getRoute));
  });
});
