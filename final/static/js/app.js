

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("#bar_chart").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }


  // Define SVG area dimensions
  var svgWidth = parseInt(d3.select("#bar_chart").style("width"));
  var svgHeight = svgWidth - svgWidth / 2.5;


  // Define the chart's margins as an object
  var chartMargin = {
    top: 15,
    right: 25,
    bottom: 75,
    left: 100
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

  // Select body, append SVG area to it, and set the dimensions
  var svg = d3.select("#bar_chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("class", "chart");

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  d3.csv("static/data/satellite.csv")
    .then(function (satelliteData) {

      var countCountry = {};

      // count how many Satellites each Country currently in orbit
      satelliteData.forEach(function (d) {
        var country = d.country_of_owner;
        if (countCountry[country] === undefined) {
          countCountry[country] = 0;
        } else {
          countCountry[country] = countCountry[country] + 1;
        }
      });

      // now store the count in each Country
      var countryData = [];
      Object.keys(countCountry).forEach(function (key) {
        countryData.push({
          country_of_owner: key,
          count: countCountry[key]
        });

      });
      // console.log(countryData);
      // console.log(countCountry);

      //sort function for Country satellite count
      function sortProperties(obj) {
        // convert object into array
        var countrySortable = [];
        for (var key in obj)
          if (obj.hasOwnProperty(key))
            countrySortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort by Country count descending
        countrySortable.sort(function (a, b) {
          return b[1] - a[1]; // compare numbers
        });
        return countrySortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
      }

      var sortedCountries = sortProperties(countCountry);
      //console.log(sortedCountries);

      var countryKey = Object.assign(sortedCountries.map(([key, val]) => ({ [key]: val })))

      //console.log(countryKey);

      //Trying to filter Top 20 Countries
      var sliced = countryKey.slice(0, 21);
      //console.log(sliced);


      var top20 = sliced.map(data => d3.map(data).entries());
    //  console.log(top20);

      //Configure a band scale for the horizontal axis with a padding of 0.1 (10%)

      var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(top20, d => d[0].value) + 30])
        .range([0, chartWidth]);
      // console.log(xLinearScale);
      // Create a linear scale for the vertical axis.
      // NOTE: d3.max(tvData, d => d.hours) = d3.max(tvData.map(d => d.hours))
      var test = top20.map(d => d[0].key);
    //  console.log(test);
      var yScaleBand = d3.scaleBand()
        .domain(top20.map(d => d[0].key))
        .range([0, chartHeight])
        .padding(0.2); // reversed range

      // Create two new functions passing our scales in as arguments
      // These will be used to create the chart's axes
      // NOTE: ticks() defines the number of ticks on the axis.
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yScaleBand)

      // Append two SVG group elements to the chartGroup area,
      // and create the bottom and left axes inside of them
      chartGroup.append("g")
        .call(leftAxis);

      chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

      // Create one SVG rectangle per piece of tvData
      // Use the linear and band scales to position each rectangle within the chart
      var bars = chartGroup.selectAll(".bar")
        .data(top20)
        .enter()
        .append("g");

      bars.append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScaleBand(d[0].key))
        .attr("width", d => xLinearScale(d[0].value))
        .attr("height", yScaleBand.bandwidth())
        .attr("class", d => d[0].key.replace(" ", ""));

      //add a value label to the right of each bar
      bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", d => yScaleBand(d[0].key) + 16)
        .attr("x", d => xLinearScale(d[0].value) + 5)
        .text(d => (d[0].value));

      chartGroup.attr("class", "xtext");
      var xtext = d3.select(".xtext");
      // Append axes titles
      xtext.append("text")
        .attr("y", -20)
        .attr("class", "axisText")
        .attr("transform",
          `translate(${chartWidth / 3}, ${chartHeight + chartMargin.top + 60})`)
        .text("Number of Satellites in Atomsphere/Space");

    }).catch(function (error) {
    //  console.log(error);
    });
