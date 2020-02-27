import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_ROUTE, LOAD_ROUTE } from 'containers/App/constants';
import {
  routeLoaded,
  routeLoadingError,
  routeCreated,
  routeCreatingError,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectApi, makeSelectRouteToken } from 'containers/App/selectors';

export const STATUS = {
  SUCCESS: 'success',
  IN_PROGRESS: 'in progress',
  FAILURE: 'failure',
};

export function* getRoute() {
  const api = yield select(makeSelectApi());
  const token = yield select(makeSelectRouteToken());
  const requestURL = `${api}/route/${token}`;
  // const requestURL = `${api}/mock/route/500`;
  // const requestURL = `${api}/mock/route/failure`;
  // const requestURL = `${api}/mock/route/success`;

  try {
    let data;
    let attemptCount = 0;
    do {
      // Retry max 10 times if keep getting "in progress" response
      if (attemptCount >= 10) {
        yield put(
          routeLoadingError(new Error('Server Busy. Please try again.')),
        );
        return;
      }

      data = yield call(request, requestURL);

      attemptCount += 1;
    } while (data.status === STATUS.IN_PROGRESS);

    if (data.status === STATUS.SUCCESS) {
      yield put(routeLoaded(data));
    } else if (data.status === STATUS.FAILURE) {
      yield put(routeLoadingError(new Error(data.error)));
    }
  } catch (err) {
    yield put(routeLoadingError(err));
  }
}

export function* createRoute({ startingLocation, dropOffPoint }) {
  const api = yield select(makeSelectApi());
  const requestURL = `${api}/mock/route/success`;
  // const requestURL = `${api}/mock/route/500`;
  const body = {
    origin: startingLocation,
    destination: dropOffPoint,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  try {
    const data = yield call(request, requestURL, options);
    yield put(routeCreated(data));

    yield call(getRoute);
  } catch (err) {
    yield put(routeCreatingError(err));
  }
}

export default function* routeData() {
  yield takeLatest(CREATE_ROUTE, createRoute);
  yield takeLatest(LOAD_ROUTE, getRoute);
}
