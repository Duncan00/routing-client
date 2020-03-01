import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/**
 * Whenever path updated, call google.maps.DirectionsService.route to get new directions
 * @param {Array} path
 * @returns {Array} [{data: {directions}, error}, updateDirections]
 */
export default function useDirectionServiceRoute(path) {
  // eslint-disable-next-line no-undef
  const { maps } = google;

  const DirectionsService = useMemo(() => new maps.DirectionsService(), []);

  const pathRef = useRef(path);

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  // Update directions whenever path changed
  const updateDirections = useCallback(async updatedPath => {
    setError(null);

    pathRef.current = updatedPath;

    if (updatedPath && updatedPath.length >= 2) {
      const firstPoint = updatedPath[0];
      const origin = new maps.LatLng(firstPoint[0], firstPoint[1]);

      const lastPoint = updatedPath.slice(-1)[0];
      const destination = new maps.LatLng(lastPoint[0], lastPoint[1]);

      const waypoints = updatedPath
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
  }, []);

  useEffect(() => {
    updateDirections(path);
  }, [path]);

  return [
    {
      data: { directions },
      error,
    },
    updateDirections,
  ];
}
