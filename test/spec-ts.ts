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

utmPoint = new LatLng(0, 0).utm() as Utm;
utmPoint = new LatLng(0, 0).utm(31) as Utm;
utmPoint = new LatLng(0, 0).utm(31, false) as Utm;
utmPoint = utm(0, 0, 31) as Utm;
utmPoint = utm(0, 0, 31, 'T') as Utm;
utmPoint = utm(0, 0, 31, 'T', false) as Utm;
utmPoint = utm(utm(0, 0) as Utm) as Utm;
utmPoint = utm({x: 0, y: 0, zone: 31}) as Utm;
utmPoint = utm(utmPoint.x, utmPoint.y, utmPoint.zone, utmPoint.band, utmPoint.southHemi) as Utm;

utmPoint = utmPoint.clone();
utmPoint = utmPoint.normalize() as Utm;

let obj: Utm;
obj = utmPoint.dic();
obj = utmPoint.dic(true);
utmPoint = utm(obj) as Utm;

const value: boolean = utmPoint.equals(utm(0, 0, 31) as Utm);
value === true;

const text: string = utmPoint.toString({decimals: 1});
text !== '';

let llPoint: LatLng;
llPoint = utmPoint.latLng() as LatLng;
llPoint = utmPoint.latLng(true) as LatLng;
utmPoint = llPoint.utm() as Utm;
utmPoint = llPoint.utm(utmPoint.zone) as Utm;
utmPoint = llPoint.utm(utmPoint.zone, utmPoint.southHemi) as Utm;
