# Leaflet.UTM
[![Build Status](https://travis-ci.org/jjimenezshaw/Leaflet.UTM.png)](https://travis-ci.org/jjimenezshaw/Leaflet.UTM)

**This code is not yet production ready.
Don't use it but for testing purposes.
API may change without previous warning.**

Simple UTM (WGS84) methods for L.LatLng. Tested with Leaflet 1.0.3.

Based on javascript code from http://home.hiwaay.net/~taylorc/toolbox/geography/geoutm.html by Chuck Taylor.

## Installation
To be done, once it is finished.

## Usage
### LatLng -> UTM
Call the method `utm()` in any `L.LatLng` object to get an UTM coordinates object. The method `toString` will convert it seamlessly to string. For instance, to create a popup in a marker:
```JavaScript
marker.bindPopup('UTM: ' + marker.getLatLng().utm());
```
with the text `UTM: 467486.3, 4101149.3, 30S, WGS84`

You can use a personalized format like here:
```JavaScript
var txt = map.getCenter().utm().toString({decimals: 0, format: '{x} {y} {zone} {hemi}'});
```
that produces `467486 4101149 30 North`

### UTM -> LatLng
Just create an object with `L.utm(options)`, and call the method `latLng` like here:
```JavaScript
var item = L.utm({x: 467486.3, y: 4101149.3, zone: 30, band: 'S'});
var coord = item.latLng();
```
You can also specify the hemisphere if you don't know the band, with `southHemi` attribute: `{x: 467486, y: 4101149, zone: 30, southHemi: false}`

## API
### `L.LatLng.utm`
Extends the class `L.LatLng` with the method `utm([zone])`. If zone is not provided, or 0, it is computed based on latitude and longitude (recommended). This method returns an object of class `L.Utm`.
### `L.Utm`
Defines a class to deal with UTM coordinates. The available methods are:
--- to be done ---

## Running tests
Install dependencies and run tests:
```
npm install && npm test
```
or load `test/index.html` in your browser after installing the dependencies by running `npm install`.
