var upordown = {};

var count = 0;

upordown.reset = function() {
    count = 0;    
};

upordown.getStatus = function(current) {
    if(!current) {
        return "nochange";
    }
    
    if(current === count) {
        return "nochange";
    }
    
    var status = "down";
    if(current > count) {
        status = "up";
    }
    
    count = current;
    return status;
};

module.exports = upordown;