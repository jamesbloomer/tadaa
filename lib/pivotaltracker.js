var pivotal = require("pivotal");

var pivotalTracker = {};

var getStories = function(filter, options, callback) {
    console.log('Calling Pivotal Tracker');
    pivotal.useToken(options.token);
    pivotal.getStories(options.projectId, { filter: filter }, function(error, ret) {
        if(error) {
            return callback(error);
        }
        
		console.log('Got %s open stories', ret.story.length);
        return callback(null, ret.story.length);
    });
};

pivotalTracker.getOpenBugs = function(options, callback) {
    var openBugsFilter = "type:bug state:unscheduled,unstarted,started,finished,delivered,rejected";
	return getStories(openBugsFilter, options, callback);
};

pivotalTracker.getOpenFeatures = function(options, callback) {
    var openFeaturesFilter = "type:feature state:unscheduled,unstarted,started,finished,delivered,rejected";
	return getStories(openFeaturesFilter, options, callback);
};

module.exports = pivotalTracker;
