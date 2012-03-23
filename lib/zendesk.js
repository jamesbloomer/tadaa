var buddha = require("buddha");

var getOpenTickets = function(options, callback) {
    buddha.setCredentials(options.zenHost, options.zenEmail, options.zenPassword);
    return buddha.getTicketCount(options.zenView, callback);
};

exports.getOpenTickets = getOpenTickets;
