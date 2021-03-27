import * as L from 'leaflet';
import 'L.LatLng.UTM';

const options: L.UtmStringOptions = {
    decimals: 2,
    sep: ',',
    format: '{x}{sep} {y}{sep} {zone}{band}{sep} {datum}',
    north: 'N',
    south: 'S'
};
L.Utm.setDefaultOptions(options);

let utm: L.Utm;

utm = L.latLng(0, 0).utm();
utm = L.latLng(0, 0).utm(31);
utm = L.latLng(0, 0).utm(31, false);
utm = L.utm(0, 0, 31);
utm = L.utm(0, 0, 31, 'T');
utm = L.utm(0, 0, 31, 'T', false);
utm = L.utm(L.utm(0, 0));
utm = L.utm({x: 0, y: 0, zone: 31});
utm = L.utm(utm.x, utm.y, utm.zone, utm.band, utm.southHemi);

utm = utm.clone();
utm = utm.normalize();

let obj: L.UtmPoint;
obj = utm.dic();
obj = utm.dic(true);
utm = L.utm(obj);

const value: boolean = utm.equals(L.utm(0, 0, 31));
value === true;

const text: string = utm.toString({decimals: 1});
text !== '';

let point: L.LatLng;
point = utm.latLng();
point = utm.latLng(true);
utm = point.utm();
utm = point.utm(utm.zone);
utm = point.utm(utm.zone, utm.southHemi);
