var myMap = L.map("map", {
  center: [40.7128, -74.0060],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAP_API_KEY
}).addTo(myMap);

var url = "https://www.n2yo.com/rest/v1/satellite/above/40.7128/-74.0060/33/70/50/&apiKey=BHN7RG-9DHD98-753M4B-4GYJ"

d3.json(url, function(response) {

  // Check data on console
  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].above;

    if (location) {
      L.marker([location.satlat, location.satlng]).addTo(myMap);
    }
  }

});
