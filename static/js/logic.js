// Sourcing data from USGS
usgs_url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Set up map object
var myMap = L.map("map", {
    center: [29.749907, -95.358421], // Houston :)
    zoom:5
    }
)

// Create the tile layer that will be the background of our map and add to myMap
var bgLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    }
).addTo(myMap);

// Read in geojson info
d3.json(usgs_url).then(data => {
    
    console.log(data)
    
    //cycling through features
    for (i=1; i < data.features.length; i++) {

        // extracting data for magnitude and depth of the recordered earthquake
        var mag = data.features[i].properties.mag
        var d   = data.features[i].geometry.coordinates[2]
        console.log(`Q ${i}\tmag = ${mag}\td = ${d}`)
    }; 
});


// function creteMarker(data) {
//     // extracting data for magnitude and depth of the recordered earthquake
//     var mag = data.features[i].properties.mag
//     var d   = data.features[i].geometry.coordinates[2]

//     // console.log(`Q ${i}\tmag = ${mag[i]}\td = ${d[i]}`)

// }


// ----------------------------------------------- FILTER/CONTROL SETUP ---------------------------------------------
// Set up basemap variable
var baseMap = {
    "Deafault" : bgLayer
}

L.control.layers(baseMap).addTo(myMap)


   
  