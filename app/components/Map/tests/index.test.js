import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Map from '../index';

describe('<Map />', () => {
  it('should render Map container', () => {
    const path = [
      ['22.372081', '114.107877'],
      ['22.326442', '114.167811'],
      ['22.284419', '114.159510'],
    ];

    const renderer = new ShallowRenderer();
    const result = renderer.render(<Map path={path} />);

    expect(result).toMatchSnapshot();
  });
});
