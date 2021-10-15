var express = require( 'express' )
var app = express()
var port = process.env.PORT || 3000
const axios = require('axios');

app.get('/test', (req, res) => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.send(error);
        });
})

app.use('/static', express.static('public') )
app.listen( port, () => console.log( `App listening on port ${port}!`) )
