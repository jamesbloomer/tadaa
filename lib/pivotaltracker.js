var pivotal = require("pivotal");

var getOpenBugs = function(callback) {
    var token = "myToken";
    var projectId = "projectId";
    var openBugsFilter = "type:bug state:unscheduled,unstarted,started,finished,delivered,rejected";

    pivotal.useToken(token);
    pivotal.getStories(projectId, { filter: openBugsFilter }, function(error, ret) {
        if(error) {
            return callback(error);
        }
        
        return callback(null, ret.story.length);
    });
};

exports.getOpenBugs = getOpenBugs;