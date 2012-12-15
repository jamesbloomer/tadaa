var pivotalTracker = require('../lib/pivotaltracker.js'),
    upordown = require('../lib/upordown.js'); 
// TODO allow plugins to include other modules somehow

var pivotalTrackerFeatures = {};

pivotalTrackerFeatures.interval = 300;

pivotalTrackerFeatures.execute = function(callback) {
    var options = {}; // TODO
    pivotalTracker.getOpenFeatures(options, function(err, result) {
        callback(null, upordown.getStatus(result));
    });
};

module.exports = pivotalTrackerFeatures;
