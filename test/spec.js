'use strict';

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
});
