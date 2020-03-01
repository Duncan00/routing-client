import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { HomePage, mapDispatchToProps } from '../index';
import { createRoute } from '../../App/actions';
import configureStore from '../../../configureStore';
import setGlobalGoogleMock from '../../../../internals/testing/setGlobalGoogleMock';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    setGlobalGoogleMock();

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage
            error={false}
            loading={false}
            onSubmitForm={() => {}}
            onResetForm={() => {}}
            route={{
              total_distance: 1000,
              total_time: 100,
              path: [
                ['22.372081', '114.107877'],
                ['22.326442', '114.167811'],
                ['22.284419', '114.159510'],
              ],
            }}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch createRoute when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const values = {
          starting_location: 'starting_location',
          drop_off_point: 'drop_off_point',
        };
        const setSubmitting = () => {};
        result.onSubmitForm(values, { setSubmitting });
        expect(dispatch).toHaveBeenCalledWith(
          createRoute(values.starting_location, values.drop_off_point),
        );
      });
    });
  });
});
