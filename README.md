# 0+X Test Assignment: Weather App

## Before start

To use open weather data, you need to put your API key to `.env` file into variable `REACT_APP_WEATHER_API_KEY`.
To create the API key go to https://weatherapi.com and create the account.

## Development

This is react script environment, so to start development use:
```bash
npm start
```

To check PWA you need to run this:
```bash
npm install -g serve
NODE_ENV=production npm run build
serve -s build
```

Current web vitals:
```json
{
  "FCP": {
    "name": "FCP",
      "value": 111.39999997615814,
      "rating": "good",
      "delta": 111.39999997615814,
      "entries": [
      {
        "name": "first-contentful-paint",
        "entryType": "paint",
        "startTime": 111.39999997615814,
        "duration": 0
      }
    ],
      "id": "v3-1690453107362-9438791445180",
      "navigationType": "navigate"
  },
  "TTFB": {
    "name": "TTFB",
      "value": 9.200000047683716,
      "rating": "good",
      "delta": 9.200000047683716,
      "entries": [
      {
        "name": "http://localhost:3000/",
        "entryType": "navigation",
        "startTime": 0,
        "duration": 208.29999995231628,
        "initiatorType": "navigation",
        "nextHopProtocol": "",
        "renderBlockingStatus": "non-blocking",
        "workerStart": 0,
        "redirectStart": 0,
        "redirectEnd": 0,
        "fetchStart": 2.700000047683716,
        "domainLookupStart": 2.700000047683716,
        "domainLookupEnd": 2.700000047683716,
        "connectStart": 2.700000047683716,
        "secureConnectionStart": 0,
        "connectEnd": 2.700000047683716,
        "requestStart": 8.5,
        "responseStart": 9.200000047683716,
        "responseEnd": 11.799999952316284,
        "transferSize": 300,
        "encodedBodySize": 550,
        "decodedBodySize": 550,
        "responseStatus": 200,
        "serverTiming": [],
        "unloadEventStart": 0,
        "unloadEventEnd": 0,
        "domInteractive": 47.39999997615814,
        "domContentLoadedEventStart": 87.20000004768372,
        "domContentLoadedEventEnd": 87.20000004768372,
        "domComplete": 207.60000002384186,
        "loadEventStart": 208.20000004768372,
        "loadEventEnd": 208.29999995231628,
        "type": "navigate",
        "redirectCount": 0,
        "activationStart": 0
      }
    ],
    "id": "v3-1690453107362-1964400469940",
    "navigationType": "navigate"
  },
  "LCP": {
    "name": "LCP",
      "value": 111.39999997615814,
      "rating": "good",
      "delta": 111.39999997615814,
      "entries": [
      {
        "name": "",
        "entryType": "largest-contentful-paint",
        "startTime": 111.39999997615814,
        "duration": 0,
        "size": 17666,
        "renderTime": 111.399,
        "loadTime": 0,
        "firstAnimatedFrameTime": 0,
        "id": "",
        "url": ""
      }
    ],
    "id": "v3-1690453107362-5785265198852",
    "navigationType": "navigate"
  },
  "FID": {
    "name": "FID",
      "value": 3.6999999284744263,
      "rating": "good",
      "delta": 3.6999999284744263,
      "entries": [
      {
        "name": "pointerdown",
        "entryType": "first-input",
        "startTime": 1139.1000000238419,
        "duration": 8,
        "processingStart": 1142.7999999523163,
        "processingEnd": 1142.8999999761581,
        "cancelable": true
      }
    ],
    "id": "v3-1690453107362-1838192198498",
    "navigationType": "navigate"
  }
}
```