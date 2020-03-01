import React from 'react';
import { render } from 'react-testing-library';
import Map from '../index';

import setGlobalGoogleMock from '../../../../internals/testing/setGlobalGoogleMock';

describe('<Map />', () => {
  afterEach(() => {
    global.google = null;
  });

  describe('When path is not provided', () => {
    const path = null;

    it('should not call DirectionsService.route', () => {
      const mockRouteFn = setGlobalGoogleMock();

      render(<Map path={path} />);

      expect(mockRouteFn.mock.calls.length).toBe(0);
    });

    it('should render Map container without error', () => {
      setGlobalGoogleMock();

      const { container } = render(<Map path={path} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('When path is provided', () => {
    const path = [
      ['1', '114.107877'],
      ['2', '114.167811'],
      ['3', '114.159510'],
      ['4', '114.159510'],
      ['5', '114.159510'],
    ];

    describe('When no error occurs from DirectionService.route', () => {
      it('should DirectionService.route with correct params', () => {
        const mockRouteFn = setGlobalGoogleMock();

        render(<Map path={path} />);

        expect(mockRouteFn.mock.calls).toMatchSnapshot();
      });

      it('should render Map container without error', () => {
        setGlobalGoogleMock();

        const { container } = render(<Map path={path} />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('When error occurs from DirectionService.route', () => {
      it('should render error', () => {
        setGlobalGoogleMock(
          jest
            .fn()
            .mockImplementation((params, callback) =>
              callback('Route not found.', 'ERROR'),
            ),
        );

        const { container } = render(<Map path={path} />);

        expect(container).toMatchSnapshot();
      });
    });
  });
});
