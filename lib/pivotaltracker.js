var pivotal = require("pivotal");

var getOpenBugs = function(options, callback) {
    var openBugsFilter = "type:bug state:unscheduled,unstarted,started,finished,delivered,rejected";

    pivotal.useToken(options.token);
    pivotal.getStories(options.projectId, { filter: openBugsFilter }, function(error, ret) {
        if(error) {
            return callback(error);
        }
        
        return callback(null, ret.story.length);
    });
};

exports.getOpenBugs = getOpenBugs;
