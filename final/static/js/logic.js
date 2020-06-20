// Creating map object


var myMap = L.map("map", {
  center: [40.7128, - 74.0060],
  zoom: 5
});

// Adding tile layer
L.tileLayer(MAP_URL, {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: 'mapbox/light-v10',
  accessToken: API_KEY
}).addTo(myMap);

var myIcon = L.icon({
    iconUrl: '2.png',
    iconSize: [56, 44]

});

  const url = "https://www.n2yo.com/rest/v1/satellite/above/40.712/- 74.006/0/15/0/&apiKey=89JM8P-7EKT97-MQ65JT-4GYK"
  async function getSat() {
    const response = await fetch(url);
    const data = await response.json();
    var above = data.above;
  //  console.log(above);
    for (var i = 0; i < above.length; i++) {
          L.marker([above[i].satlat,above[i].satlng],{icon:myIcon}).bindPopup("<h3>Name:</h3>" + above[i].satname + "<h3>Launch Date:</h3>" + above[i].launchDate).addTo(myMap);}

};

getSat()




//MAP2

var myMap2 = L.map("map2", {
  center: [33.024200, -40.191788],
  zoom: 2
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap2);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(count) {
  return 35000 + count*300;
  //return population / 40;
}

var satellites = [
  {  CountryName  :  'United States'  ,  count  :1305,  Location:[38.883333,-77.0 ] },
  {  CountryName  :  'European Space Agency'  ,  count  :53,  Location:[47.217729, -1.556136 ] },
  {  CountryName  :  'China'  ,  count  :349,  Location:[39.91666667,116.38333300000001  ]},
  {  CountryName  :  'Russia'  ,  count  :166,  Location:[55.75,37.6 ] },
  {  CountryName  :  'United Kingdom'  ,  count  :130, Location:[51.5,-0.083333 ] },
  {  CountryName  :  'Japan' ,  count  :78,  Location  :  [35.68333333,139.75 ] },
  {  CountryName  :  'India'  ,  count  :58,  Location  :  [28.6,77.2 ] },
  {  CountryName  :  'Canada'  ,  count  :39,  Location  :  [45.41666667,-75.7 ] },
  {  CountryName  :  'Germany'  ,  count  :37,  Location  :  [52.51666667,13.4  ]},
  {  CountryName  :  'Luxembourg'  ,  count  :32,  Location  :  [49.6,6.116667 ] },
  {  CountryName  :  'Spain'  ,  count  :21,  Location  :  [40.4,-3.683333 ] },
  {  CountryName  :  'Argentina'  ,  count  :16,  Location  :  [-34.58333333,-58.666667000000004 ] },
  {  CountryName  :  'South Korea'  ,  count  :16,  Location  :  [37.55,126.983333  ]},
  {  CountryName  :  'Israel'  ,  count  :15,  Location  :  [31.76666667,35.233333 ] },
  {  CountryName  :  'Saudi Arabia'  ,  count  :13,  Location  :  [24.65,46.7 ]},
  {  CountryName  :  'France'  ,  count  :12,  Location  :  [48.86666667,2.333333  ]},
  {  CountryName  :  'Australia'  ,  count  :12,  Location  :  [-35.26666667,149.133333 ] },
  {  CountryName  :  'Italy'  ,  count  :12,  Location  :  [41.9,12.483333  ]},
  {  CountryName  :  'Netherlands'  ,  count  :12,  Location  :  [52.35,4.9166669999999995]  },
  {  CountryName  :  'Brazil'  ,  count  :11,  Location  :  [-15.78333333,-47.916667 ] },
  {  CountryName  :  'Indonesia'  ,  count  :9,  Location  :  [-6.166666667,106.816667 ] },
  {  CountryName  :  'Singapore'  ,  count  :8,  Location  :  [1.283333333,103.85  ]},
  {  CountryName  :  'United Arab Emirates'  ,  count  :8,  Location  :  [24.46666667,54.36666700000001]  },
  {  CountryName  :  'Kazakhstan'  ,  count  :7,  Location  :  [51.16666667,71.416667 ] },
  {  CountryName  :  'Norway'  ,  count  :7,  Location  :  [59.91666667,10.75] },
  {  CountryName  :  'Turkey'  ,  count  :7,  Location  :  [39.93333333,32.866667 ] },
  {  CountryName  :  'Finland'  ,  count  :6,  Location  :  [60.16666667,24.933332999999998 ] },
  {  CountryName  :  'South Africa'  ,  count  :5,  Location  :  [-25.7,28.216666999999998 ] },
  {  CountryName  :  'Denmark' ,  count  :5,  Location  :  [55.66666667,12.583333 ] },
  {  CountryName  :  'Algeria' ,  count  :5,  Location  :  [36.75,3.05]},
  {  CountryName  :  'Malaysia'  ,  count  :5,  Location  :  [3.166666667,101.7]},
  {  CountryName  :  'Thailand'  ,  count  :5,  Location  :  [13.75,100.516667]},
  {  CountryName  :  'Mexico'  ,  count  :4,  Location  :  [19.43333333,-99.133333]},
  {  CountryName  :  'Switzerland'  ,  count  :4,  Location  :  [46.91666667,7.466667]},
  {  CountryName  :  'Vietnam'  ,  count  :4,  Location  : [21.03333333,105.85 ]},
  {  CountryName  :  'Nigeria'  ,  count  :3,  Location  :  [9.083333332999999,7.533333]},
  {  CountryName  :  'Pakistan'  ,  count  :3,  Location  :  [33.68333333,73.05]},
  {  CountryName  :  'Egypt'  ,  count  :3,  Location  :  [30.05,31.25]},
  {  CountryName  :  'Czech Republic'  ,  count  :3,  Location  :  [50.08333333,14.466667000000001]},
  {  CountryName  :  'Greece'  ,  count  :2,  Location  :  [37.98333333,23.733333 ]},
  {  CountryName  :  'Morocco'  ,  count  :2,  Location  :  [34.01666667,-6.816667]},
  {  CountryName  :  'Belarus'  ,  count  :2,  Location  :  [53.9,27.566667]},
  {  CountryName  :  'Lithuania'  ,  count  :2,  Location  :  [54.68333333,25.316667000000002]},
  {  CountryName  :  'Poland'  ,  count  :2,  Location  :  [52.25,21.0]},
  {  CountryName  :  'Azerbaijan'  ,  count  :2,  Location  :  [40.38333333,49.866667 ]},
  {  CountryName  :  'Venezuela'  ,  count  :2,  Location  :  [10.48333333,-66.866667]},
  {  CountryName  :  'Philippines'  ,  count  :2,  Location  :  [14.6,120.96666699999999]},
  {  CountryName  :  'Sweden'  ,  count  :2,  Location  :  [59.33333333,18.05]},
  {  CountryName  :  'Hungary'  ,  count  :2,  Location  :  [47.5,19.083333]},
  {  CountryName  :  'Latvia'  ,  count  :1,  Location  :  [56.95,24.1]},
  {  CountryName  :  'Belgium'  ,  count  :1,  Location  :  [50.83333333,4.3333330000000005]},
  {  CountryName  :  'Bulgaria'  ,  count  :1,  Location  :  [42.68333333,23.316667000000002]},
  {  CountryName  :  'Chile'  ,  count  :1,  Location  :  [-33.45,-70.666667]},
  {  CountryName  :  'Austria'  ,  count  :1,  Location  :  [48.2,16.366667]},
  {  CountryName  :  'Nepal'  ,  count  :1,  Location  :  [27.71666667,85.31666700000001]},
  {  CountryName  :  'Peru'  ,  count  :1,  Location  :  [-12.05,-77.05]},
  {  CountryName  :  'Sudan'  ,  count  :1,  Location  :  [15.6,32.533333 ]},
  {  CountryName  :  'Iraq'  ,  count  :1,  Location  :  [33.33333333,44.4]},
  {  CountryName  :  'Qatar'  ,  count  :1,  Location  :  [25.28333333,51.533333]},
  {  CountryName  :  'Taiwan'  ,  count  :1,  Location  :  [25.03333333,121.516667]},
  {  CountryName  :  'Laos'  ,  count  :1,  Location  :  [17.96666667,102.6]},
  {  CountryName  :  'Ethiopia'  ,  count  :1,  Location  :  [9.033333333,38.7]},
  {  CountryName  :  'Sri Lanka'  ,  count  :1,  Location  :  [6.916666667,79.833333]},
  {  CountryName  :  'Ukraine'  ,  count  :1,  Location  :  [50.43333333,30.516666999999998]},
  {  CountryName  :  'Bolivia'  ,  count  :1,  Location  :  [-16.5,-68.15]},
  {  CountryName  :  'Colombia'  ,  count  :1,  Location  :  [4.6,-74.083333]},
  {  CountryName  :  'Jordan'  ,  count  :1,  Location  :  [31.95,35.933333000000005]},
  {  CountryName  :  'Iran'  ,  count  :1,  Location  :  [35.7,51.416667]},
  {  CountryName  :  'Bhutan'  ,  count  :1,  Location  :  [27.46666667,89.633333]},
  {  CountryName  :  'Bangladesh'  ,  count  :1,  Location  :  [23.71666667,90.4]},
  {  CountryName  :  'Ecuador'  ,  count  :1,  Location  :  [-0.21666666699999998,-78.5]}
];
// Loop through the satellites array and create one marker for each city object
for (var i = 0; i < satellites.length; i++) {
  L.circle(satellites[i].Location, {
    fillOpacity: 0.75,
    color: "#1E90FF",
    fillColor: "white",

    radius: markerSize(satellites[i].count)
  }).bindPopup("<h1>" + satellites[i].CountryName + "</h1>   <hr> <h3>Number of active satellites: " + satellites[i].count + "</h3>").addTo(myMap2);
}




///////
