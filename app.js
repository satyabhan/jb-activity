var express = require( 'express' )
var app = express()
var port = process.env.PORT || 3000

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.use( express.static('public') )
app.listen( port, () => console.log( `App listening on port ${port}!`) )
