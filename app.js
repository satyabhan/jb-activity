var express = require( 'express' )
var app = express()
var port = process.env.PORT || 3000

app.use( express.static('public') )
app.get('/test', (req, res) => {
    res.send('Hello World!')
})
app.listen( port, () => console.log( `App listening on port ${port}!`) )
