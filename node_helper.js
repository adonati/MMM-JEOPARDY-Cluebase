/* Magic Mirror
 * Module: MMM-JEOPARDY-Cluebase
 *
 * Based on MMM-JEOPARDY By Mykle1
 *
 * This fork uses the Cluebase API (the original API doesn't seem to work any more)
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getJEOPARDY: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = body;
			    //	console.log(response.statusCode);
		if (result.length > 0) {
                    this.sendSocketNotification('JEOPARDY_RESULT', result);
                }			
            //    this.sendSocketNotification('JEOPARDY_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("NOTIF: " + notification);
        console.log("PAYLOAD: " + payload);
        if (notification === 'GET_JEOPARDY') {
            this.getJEOPARDY(payload);
        }
    }
});
