var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');
var Vehicle = require('vehicles-service');
var list = require('vehicles-find');

var user

module.exports = function (ctx, sandbox, options, done) {
    options = options || {}
    options.user = user.id
    Vehicle.find({
        query: options,
        images: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return done(err);
        }
        vehicles.forEach(function (vehicle) {
            vehicle._.edit = true;
        });
        list(ctx, sandbox, {
            vehicles: vehicles,
            title: 'My Vehicles',
            size: 3
        }, done);
    });
};

serand.on('user', 'ready', function (usr) {
    user = usr;
});

serand.on('user', 'logged in', function (usr) {
    user = usr;
});

serand.on('user', 'logged out', function (usr) {
    user = null;
});

