/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_ROUTE = 'routing-client/App/LOAD_ROUTE';
export const LOAD_ROUTE_SUCCESS = 'routing-client/App/LOAD_ROUTE_SUCCESS';
export const LOAD_ROUTE_ERROR = 'routing-client/App/LOAD_ROUTE_ERROR';

export const CREATE_ROUTE = 'routing-client/App/CREATE_ROUTE';
export const CREATE_ROUTE_SUCCESS = 'routing-client/App/CREATE_ROUTE_SUCCESS';
export const CREATE_ROUTE_ERROR = 'routing-client/App/CREATE_ROUTE_ERROR';

export const RESET = 'routing-client/App/RESET';
