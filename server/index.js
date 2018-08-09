
const
	express = require('express'),
	app = express(),
	functions = require('./app')

app.get('/stations', function (req, res) {
  res.send(200, functions.getStations())
})

app.get('/station/:id', function (req, res) {
  res.send(200, functions.getStationData(+req.params.id))
})


app.listen(3000, () => console.log('App listening on port 3000!'))