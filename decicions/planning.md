# Mushroom Map

This text document is used for planning of the Mushroom Map project.
It contains important links and decicions.

# Planning

## Map view

- Displays potential mushroom spots
- Is pannaple and zoomable
- Limited for Tampere region?
- Has labels for different type of forests?

### Visualizations

- Hexagonal binning map
  Each mushroom type has a different color that is displayed in a map as Hexa.

- Choropleth map
- Heat map

** Is it possible to explore multiple mushroom types at the same time? **
Pros

- At the same time easier to view potential spots
- Difficult to implement than single view
  Cons
  ** What open data can I use for mapping of the potential spots? **
- User has to select and deselect for new mushroom types
- Potentially cluttered view
- More difficult to implement?

** How mushroom spots are displayed? **
Using Heatmap

Single Colored layer

** How the map view is filtered? **

### Interaction

- Slider for accuracy
- selector (Slider?) for seasons
-

### Tech

- leaflet.js
- React

# Links

Sienten kääntäminen: https://www.arktisetaromit.fi/fi/sienet/nimia+eri+kielilla/
For leaflet
https://neenapriyanka.medium.com/geospatial-data-visualization-b81f6e18f8fd

https://gis.stackexchange.com/questions/387406/parsing-geopackage-gpkg-file-in-javascript-into-array for using geopackage

** Data Loading **
Using wfs rest for leaflet
https://github.com/Flexberry/Leaflet-WFST#filter

using geopackage in leaflet
https://github.com/ngageoint/leaflet-geopackage
