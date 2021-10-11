var connection = new Postmonger.Session();

// Startup Sequence
connection.trigger('ready');
connection.trigger('requestTokens');
connection.trigger('requestTriggerEventDefinition');

connection.on('initActivity', function( data ) {
  alert("initActivity");
  console.log({data});
  document.getElementById( 'configuration' ).value = JSON.stringify( data, null, 2 );
});

connection.on('requestedTriggerEventDefinition',
    function(eventDefinitionModel) {
    alert("requestedTriggerEventDefinition");
      if (eventDefinitionModel) {
        console.log({eventDefinitionModel});
        //eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
      }
    });

connection.on('requestedTokens',
    function onGetTokens (tokens) {
      // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
      console.log({tokens});
    });
// Save Sequence
connection.on('clickedNext', function() {
  var configuration = JSON.parse( document.getElementById( 'configuration' ).value );
  connection.trigger('updateActivity', configuration);
});
