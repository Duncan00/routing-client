import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Error from '../../containers/HomePage/Error';

const { compose, withProps } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require('react-google-maps');

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.GOOGLE_MAP_API_KEY
    }`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  // eslint-disable-next-line no-undef
  const { maps } = google;
  const DirectionsService = new maps.DirectionsService();
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { path } = props;

    setError(null);

    if (path) {
      const firstPoint = path[0];
      const origin = new maps.LatLng(firstPoint[0], firstPoint[1]);

      const lastPoint = path.slice(-1)[0];
      const destination = new maps.LatLng(lastPoint[0], lastPoint[1]);

      const waypoints = path
        .slice(1, -1)
        .map(([lat, lng]) => ({ location: new maps.LatLng(lat, lng) }));

      DirectionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(`Error fetching directions: ${result}`);
          }
        },
      );
    } else {
      setDirections(null);
    }
  }, [props.path]);

  return (
    <div>
      <GoogleMap
        defaultZoom={11}
        // Default center to Hong Kong
        defaultCenter={new maps.LatLng(22.28552, 114.15769)}
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
