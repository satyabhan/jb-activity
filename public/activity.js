var connection = new Postmonger.Session();
const axios = require('axios').default;

// Startup Sequence
connection.trigger('ready');
connection.trigger('requestTokens');
connection.trigger('requestTriggerEventDefinition');
connection.trigger('requestSchema');
connection.trigger('requestInteraction');
connection.trigger('requestEndpoints');

connection.on('requestedEndpoints', function onRequestedInteraction(endpoints) {
    console.log('requestedInteraction', {endpoints});
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
            console.log('jsonplaceholder', {response})
        })
        .catch(error => console.error('axios error', error))
});

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

connection.on('requestedTokens',
    function onGetTokens (tokens) {
      // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
      console.log('requestedTokens', {tokens});
    });
// Save Sequence
connection.on('clickedNext', function() {
  var configuration = JSON.parse( document.getElementById( 'configuration' ).value );
  connection.trigger('updateActivity', configuration);
});
