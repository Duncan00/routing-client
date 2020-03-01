export default function setGlobalGoogleMock(mockRouteFn) {
  const directionsStatus = { OK: 'OK' };
  const route =
    mockRouteFn ||
    jest
      .fn()
      .mockImplementation((params, callback) =>
        callback({}, directionsStatus.OK),
      );

  global.google = {
    maps: {
      DirectionsStatus: directionsStatus,
      TravelMode: { DRIVING: 'DRIVING' },
      Map: () => ({
        setCenter: jest.fn(),
        setZoom: jest.fn(),
      }),
      DirectionsService: () => ({ route }),
      DirectionsRenderer: jest.fn().mockImplementation(() => ({
        setDirections: jest.fn(),
        setMap: jest.fn(),
      })),
      LatLng: jest.fn().mockImplementation((lat, lng) => ({
        lat,
        lng,
      })),
      places: {
        Autocomplete: jest.fn().mockImplementation(() => ({
          addListener: jest.fn(),
        })),
      },
    },
  };

  return route;
}
