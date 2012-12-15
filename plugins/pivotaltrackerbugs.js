var pivotalTracker = require("../lib/pivotaltracker.js"),
    upordown = require('../lib/upordown.js'); 
// TODO allow plugins to include other modules somehow

var pivotalTrackerBugs = {};

pivotalTrackerBugs.interval = 300;

pivotalTrackerBugs.execute = function(callback) {
    var options = {}; // TODO
    pivotalTracker.getOpenBugs(options, function(err, result) {
        callback(null, upordown.getStatus(result));
    });
};

module.exports = pivotalTrackerBugs;
