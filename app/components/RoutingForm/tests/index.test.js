import React from 'react';
import { render } from 'react-testing-library';
import RoutingForm, { getSubmitButtonWord } from '../index';
import setGlobalGoogleMock from '../../../../internals/testing/setGlobalGoogleMock';

describe('<RoutingForm />', () => {
  it('should render RoutingForm', () => {
    setGlobalGoogleMock();

    const { container } = render(
      <RoutingForm
        loading
        error
        onResetForm={() => {}}
        onSubmitForm={() => {}}
        route={{ total_distance: 1000, total_time: 100 }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('getSubmitButtonWord', () => {
  describe('isSubmitting === true', () => {
    it('should return Loading...', () => {
      const buttonWord = getSubmitButtonWord({
        isSubmitting: true,
        loading: false,
        route: false,
        error: false,
      });
      expect(buttonWord).toEqual('Loading...');
    });
  });

  describe('loading === true', () => {
    it('should return Loading...', () => {
      const buttonWord = getSubmitButtonWord({
        isSubmitting: false,
        loading: true,
        route: false,
        error: false,
      });
      expect(buttonWord).toEqual('Loading...');
    });
  });

  describe('route exists', () => {
    it('should return Re-Submit', () => {
      const buttonWord = getSubmitButtonWord({
        isSubmitting: false,
        loading: false,
        route: {},
        error: false,
      });
      expect(buttonWord).toEqual('Re-Submit');
    });
  });

  describe('error exists', () => {
    it('should return Re-Submit', () => {
      const buttonWord = getSubmitButtonWord({
        isSubmitting: false,
        loading: false,
        route: false,
        error: {},
      });
      expect(buttonWord).toEqual('Re-Submit');
    });
  });

  describe('In default case', () => {
    it('should return Submit', () => {
      const buttonWord = getSubmitButtonWord({
        isSubmitting: false,
        loading: false,
        route: false,
        error: false,
      });
      expect(buttonWord).toEqual('Submit');
    });
  });
});
