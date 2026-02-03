/**
 * StationMap - Interactive Leaflet map visualization for bike-sharing stations
 * @param {string} parentElement - HTML element ID to render the map
 * @param {Array} displayData - Array of station objects with name, capacity, lat, lon
 * @param {Array} mapCenter - [latitude, longitude] for initial map center
 * @param {Object} MBTALinesData - GeoJSON data for MBTA transit lines
 */
class StationMap {

    constructor(parentElement, displayData, mapCenter, MBTALinesData) {
        this.parentElement = parentElement;
        this.displayData = displayData;
        this.mapCenter = mapCenter;
        this.MBTALinesData = MBTALinesData;

        this.initVis();
    }

    initVis() {
        let vis = this;

        // Set the path for Leaflet marker images
        L.Icon.Default.imagePath = 'img/';

        // Initialize map centered on Boston
        vis.map = L.map(vis.parentElement, {
            zoomControl: true,
            scrollWheelZoom: true
        }).setView(vis.mapCenter, 13);

        // Add OpenStreetMap tile layer (HTTPS)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(vis.map);

        // Create layer group for markers
        vis.markerGroup = L.layerGroup().addTo(vis.map);

        // Define custom marker icon
        let LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -28]
            }
        });

        vis.blueMarker = new LeafIcon({ iconUrl: 'img/marker-blue.png' });

        // Render MBTA transit lines
        if (vis.MBTALinesData) {
            L.geoJson(vis.MBTALinesData, {
                style: feature => ({
                    color: vis.getStyleForLine(feature.properties.LINE),
                    weight: 4,
                    opacity: 0.8
                })
            }).addTo(vis.map);
        }

        vis.wrangleData();
    }

    wrangleData() {
        let vis = this;
        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // Clear existing markers
        vis.markerGroup.clearLayers();

        // Add markers for each station
        vis.displayData.forEach(station => {
            let marker = L.marker([station.latitude, station.longitude], {
                icon: vis.blueMarker,
                title: station.name
            }).bindPopup(`
                <div class="station-popup">
                    <h4>${station.name}</h4>
                    <p><strong>Capacity:</strong> ${station.capacity} docks</p>
                </div>
            `);

            vis.markerGroup.addLayer(marker);
        });
    }

    // Map MBTA line names to official brand colors
    getStyleForLine(lineName) {
        const lineColors = {
            'RED': '#DA291C',
            'GREEN': '#00843D',
            'BLUE': '#003DA5',
            'ORANGE': '#ED8B00',
            'SILVER': '#7C878E'
        };

        return lineColors[lineName] || '#333333';
    }
}
