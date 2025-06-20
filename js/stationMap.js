
/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

class StationMap {

	/*
	 *  Constructor method
	 */
	constructor(parentElement, displayData, mapCenter, MBTALinesData) {
		this.parentElement = parentElement;
		this.displayData = displayData;
		this.mapCenter = mapCenter;
		this.MBTALinesData = MBTALinesData;

		this.initVis();
	}


	/*
	 *  Initialize station map
	 */
	initVis () {
		let vis = this;

		// Set the path for Leaflet images
		L.Icon.Default.imagePath = 'img/';

		vis.map = L.map(vis.parentElement).setView(vis.mapCenter, 13);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(vis.map);

		vis.markerGroup = L.layerGroup().addTo(vis.map);

		let LeafIcon = L.Icon.extend({
			options: {
				shadowUrl: 'img/marker-shadow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [0, -28]
			}
		});

		vis.redMarker = new LeafIcon({ iconUrl: 'img/marker-red.png' });
		vis.blueMarker = new LeafIcon({ iconUrl: 'img/marker-blue.png' });


		L.geoJson(vis.MBTALinesData, {
			style: feature => {
				return {
					color: vis.getStyleForLine(feature.properties.LINE),
					weight: 12,
					opacity: 0.7,
				};
			}
		}).addTo(vis.map);

		vis.wrangleData();
	}


	/*
	 *  Data wrangling
	 */
	wrangleData () {
		let vis = this;

		// No data wrangling/filtering needed

		// Update the visualization
		vis.updateVis();
	}

	updateVis() {
		let vis = this;

		// Clear existing markers
		vis.markerGroup.clearLayers();

		// Add a marker at the position of the SEC at Harvard University: Latitude | Longitude
		// L.marker([42.363230492629455, -71.12731607927883]).addTo(vis.map);

		// Loop through the dataset and append a marker for each station
		vis.displayData.forEach(station => {
			let marker = L.marker([station.latitude, station.longitude], { icon: vis.blueMarker })
				.bindPopup(`<b>${station.name}</b><br>Capacity: ${station.capacity}`);
			vis.markerGroup.addLayer(marker);
		});
	}
	getStyleForLine(lineName) {
		let lineColors = {
			'RED': 		'#ff0000',
			'GREEN': 	'#00ff00',
			'BLUE': 	'#0000ff',
			'ORANGE': 	'#ff8000',
			'SILVER': 	'#c0c0c0'
		};

		return lineColors[lineName] || '#000000'; // Default color if line name not found
	}

}

