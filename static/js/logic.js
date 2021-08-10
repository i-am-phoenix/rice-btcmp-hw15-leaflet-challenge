// Sourcing data from USGS
usgs_url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Set up map object
var myMap = L.map("map", {
    center: [37.773972, -122.431297], // San Francisco, Ca :)
    zoom: 5
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
    var dmin = 0 
    var dmax = 0
    //cycling through features
    for (i=1; i < data.features.length; i++) {

        // extracting data for magnitude and depth of the recordered earthquake
        var mag = data.features[i].properties.mag
        // depth of the earth can be found as the third coordinate for each earthquake.
        var d   = data.features[i].geometry.coordinates[2]
        
        // find out max depth recorded
        if (d < dmin) {
            dmin = d
        } 
        else if (d > dmax) {
            dmax = d
        }

        // create a marker/circle for the processed data point
        var lat = data.features[i].geometry.coordinates[1] // y
        var lon = data.features[i].geometry.coordinates[0] // x
        L.circle([lat, lon],{
            radius: (mag)*25000,
            color: "grey",
            weight: 0.5,
            fillColor: getColor4Marker(d),
            fillOpacity: 0.7
        }).bindPopup(`<strong>Magnitude &emsp;</strong> ${mag}<br><strong>Depth &emsp;</strong>${d}`).addTo(myMap);
    };
    console.log(`d [${dmin};${dmax}]`) 

    // Adding legend to the plot, to be located in the bottom right corner of the map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Depth</strong>'],
    categories = ['<10','10 - 30','30 - 50','50 - 70','70 - 90', '90+'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i id="square" style="background:' + getColor4Legend(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(myMap);
});


// --------------------------------------------- FUNCTIONS -----------------------------------------------------------------
// Creating function to output color value based on depth range
function getColor4Marker(d) {
    var c;
    if (d<10) { 
        c = "#a4f600"; 
    }
    else if (d<30) { c = "#dcf400" }
    else if (d<50) {c = "#f7db11"}
    else if (d<70) {c = "#fdb72a"}
    else if (d<90) {c = "#fca05d"}
    else {c = "#ff6167"}
    return c;
}
function getColor4Legend(d) {
    var c;
    if (d == "<10") { 
        c = "#a4f600"; 
    }
    else if (d == "10 - 30") { c = "#dcf400" }
    else if (d == '30 - 50') {c = "#f7db11"}
    else if (d == '50 - 70') {c = "#fdb72a"}
    else if (d == '70 - 90') {c = "#fca05d"}
    else {c = "#ff6167"}
    return c;
}



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


   
  