var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');
var Vehicle = require('vehicles-service');
var list = require('vehicles-find');

var user

module.exports = function (sandbox, fn, options) {
    options = options || {}
    options.user = user.id
    Vehicle.find({
        query: options,
        images: '288x162'
    }, function (err, vehicles) {
        if (err) {
            return fn(true, serand.none);
        }
        vehicles.forEach(function (vehicle) {
            vehicle._ = {edit: true}
        })
        list(sandbox, fn, {
            vehicles: vehicles,
            title: 'My Vehicles',
            size: 3
        });
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

