// make an object for map styles
const palette = {
    'dark': { 'mapStyle': 'mapbox://styles/sghan/ck1ljdcmy16fc1cpg0f4qh3wu'},
    'light':{'mapStyle':'mapbox://styles/sghan/ck35793ez3b7q1dpmdl5ek4g2',
    }};

// import mapboxgl to div container
let map = new mapboxgl.Map({
    container: 'map',
    style: palette['dark']['mapStyle'],
    center: [-74.070000, 40.722535],
    zoom: 12
});

// add a controller (zoom and direction)
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// set variables for file addresses
const url511 = 'data/511_aggregated_crashes.geojson';

map.on('load', function () {

    // get source from url
    window.setInterval(function() {
        map.getSource('511').setData(url511);
    }, 2000);

    // add sources to the Map
    map.addSource('511', { type: 'geojson', data:url511, 'generateId': false});

    // add a layer and set properties
    map.addLayer({
        "id": "511",
        "source": "511",
        "type": "line",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": ['get', 'color_crash'],
            "line-width": 2,
        }
    });
});
