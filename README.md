# Routing Client [![Build Status](https://travis-ci.com/Duncan00/routing-client.svg?token=yDxyEKGopauybAdBwDoQ&branch=master)](https://travis-ci.com/Duncan00/routing-client)
A responsive client application to find distance and time by inputting starting location and drop off point with autocomplete assistant. 
And draw result route on google map.

The project is based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).
 
## Starting application
### Versions
```
"node": ">=10.16.1"
"npm": ">=6.9"
```

### Install dependencies
```
npm install
```

### Config
Create `.env` file at project root with following variables and config them  
```
PORT=3000
API=https://mock-api.dev.example.com
GOOGLE_MAP_API_KEY=XXXXX
```
`PORT`: Port of this application, default 3000 if not provided

`API`: API url this application uses

`GOOGLE_MAP_API_KEY`: Google Map API key to show the map and route. Please generate one from [Google Cloud Platform Console](https://cloud.google.com/console/google/maps-apis). 

### Run
```
npm start
```

## Creating production build
### Build
```
npm run build
```

### Run
```
npm run start:prod
```

