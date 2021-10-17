const connection = new Postmonger.Session();

const _endpoints = new Promise((resolve, reject) => {
    connection.on('requestedEndpoints', function onRequestedInteraction(endpoints) {
        console.log('requestedEndpoints', {endpoints});
        resolve(endpoints);
    });
});

const _tokens = new Promise((resolve, reject) => {
    connection.on('requestedTokens', function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log('requestedTokens', {tokens});
        resolve(tokens);
    });
})

Promise.all([_endpoints, _tokens]).then(([endpoints, tokens]) => {
   console.log("promise", {endpoints, tokens});
   fetch('../getAttributes', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({'fuelapiRestHost': endpoints.fuelapiRestHost, 'fuel2token': tokens.fuel2token})
   })
       .then(response => {
           return response.json();
       })
       .then(attributes => {
           console.log("getAttributes", attributes);
       })

    fetch('../getTokenContext', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'fuelapiRestHost': endpoints.fuelapiRestHost, 'fuel2token': tokens.fuel2token})
    })
        .then(response => {
            return response.json();
        })
        .then(context => {
            console.log("tokenContext", context);
        })

});

// Startup Sequence
connection.trigger('ready');
connection.trigger('requestTokens');
connection.trigger('requestTriggerEventDefinition');
connection.trigger('requestSchema');
connection.trigger('requestInteraction');
connection.trigger('requestEndpoints');

connection.on('requestedInteraction', function onRequestedInteraction(settings) {
    console.log('requestedInteraction', {settings});
});

connection.on('initActivity', function( data ) {
  console.log('initActivity', {data});

  var url = (window.location != window.parent.location)
      ? document.referrer
      : document.location.href;

  console.log('parentUrl', url);
  document.getElementById( 'configuration' ).value = JSON.stringify( data, null, 2 );
});

connection.on('requestedTriggerEventDefinition',
    function(eventDefinitionModel) {
      if (eventDefinitionModel) {
        console.log('requestedTriggerEventDefinition', {eventDefinitionModel});
        //eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
      }
    });

connection.on('requestedSchema', function (data) {
  console.log('requestedSchema', {data});
});

// Save Sequence
connection.on('clickedNext', function() {
  var configuration = JSON.parse( document.getElementById( 'configuration' ).value );
  connection.trigger('updateActivity', configuration);
});
