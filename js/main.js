// Variable for the visualization instance
let stationMap;
let lineData;

// Hubway JSON feed
let url = 'https://gbfs.bluebikes.com/gbfs/en/station_information.json';

/*d3.json(url).then(jsonData =>{
	console.log(jsonData);
});*/

d3.json('data/MBTA-Lines.json').then(data => {
    // Now you have your data, you can create a GeoJSON layer
    lineData = data;
    console.log(lineData);
});

fetch(url, function (d) {
    console.log(d)
})
    .then(response => response.json())
    .then(data => {
        gettingStarted(data)
    });

// function that gets called once data has been fetched.
// We're handing over the fetched data to this function.
// From the data, we're creating the final data structure we need and create a new instance of the StationMap
function gettingStarted(data) {

    // log data
    console.log(data)

    // Extract list with stations from JSON response
    let stations = data.data.stations;

    // create empty data structure
    let displayData = [];

    // Prepare data by looping over stations and populating empty data structure
    stations.forEach(station => {
        let stationInfo = {
            name: station.name,
            capacity: station.capacity,
            latitude: station.lat,
            longitude: station.lon
        };
        displayData.push(stationInfo);
    });
    console.log('Display Data:', displayData);

    // Display number of stations in DOM
    document.getElementById('station-count').innerText = stations.length;

    // Instantiate visualization object (bike-sharing stations in Boston)
    stationMap = new StationMap("station-map", displayData, [42.360082, -71.058880], lineData);
}
