var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');
var Vehicle = require('vehicles-service');
var list = require('vehicles-find');

module.exports = function (ctx, container, options, done) {
    var sandbox = container.sandbox;
    options = options || {}
    options.user = ctx.user && ctx.user.id
    Vehicle.find({
        query: options,
        resolution: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return done(err);
        }
        vehicles.forEach(function (vehicle) {
            vehicle._.edit = true;
        });
        list(ctx, container, {
            vehicles: vehicles,
            title: 'My Vehicles',
            size: 3
        }, done);
    });
};
