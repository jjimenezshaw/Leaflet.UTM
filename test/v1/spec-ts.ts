import * as L from 'leaflet';

const options: L.UtmStringOptions = {
    decimals: 2,
    sep: ',',
    format: '{x}{sep} {y}{sep} {zone}{band}{sep} {datum}',
    north: 'N',
    south: 'S'
};
L.Utm.setDefaultOptions(options);

let utm: L.Utm;

utm = L.latLng(0, 0).utm() as L.Utm;
utm = L.latLng(0, 0).utm(31) as L.Utm;
utm = L.latLng(0, 0).utm(31, false) as L.Utm;
utm = L.utm(0, 0, 31) as L.Utm;
utm = L.utm(0, 0, 31, 'T') as L.Utm;
utm = L.utm(0, 0, 31, 'T', false) as L.Utm;
utm = L.utm(L.utm(0, 0) as L.Utm) as L.Utm;
utm = L.utm({x: 0, y: 0, zone: 31}) as L.Utm;
utm = L.utm(utm.x, utm.y, utm.zone, utm.band, utm.southHemi) as L.Utm;

utm = utm.clone();
utm = utm.normalize() as L.Utm;

let obj: L.UtmPoint;
obj = utm.dic();
obj = utm.dic(true);
utm = L.utm(obj) as L.Utm;

const value: boolean = utm.equals(L.utm(0, 0, 31) as L.Utm);
value === true;

const text: string = utm.toString({decimals: 1});
text !== '';

let point: L.LatLng;
point = utm.latLng() as L.LatLng;
point = utm.latLng(true) as L.LatLng;
utm = point.utm() as L.Utm;
utm = point.utm(utm.zone) as L.Utm;
utm = point.utm(utm.zone, utm.southHemi) as L.Utm;
