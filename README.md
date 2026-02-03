# BLUEbikes - Interactive Bike Sharing Station Map

An interactive web visualization that maps all active BLUEbikes stations across the Greater Boston area. Built with Leaflet.js and D3.js, this application fetches real-time station data and overlays it with MBTA transit lines for comprehensive urban mobility context.

---

**Demo**: https://supergokou.github.io/BLUEbikes-Bike-Sharing-in-Boston/

The application displays:
- **400+ bike-sharing stations** with real-time data from the BLUEbikes GBFS API
- **MBTA transit lines** (Red, Green, Blue, Orange, Silver) for geographic context
- **Interactive popups** showing station name and dock capacity
- **Live station counter** that updates dynamically

---

## Features

| Feature | Description |
|---------|-------------|
| Real-time Data | Fetches live station information from BLUEbikes GBFS API |
| Interactive Map | Pan, zoom, and click markers to explore stations |
| Transit Overlay | Color-coded MBTA lines provide transit context |
| Station Popups | Click any marker to see station name and capacity |
| Responsive Layout | Bootstrap 5 grid adapts to different screen sizes |
| Live Counter | Header displays total number of active stations |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Leaflet | 1.7 | Interactive mapping and marker layers |
| D3.js | 7.x | Data loading and JSON parsing |
| Bootstrap | 5.1.3 | Responsive layout and typography |
| OpenStreetMap | - | Base map tiles |
| Google Fonts | Roboto | Primary typeface |

---

## Project Structure

```
BLUEbikes-Bike-Sharing-in-Boston/
|-- index.html              # Main entry point
|-- README.md               # Project documentation
|-- css/
|   |-- bootstrap.min.css   # Bootstrap framework
|   |-- leaflet.css         # Leaflet map styles
|   |-- style.css           # Custom styles
|-- js/
|   |-- leaflet.js          # Leaflet library (minified)
|   |-- stationMap.js       # StationMap visualization class
|   |-- main.js             # Data loading and initialization
|-- data/
|   |-- MBTA-Lines.json     # Boston transit line geometries (GeoJSON)
|-- img/
|   |-- marker-blue.png     # Station marker icons
|   |-- marker-shadow.png   # Marker drop shadows
|   |-- layers.png          # Layer control icons
|-- fonts/
    |-- FontAwesome.*       # Icon fonts
    |-- glyphicons-*        # Bootstrap glyphicons
```

---

## Data Sources

### BLUEbikes GBFS API (Real-time)
- **Endpoint**: `https://gbfs.bluebikes.com/gbfs/en/station_information.json`
- **Data**: Station name, capacity, latitude, longitude
- **Format**: JSON (GBFS 1.0 specification)

### MBTA Transit Lines (Static)
- **File**: `data/MBTA-Lines.json`
- **Data**: Transit line geometries for Red, Green, Blue, Orange, Silver lines
- **Format**: GeoJSON FeatureCollection

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BLUEbikes-Bike-Sharing-in-Boston.git
   cd BLUEbikes-Bike-Sharing-in-Boston
   ```

2. Serve the files using a local server (required for CORS):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using VS Code Live Server extension
   # Right-click index.html > Open with Live Server
   ```

3. Open `http://localhost:8000` in your browser.

---

## Architecture

### Data Flow

```
index.html
    |
    v
main.js
    |-- Fetches MBTA-Lines.json (static GeoJSON)
    |-- Fetches BLUEbikes API (real-time stations)
    |-- Transforms API response to displayData
    |-- Updates station counter in DOM
    |
    v
StationMap (stationMap.js)
    |-- initVis(): Initialize Leaflet map and tile layer
    |-- Renders MBTA transit lines with color coding
    |-- wrangleData(): Prepare station data
    |-- updateVis(): Render station markers with popups
```

### Key Components

**StationMap Class** (`stationMap.js`)
- Constructor accepts parent element, station data, map center, and MBTA lines
- `initVis()`: Initializes Leaflet map with OpenStreetMap tiles
- `wrangleData()`: Prepares data for visualization
- `updateVis()`: Renders markers and binds popup interactions
- `getStyleForLine()`: Returns color for each MBTA line

**Main Script** (`main.js`)
- Fetches data from multiple sources using Promise-based loading
- Transforms raw API response into structured display data
- Instantiates StationMap with processed data

---

## MBTA Line Colors

| Line | Color | Hex |
|------|-------|-----|
| Red Line | Red | `#DA291C` |
| Green Line | Green | `#00843D` |
| Blue Line | Blue | `#003DA5` |
| Orange Line | Orange | `#ED8B00` |
| Silver Line | Silver | `#7C878E` |

---

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## License

This project is part of CS 171 coursework. Data provided by BLUEbikes (Lyft) and MBTA.

---

## Acknowledgments

- [BLUEbikes](https://www.bluebikes.com/) for the open GBFS API
- [MBTA](https://www.mbta.com/) for transit line data
- [Leaflet](https://leafletjs.com/) for the mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) contributors for map tiles
