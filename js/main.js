// Variable for the visualization instance
let stationMap;

// BLUEbikes GBFS API endpoint
const BLUEBIKES_API_URL = 'https://gbfs.bluebikes.com/gbfs/en/station_information.json';
const MBTA_LINES_URL = 'data/MBTA-Lines.json';

// Boston city center coordinates
const BOSTON_CENTER = [42.360082, -71.058880];

// Show loading state
function showLoading(show) {
    const loadingEl = document.getElementById('loading-indicator');
    const mapEl = document.getElementById('station-map');
    if (loadingEl) {
        loadingEl.style.display = show ? 'flex' : 'none';
    }
    if (mapEl) {
        mapEl.style.opacity = show ? '0.5' : '1';
    }
}

// Display error message to user
function showError(message) {
    const countEl = document.getElementById('station-count');
    if (countEl) {
        countEl.innerText = 'Error';
    }
    const errorEl = document.getElementById('error-message');
    if (errorEl) {
        errorEl.innerText = message;
        errorEl.style.display = 'block';
    }
}

// Fetch station data directly (GBFS APIs support CORS)
async function fetchStationData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
}

// Initialize the application
async function init() {
    showLoading(true);

    try {
        // Fetch both data sources in parallel
        const [mbtaResponse, stationResponse] = await Promise.all([
            d3.json(MBTA_LINES_URL),
            fetchStationData(BLUEBIKES_API_URL)
        ]);

        // Process station data
        const displayData = processStationData(stationResponse);

        // Update station count in DOM
        document.getElementById('station-count').innerText = displayData.length;

        // Instantiate visualization
        stationMap = new StationMap('station-map', displayData, BOSTON_CENTER, mbtaResponse);

    } catch (error) {
        showError('Failed to load data. Please refresh the page.');
    } finally {
        showLoading(false);
    }
}

// Transform raw API response into display-ready format
function processStationData(data) {
    const stations = data.data.stations;

    return stations.map(station => ({
        name: station.name,
        capacity: station.capacity,
        latitude: station.lat,
        longitude: station.lon
    }));
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
