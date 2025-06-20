# 🌍 Wealth & Health of Nations

Interactive D3.js scatter-plot that shows life-expectancy (health) versus income
(wealth) for every country over time. A year slider animates the chart so users
can observe global trends and regional differences from 1800 up to the present.

> Based on Hans Rosling’s celebrated “Gapminder” visualisation.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| Animated year slider | Drag or play to watch the points move through time |
| Bubble size | Proportional to population |
| Bubble colour | Encodes world region |
| Tooltip | Hover to view country name and exact values |
| Responsive layout | SVG scales to fit any viewport width (Bootstrap grid) |

---

## Tech stack

| Library / Tool | Purpose |
|----------------|---------|
| **D3.js v7**   | SVG rendering, scales, axes, transitions |
| **Bootstrap 5.1** | Responsive container & quick spacing |
| **CSV / JSON** | Gapminder-style time-series dataset |

---

## File structure


		├── index.html # main page 

		├── css/
		│ └── style.css # custom colours & tooltip styles
		├── js/
		│ ├── main.js # loads data & draws scatter-plot
		│ └── slider.js # (optional) reusable year-slider component
		└── data/
		└── wealth-health-gdp-lifeexp.csv
		
		