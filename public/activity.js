var connection = new Postmonger.Session();

// Startup Sequence
connection.trigger('ready');

connection.on('initActivity', function( data ) {
  alert("Hi from Satya!");

  document.getElementById( 'configuration' ).value = JSON.stringify( data, null, 2 );
});

connection.on('requestedTriggerEventDefinition',
    function(eventDefinitionModel) {
      if (eventDefinitionModel) {
        console.log({eventDefinitionModel});
        eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;
      }
    });

// Save Sequence
connection.on('clickedNext', function() {
  var configuration = JSON.parse( document.getElementById( 'configuration' ).value );
  connection.trigger('updateActivity', configuration);
});
