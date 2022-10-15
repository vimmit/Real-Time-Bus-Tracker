 // TODO: add your own access token
 mapboxgl.accessToken =
 'Copy your mapgl access token here';

 
 // create the map object using mapboxgl.map() function
 let map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [-71.104081, 42.365554],
   zoom: 14,
 });

async function moveBus(){ 
  const buses = await getBusLocations();

  buses.forEach (bus => {
      const busMarker = getMarker(bus.id);        
          if (busMarker){
              const marker = Object.values(busMarker)[0];
              moveMarker(marker, bus);
          } 
          else {    
              addMarker(bus, bus.id);
          }    
  });     
  setTimeout(moveBus, 12000); //update rate every 12 seconds, don't call too often to avoid getting banned.
}

 
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// add markers with pop ups showing details of the bus.
let markers = [];
function addMarker(bus, id) {
   const marker = new mapboxgl.Marker()
       .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 35 })
        .setHTML('<ul><li>ID: ' + bus.attributes.label + '</li><li>Bearing: ' + bus.attributes.bearing + '</li><li>Status: ' + (bus.attributes.current_status) + '</li><li>Speed: '+(bus.attributes.speed) + '</li></ul>'))
       .addTo(map);
   const mLayer = {};
   mLayer.marker = marker;
   mLayer.id = id;
   markers.push(mLayer);   
}

// Move Bus Marker by changing the latitude and longitude values.
function moveMarker(marker, bus) {
   marker.setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
}

// Get Bus Id
function getMarker(busId) {
   const playerID = markers.find(item => 
       item.id === busId
   );
return playerID;
}
  
  // Do not edit code past this point
  if (typeof module !== 'undefined') {
    module.exports = { move, counter, marker, busStops };
  }
  