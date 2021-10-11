var connection = new Postmonger.Session();

// Startup Sequence
connection.trigger('ready');
connection.trigger('requestTokens');
connection.trigger('requestTriggerEventDefinition');
connection.trigger('requestSchema');

connection.on('initActivity', function( data ) {
  console.log('initActivity', {data});
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
