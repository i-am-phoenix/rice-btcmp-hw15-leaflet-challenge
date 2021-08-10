// Sourcing data from USGS
usgs_url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Set up map object
var myMap = L.map("myMap", {
    center: [29.749907, -95.358421], // Houston :)
    zoom: 16
    }
)


// Create the tile layer that will be the background of our map.
var bgLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    }
);


// Set up basemap variable
var baseMap = {
    "Deafault" : bgLayer
}



   
  