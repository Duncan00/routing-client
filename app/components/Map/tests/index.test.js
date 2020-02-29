import React from 'react';
import { render } from 'react-testing-library';
import Map from '../index';

describe('<Map />', () => {
  it('should render Map container', () => {
    const path = [
      ['22.372081', '114.107877'],
      ['22.326442', '114.167811'],
      ['22.284419', '114.159510'],
    ];
    const { container } = render(<Map path={path} />);
    expect(container).toMatchSnapshot();
  });
});
