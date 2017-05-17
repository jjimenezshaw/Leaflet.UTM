'use strict';

// compare the result of convert latLng to utm with proj4 with an utm obj
// it assumes that zone and hemisphere from utm are right.
function compProj4(ll, utm, margin) {
    margin = margin || 0.001;
    var utms = '+proj=utm +zone=' + utm.zone + (utm.southHemi ? '+south' : '');
    var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
    var prj4 = proj4(wgs84, utms, [ll.lng, ll.lat]);
    var err = Math.max(Math.abs(utm.x - prj4[0]), Math.abs(utm.y - prj4[1]));
    return err < margin;
}

describe('L.UTM', function() {
    chai.should();

    describe('Functions in place', function() {

        it('L.LatLng has correct func', function() {
            var ll = L.latLng(0, 0);
            ll.utm.should.be.a('function');
        });
        it('L.Utm has correct funcs', function() {
            var utm = L.utm(0, 0, 1, 'H');
            utm.toString.should.be.a('function');
        });
    });

    describe('Compare with proj4', function() {
        var lngStep = 5.23;
        var latStep = 4.2;
        var num = Math.ceil(360/lngStep) * Math.ceil(164/latStep);
        it('Some ' + num + ' comparisons ', function() {
            for (var lng = -180; lng <= 180; lng += lngStep) {
                for (var lat = -80; lat <= 84; lat += latStep) {
                    var p = L.latLng(lat, lng);
                    compProj4(p, p.utm()).should.be.true;
                }
            }
        });
    });
});
