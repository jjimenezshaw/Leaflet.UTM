const chai = require('chai');
const {describe, it} = require('mocha');

const {LatLng} = require('leaflet');
const proj4 = require('proj4');

const {Utm, utm} = require('../UTM');

const {data1, defOptions, formats} = require('./fixtures');

chai.should();

// compare the result of convert latLng to utm with proj4 with an utm obj
// it assumes that zone and hemisphere from utm are right.
function compProj4(ll, pointUtm, margin) {
    margin = margin || 0.001;
    const utms = '+proj=utm +zone=' + pointUtm.zone + (pointUtm.southHemi ? '+south' : '');
    const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
    const prj4 = proj4(wgs84, utms, [ll.lng, ll.lat]);
    const err = Math.max(Math.abs(pointUtm.x - prj4[0]), Math.abs(pointUtm.y - prj4[1]));
    return err < margin;
}

describe('UTM', function() {

    describe('Functions in place', function() {
        it('Utm has correct funcs', function() {
            const point = new Utm(0, 0, 1, 'H');
            point.toString.should.be.a('function');
        });
    });

    describe('Compare with proj4', function() {
        const lngStep = 5.23;
        const latStep = 4.2;
        const num = Math.ceil(360/lngStep) * Math.ceil(164/latStep);
        it('Some ' + num + ' comparisons ', function() {
            for (let lng = -180; lng <= 180; lng += lngStep) {
                for (let lat = -80; lat <= 84; lat += latStep) {
                    const p = new LatLng(lat, lng);
                    compProj4(p, p.utm()).should.be.true;
                }
            }
        });
    });

    describe('Known points', function() {
        it('Equator', function() {
            const point = new LatLng(0, 0).utm();
            point.should.have.property('x').closeTo(166021.443, 0.001);
            point.should.have.property('y').equal(0);

            const point2 = new LatLng(0, 3).utm();
            point2.should.have.property('x').equal(500000);
            point2.should.have.property('y').equal(0);
        });
        it('Change zone', function() {
            const ll = new LatLng(44.977061239360594, -3.341408332015574);
            const point = ll.utm(31);
            point.should.have.property('x').closeTo(0, 0.003);
            point.should.have.property('y').closeTo(5000000, 0.003);
            point.should.have.property('zone').equal(31);
            point.should.have.property('band').equal('T');
            point.should.have.property('southHemi').equal(false);

            const point2 = point.normalize();
            point2.should.have.property('x').closeTo(473081.1, 0.1);
            point2.should.have.property('y').closeTo(4980458.9, 0.1);
            point2.should.have.property('zone').equal(30);
            point2.should.have.property('band').equal('T');
            point2.should.have.property('southHemi').equal(false);
        });
        it('Wrap lon', function() {
            const u1 = new LatLng(15, 12).utm();
            const u2 = new LatLng(15, 12 + 360).utm();
            u1.should.have.property('x').closeTo(u2['x'], 0.001);
            u1.should.have.property('y').closeTo(u2['y'], 0.001);
            u1.should.have.property('zone').equal(u2['zone']);
            u1.should.have.property('band').equal(u2['band']);
            u1.should.have.property('southHemi').equal(u2['southHemi']);
        });
        it('Limit zone values', function() {
            const u1 = new LatLng(15, -180).utm();
            const u2 = new LatLng(15, 180).utm();
            u1.should.have.property('zone').equal(1);
            u2.should.have.property('zone').equal(60);
        });
    });

    describe('Exceptions and nulls', function() {
        it('Exceptions', function() {
            const point = utm({x: 0, y: 0, zone: 31});
            (function() {
                point.latLng();
            }).should.throw(Error);
            (function() {point.latLng(true);}).should.not.throw(Error);
            chai.should().equal(null, point.latLng(true));
        });
        it('Nulls', function() {
            const point = utm({x: 0, y: 0, zone: 31});
            chai.should().equal(null, point.latLng(true));
            chai.should().equal(null, point.normalize());
            chai.should().equal(null, utm(null));
            chai.should().equal(undefined, utm());
            const bad = utm({x: 0, y: 1e9, zone: 31, southHemi: false});
            chai.should().equal(null, bad.latLng(true));
        });
    });

    describe('def Options', function() {
        it('default Options (' + defOptions.length + ')', function() {
            defOptions.forEach(function(item) {
                Utm.setDefaultOptions(item.defO);
                const point = utm(item);
                point.toString(item).should.be.equal(item.txt, item.msg);
                Utm.setDefaultOptions(null);
            });
        });

        it('Empty default Options (' + defOptions.length + ')', function() {
            Utm.setDefaultOptions({format: ''});
            defOptions.forEach(function(item) {
                const point = utm(item);
                point.toString(item).should.be.equal(item.defTxt, item.msg);
            });
            Utm.setDefaultOptions(null);
        });

    });

    describe('Fixtures', function() {
        it('data1 (' + data1.length + ')', function() {
            data1.forEach(function(item) {
                const el = (new LatLng(item)).utm();
                const point = utm(item);
                el.should.have.property('x').closeTo(point.x, item.margin);
                el.should.have.property('y').closeTo(point.y, item.margin);
                el.should.have.property('zone').equal(point.zone);
                el.should.have.property('band').equal(point.band);
                el.should.have.property('southHemi').equal(point.southHemi);
                point.equals(el).should.be.true;
            });
        });

        it('formats (' + formats.length + ')', function() {
            formats.forEach(function(item) {
                const point = utm(item);
                point.toString(item).should.be.equal(item.txt, item.msg);
            });
        });
    });
});
