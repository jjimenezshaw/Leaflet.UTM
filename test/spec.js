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
    //this.timeout(500000);

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

    describe('Known points', function() {
        it('Equator', function() {
            var el = L.latLng(0, 0).utm();
            el.should.have.property('x').closeTo(166021.443, 0.001);
            el.should.have.property('y').equal(0);

            el = L.latLng(0, 3).utm();
            el.should.have.property('x').equal(500000);
            el.should.have.property('y').equal(0);
        });
        it('Change zone', function() {
            var ll = L.latLng(44.977061239360594, -3.341408332015574);
            var utm = ll.utm(31);
            utm.should.have.property('x').closeTo(0, 0.003);
            utm.should.have.property('y').closeTo(5000000, 0.003);
            utm.should.have.property('zone').equal(31);
            utm.should.have.property('band').equal('T');
            utm.should.have.property('southHemi').equal(false);

            utm = utm.normalize();
            utm.should.have.property('x').closeTo(473081.1, 0.1);
            utm.should.have.property('y').closeTo(4980458.9, 0.1);
            utm.should.have.property('zone').equal(30);
            utm.should.have.property('band').equal('T');
            utm.should.have.property('southHemi').equal(false);
        });
        it('Wrap lon', function() {
            var u1 = L.latLng(15, 12).utm();
            var u2 = L.latLng(15, 12 + 360).utm();
            u1.should.have.property('x').closeTo(u2['x'], 0.001);
            u1.should.have.property('y').closeTo(u2['y'], 0.001);
            u1.should.have.property('zone').equal(u2['zone']);
            u1.should.have.property('band').equal(u2['band']);
            u1.should.have.property('southHemi').equal(u2['southHemi']);
        });
        it('Limit zone values', function() {
            var u1 = L.latLng(15, -180).utm();
            var u2 = L.latLng(15, 180).utm();
            u1.should.have.property('zone').equal(1);
            u2.should.have.property('zone').equal(60);
        });
    });

    describe('Exceptions and nulls', function() {
        it('Exceptions', function() {
            var utm = L.utm({x: 0, y: 0, zone: 31});
            (function() {
                utm.latLng();
            }).should.throw(Error);
            (function() {utm.latLng(true);}).should.not.throw(Error);
            chai.should().equal(null, utm.latLng(true));
        });
        it('Nulls', function() {
            var utm = L.utm({x: 0, y: 0, zone: 31});
            chai.should().equal(null, utm.latLng(true));
            chai.should().equal(null, utm.normalize());
            chai.should().equal(null, L.utm(null));
            chai.should().equal(undefined, L.utm());
            var bad = L.utm({x: 0, y: 1e9, zone: 31, southHemi: false});
            chai.should().equal(null, bad.latLng());
        });
    });

    describe('def Options', function() {
        it('default Options (' + defOptions.length + ')', function() {
            defOptions.forEach(function(item) {
                L.Utm.setDefaultOptions(item.defO);
                var utm = L.utm(item);
                utm.toString(item).should.be.equal(item.txt, item.msg);
                L.Utm.setDefaultOptions(null);
            });
        });

        it('Empty default Options (' + defOptions.length + ')', function() {
            L.Utm.setDefaultOptions({format: ''});
            defOptions.forEach(function(item) {
                var utm = L.utm(item);
                utm.toString(item).should.be.equal(item.defTxt, item.msg);
            });
            L.Utm.setDefaultOptions(null); //disable to not corrupt the next!
        });

    });

    describe('Fixtures', function() {
        it('data1 (' + data1.length + ')', function() {
            data1.forEach(function(item) {
                var el = L.latLng(item).utm();
                var utm = L.utm(item);
                el.should.have.property('x').closeTo(utm.x, item.margin);
                el.should.have.property('y').closeTo(utm.y, item.margin);
                el.should.have.property('zone').equal(utm.zone);
                el.should.have.property('band').equal(utm.band);
                el.should.have.property('southHemi').equal(utm.southHemi);
                utm.equals(el).should.be.true;
            });
        });

        it('formats (' + formats.length + ')', function() {
            formats.forEach(function(item) {
                var utm = L.utm(item);
                utm.toString(item).should.be.equal(item.txt, item.msg);
            });
        });
    });

});
