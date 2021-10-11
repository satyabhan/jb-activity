var connection = new Postmonger.Session();

// Startup Sequence
connection.trigger('ready');

connection.on('initActivity', function( data ) {
  alert("initActivity");

  document.getElementById( 'configuration' ).value = JSON.stringify( data, null, 2 );
});

connection.on('requestedTriggerEventDefinition',
    function(eventDefinitionModel) {
    alert("requestedTriggerEventDefinition");
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
