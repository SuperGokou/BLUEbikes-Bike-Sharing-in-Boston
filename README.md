# 🚲 BLUEbikes – Interactive Station Map  
CS 171 • Lab 12

An interactive leaflet.js map that plots every active **BLUEbikes** station in
the Greater-Boston area.  Hover to see the station name; the headline keeps an
up-to-date count of total stations.:contentReference[oaicite:0]{index=0}

---

## ✨ Features
| Feature | Description |
|---------|-------------|
| **Leaflet map** | Open-Street-Map tiles served via Leaflet 1.7 |
| Dynamic station layer | Circles sized by dock capacity, coloured Boston-blue |
| Station tooltip | Shows the full station name on hover |
| Live counter | `<span id="station-count">` auto-updates with dataset size |

---

## Tech stack
| Library | Role |
|---------|------|
| **Leaflet 1.7** | Slippy map & marker layer |
| **D3.js v7**   | CSV/JSON loading & data binding |
| **Bootstrap 5.1** | Responsive layout & typography |
| **Google Fonts – Roboto** | Primary typeface |

---

## File structure

		├── index.html # main page (map placeholder + headline)
		├── css/
		│ ├── leaflet.css # default leaflet styles
		│ └── style.css # lab-specific overrides
		├── js/
		│ ├── leaflet.js # minified Leaflet library
		│ ├── stationMap.js # class that builds the leaflet layer
		│ └── main.js # loads data & instantiates StationMap
		└── data/
		└── bluebikes_stations.json
		

*(Folder names may vary slightly – update if you moved assets.)*

		