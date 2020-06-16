// Chart Params
var svgWidth = 700;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  function showByYear(id) {
    d3.json("data/user_year.json").then((data) => {

    var index = data.data;
    console.log(index);

    var result = metadata.filter(metadataObject => metadataObject.id == id)[0];
    var div = d3.select("#sample-metadata");
    div.html("");
    Object.entries(result).forEach(([key,value]) => {
      div.append("p").text(`${key} : ${value}`);

    });

  });
  }

// Import Data
var dataTest = d3.csv("data/satellite.csv")
  .then(function (satelliteData) {

    // count User and Purpose of each Satellite in orbit
    var countUser = {};
    var countPurpose = {};

    //parse date of launch each Satellite

    var parseDate = d3.timeParse("%m/%d/%Y");
    // var formatDate = d3.time.format("%Y");


    // Format the date into Year
    satelliteData.forEach(function (data) {

      var dateArr = data.launch_date.parseDate;
      var parts = data.launch_date.split('/');
      var date = new Date(parts[0]);
      var year = date.getFullYear();

      var userByYear = d3.nest()
        .key(function(d) { return d.launch_date; })
        .key(function(d) {return d.user;})
        .object(dataTest);
      // console.log(userByYear);


      // Format User datas
      var user = data.user;

      if (countUser[user] === undefined) {
        countUser[user] = 0;
      } else {
        countUser[user] = countUser[user] + 1;
      }

      var purpose = data.purpose;
      if (countPurpose[purpose] === undefined) {
        countPurpose[purpose] = 0;
      } else {
        countPurpose[purpose] = countPurpose[purpose] + 1;
      }
    });

    // now store the count in each data member
    var userData = [];
    var purposeData = [];

    Object.keys(countUser).forEach(function (key) {
      userData.push({
        user: key,
        count: countUser[key]
      });

      Object.keys(countPurpose).forEach(function (key) {
        purposeData.push({
          user: key,
          count: countPurpose[key]
        });

      });
      // console.log(countryData);
      // console.log(countCountry);
      // console.log(userData);
      // console.log(countUser);
      // console.log(purposeData);
      // console.log(countPurpose);

      //sort User of Satellites
      function sortProperties(obj) {
        // convert object into array
        var userSortable = [];
        for (var key in obj)
          if (obj.hasOwnProperty(key))
            userSortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
        userSortable.sort(function (a, b) {
          return b[1] - a[1]; // compare numbers
        });
        return userSortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
      }

      var sortedUsers = sortProperties(countUser);
      console.log(sortedUsers);

      //sort Purpose of Satellites
      function sortProperties(obj) {
        // convert object into array
        var purposeSortable = [];
        for (var key in obj)
          if (obj.hasOwnProperty(key))
            purposeSortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value descending
        purposeSortable.sort(function (a, b) {
          return b[1] - a[1]; // compare numbers
        });
        return purposeSortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
      }

      var sortedPurpose = sortProperties(countPurpose);
      console.log(sortedPurpose);

      // User array into Object with key value
      var userKey = Object.assign(sortedUsers.map(([key, val]) => ({ [key]: val })))

      console.log(userKey);

      // Purpose array into Object with key value
      var purposeKey = Object.assign(sortedPurpose.map(([key, val]) => ({ [key]: val })))

      console.log(purposeKey);


      var userArr = d3.map(satelliteData, function (d) {
        return d.user;
      }).keys();
      console.log(userArr);

      var filteredDate = d3.map(satelliteData, function (d) {
        var parts = d.launch_date.split('/');
        var date = new Date(parts[0]);
        var year = date.getFullYear();
        return year;
      }).keys();
      console.log(filteredDate);


      var newArray = [];
      for (var s = 0; s < userArr.length; s++) {
        var data = [];

        for (var i = 0; i < filteredDate.length; i++) {

          var count = 0;
          for (var j = 0; j < satelliteData.length; j++) {
            if (satelliteData[j][d.year] == filteredDate[i] && satelliteData[j][d.user] == userArr[s])
              count++;
          }

          var newData =  {'year': filteredDate[i], 'count': count};
          data.push(newData);
        }
        var newuser = {"user": userArr[s], "data": data}
        newArray.push(newuser);
      }
      console.log(newArray);

      // Create scaling functions
      var xTimeScale = d3.scaleTime()
        .domain(d3.extent(satelliteData, d => d.launch_date))
        .range([0, chartWidth]);

      var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

      // find the max of the User data
      var userMax = d3.max(satelliteData, d => d.user);

      // find the max of the Purpose data
      var purposeMax = d3.max(satelliteData, d => d.purpose);

      // Find the max y value
      var yMax = d3.max([userMax, purposeMax]);
      console.log(yMax);

      // Use the yMax value to set the yLinearScale domain
      yLinearScale.domain([0, yMax]);

      // Create y axis
      var leftAxis = d3.axisLeft(yLinearScale);

      // Create x axis
      var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));

      // Add y-axis
      chartGroup.append("g").call(leftAxis);

      // Step 9: Set up two line generators and append two SVG paths
      // ==============================================

      // Line generator for morning data
      var line1 = d3.line()
        .x(d => xTimeScale(d.year))
        .y(d => yLinearScale(d.user));

      // Line generator for evening data
      var line2 = d3.line()
        .x(d => xTimeScale(d.year))
        .y(d => yLinearScale(d.purpose));

      // Append a path for line1
      chartGroup
        .append("path")
        .attr("d", line1(satelliteData))
        .classed("line green", true);

      // Append a path for line2
      // NOTE; use alternative method: bind data to path element
      chartGroup
        .data([satelliteData])
        .append("path")
        .attr("d", line2)
        .classed("line orange", true);

    }).catch(function (error) {
      console.log(error);
    });
  });
