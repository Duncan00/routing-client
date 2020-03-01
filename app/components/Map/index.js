import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import Error from '../Error';
import useDirectionServiceRoute from './useDirectionServiceRoute';

const Map = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGoogleMap,
)(props => {
  const [
    {
      data: { directions },
      error,
    },
  ] = useDirectionServiceRoute(props.path);

  return (
    <div>
      <GoogleMap
        defaultZoom={11}
        // Default center to Hong Kong
        // eslint-disable-next-line no-undef
        defaultCenter={new google.maps.LatLng(22.28552, 114.15769)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      {error && <Error>{error}</Error>}
    </div>
  );
});

Map.propTypes = {
  path: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default Map;
