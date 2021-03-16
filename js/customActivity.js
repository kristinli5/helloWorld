// Custom activities load inside an iframe. We'll use postmonger to manage
// the cross-document messaging between Journey Builder and the activity
//
// Journey Builder's Postmonger Events Reference can be found here:
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm

define([
    'postmonger', 'jquery'
], function (
    Postmonger, $
) {
    'use strict';

    // Create a new connection for this session.
    // We use this connection to talk to Journey Builder. You'll want to keep this
    // reference handy and pass it into your UI framework if you're using React, Angular, Vue, etc.
    var connection = new Postmonger.Session();

    console.log("HELLLO");
    // store the activity data
    var payload = {};

    $(window).ready(onRender);

    // called when ready is triggered for the first time
    connection.on('initActivity', initialize);

    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', save);

    function onRender() {
        // Journey Builder will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        // Makes sure the done button is visible in Journey Builder
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        // Journey Builder passes back an object containing both a legacy token and a Fuel2 token.
        // tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        // console.log(tokens);
    }

    function onGetEndpoints(endpoints) {
        // Journey Builder passes back an object containing a REST host URL.
        // endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        // console.log(endpoints);
    }

    function save() {
        // when the user clicks the done button, save the information that 
        // they've entered into the UI

        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file. Any property
        // may be overridden as desired.
        payload['arguments'].execute.inArguments = [{
            "namespace": "default",
            "parameter": "default",
            "defaultValue": "default",
            "email": "default"
        }];
        // Must be set to true for the journey to recognize the activity as fully configured
        payload['metaData'].isConfigured = true;
        // console.log(payload);

        // Called when the activity modal should be closed, with the data
        // saved to the activity on the canvas.
        connection.trigger('updateActivity', payload);
    }
    
});
