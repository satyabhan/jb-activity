var express = require( 'express' )
var app = express()
var port = process.env.PORT || 3000
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getAttributes', (req, res) => {
    const fuelapiRestHost = req.body.fuelapiRestHost;
    const attributeSetDefinitionsUrl = fuelapiRestHost + 'contacts/v1/attributeSetDefinitions';
    const fuel2token = req.body.fuel2token
    axios.get(attributeSetDefinitionsUrl, {
        headers: {
            'Authorization': 'Bearer ' + fuel2token
        }
    })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.error();
        });
})

app.post('/getTokenContext', (req, res) => {
    const fuelapiRestHost = req.body.fuelapiRestHost;
    const tokenContextUrl = fuelapiRestHost + 'platform/v1/tokenContext';
    const fuel2token = req.body.fuel2token
    axios.get(tokenContextUrl, {
        headers: {
            'Authorization': 'Bearer ' + fuel2token
        }
    })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.error();
        });
})


app.use('/static', express.static('public') )
app.listen( port, () => console.log( `App listening on port ${port}!`) )
