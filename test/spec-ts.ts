import {LatLng} from 'leaflet';
import {utm, Utm, UtmStringOptions} from '../UTM';

const options: UtmStringOptions = {
    decimals: 2,
    sep: ',',
    format: '{x}{sep} {y}{sep} {zone}{band}{sep} {datum}',
    north: 'N',
    south: 'S'
};
Utm.setDefaultOptions(options);

let utmPoint: Utm;

utmPoint = new LatLng(0, 0).utm();
utmPoint = new LatLng(0, 0).utm(31);
utmPoint = new LatLng(0, 0).utm(31, false);
utmPoint = utm(0, 0, 31);
utmPoint = utm(0, 0, 31, 'T');
utmPoint = utm(0, 0, 31, 'T', false);
utmPoint = utm(utm(0, 0));
utmPoint = utm({x: 0, y: 0, zone: 31});
utmPoint = utm(utmPoint.x, utmPoint.y, utmPoint.zone, utmPoint.band, utmPoint.southHemi);

utmPoint = utmPoint.clone();
utmPoint = utmPoint.normalize();

let obj: Utm;
obj = utmPoint.dic();
obj = utmPoint.dic(true);
utmPoint = utm(obj);

const value: boolean = utmPoint.equals(utm(0, 0, 31));
value === true;

const text: string = utmPoint.toString({decimals: 1});
text !== '';

let llPoint: LatLng;
llPoint = utmPoint.latLng();
llPoint = utmPoint.latLng(true);
utmPoint = llPoint.utm();
utmPoint = llPoint.utm(utmPoint.zone);
utmPoint = llPoint.utm(utmPoint.zone, utmPoint.southHemi);
