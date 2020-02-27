import {
  LOAD_ROUTE,
  LOAD_ROUTE_SUCCESS,
  LOAD_ROUTE_ERROR,
  CREATE_ROUTE,
  CREATE_ROUTE_SUCCESS,
  CREATE_ROUTE_ERROR,
  RESET,
} from './constants';

export function loadRoute() {
  return {
    type: LOAD_ROUTE,
  };
}

export function routeLoaded(data) {
  return {
    type: LOAD_ROUTE_SUCCESS,
    data,
  };
}

export function routeLoadingError(error) {
  return {
    type: LOAD_ROUTE_ERROR,
    error,
  };
}

export function createRoute(startingLocation, dropOffPoint) {
  return {
    type: CREATE_ROUTE,
    startingLocation,
    dropOffPoint,
  };
}

export function routeCreated(data) {
  return {
    type: CREATE_ROUTE_SUCCESS,
    data,
  };
}

export function routeCreatingError(error) {
  return {
    type: CREATE_ROUTE_ERROR,
    error,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
