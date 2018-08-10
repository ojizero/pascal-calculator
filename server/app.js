
const
	inputs 		= require('./inputs.json'),
 	cars  		= require('./cars.json'),
	stations 	= require('./stations.json'),
	geodist 	= require('geodist')

const getCarLastUpdate = (carId) => {
	return inputs
	.filter(data => {
		return data.car_id == carId
	})
	.sort((x, y) => {
	    return x.timestamp - y.timestamp
	})
	.pop()
}

const distanceBetweenCarAndStation = (carId, stationId) => {
	let input = inputs
	.filter(data => {
		return data.car_id == carId
	})
	.sort((x, y) => {
	    return x.timestamp - y.timestamp
	})

	if ( ! input.length) return null

	let lastUpdate = getCarLastUpdate(carId)

	if (! lastUpdate) return null

	return distanceBetweenTwoPoint(lastUpdate, stations[stationId])
}

const isTheCarInStation = (carId, stationId) => {
	let distance = distanceBetweenCarAndStation(carId, stationId)

	if (! distance) return null

	let lastUpdate = getCarLastUpdate(carId)

	return (distance < 100 && lastUpdate.speed < 1)
}

const distanceBetweenTwoPoint = (start, end) => {
	return geodist(start, end, {'unit': 'meters'}) // todo: meters
}

const calculateCarTimeToStation = (carId, stationId) => {
	// Time   = Distance/Speed
	// Hours  = `KM` / `KM/H`
	let lastUpdate = getCarLastUpdate(carId)

	if (! lastUpdate) return null

	let distance 	= distanceBetweenCarAndStation(carId, stationId) / 1000 // convert it to km
	let speed 		= lastUpdate.speed

	return distance / speed
}

const getStationTraficCondition = (stationId) => {
	let stationCars = Object.values(cars)
	.filter(car => {
		return car.stations_ids.includes(stationId)
	})
	.reduce((carsIds, car) => {
		carsIds.push(car.id)
		return carsIds
	}, [])

	let speedInput = inputs
		.filter(input => {
			return stationCars.includes(input.car_id) && ! isTheCarInStation(input.car_id, stationId)
		})

	let sumSpeed = speedInput
		.reduce((sumSpeed, input)=> {
			sumSpeed += input.speed
			return sumSpeed
		}, 0)

	let avg = sumSpeed / speedInput.length

	return avg / stations[stationId].max_speed
}

const getStations = _ => {
	return stations
}

const getStationData = stationId => {
	return Object.values(cars)
	.filter(car => {
		return car.stations_ids.includes(stationId)
	})
	.map(car => {
		console.log(car)
		car.distanceBetweenCarAndStation = distanceBetweenCarAndStation(car.id, stationId)
		car.traffic = getStationTraficCondition(stationId)
		car.status = isTheCarInStation(car.id, stationId) ? 'Boarding' : 'Departed'

		let carTimeToStationInHours = calculateCarTimeToStation(car.id, stationId)
    	car.eta = (carTimeToStationInHours * 60) + " minutes"

    	// var date = new Date().getTime()
		// date += (carTimeToStationInHours * 60 * 60 * 1000)
		// date = new Date(date)

		// car.eta = ("0" + date.getHours()).slice(-2) + ':' +
    	// ("0" + date.getMinutes()).slice(-2);

		// Mocked data
    	car.time = "20 min"
    	car.load = Math.floor(Math.random() * Math.floor(7))
    	const weathers = ['clear-day', 'partly-cloudy-night', 'rain', 'fog', 'snow']
    	car.weather = weathers[Math.floor(Math.random()*weathers.length)]

		return car
	})
}

const carDepartureTime = carId => {

}

console.log(distanceBetweenCarAndStation(1,1))

module.exports  = {
	getCarLastUpdate,
	distanceBetweenCarAndStation,
	isTheCarInStation,
	calculateCarTimeToStation,
	distanceBetweenTwoPoint,
	getStationTraficCondition,
	getStations,
	getStationData
}
