// Chart Params
var svgWidth = 1200;
var svgHeight = 700;

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


  var parseTime = d3.timeParse("%Y");

// pull the data from json file

d3.json("data/purpose_year.json").then(function (purposeData) {

  purposeData.forEach(function (d) {

      d.year = parseTime(d.year);
      var year = +d.year;
      console.log(year);
      var communications = +d.communications;
      console.log(communications);
  });

  // / Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(purposeData, d => d.year))
    .range([0, chartWidth]);

  // NOTE: We define the y scale domain in the next step
  var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value

  // find the max of the communications data
  var commuicationsMax = d3.max(purposeData, d => d.communications);

  // find the max of the earth data
  var earthMax = d3.max(purposeData, d => d.earth_obsersations);

  // find the max of the gps data
  var gpsMax = d3.max(purposeData, d => d.gps);

  // find the max of the earth data
  var techMax = d3.max(purposeData, d => d.tech_dev);

  // Find the max y value
  var yMax = d3.max([commuicationsMax, earthMax, gpsMax, techMax]);
  console.log(yMax);

  // Alternative: using if else
  /*
  var yMax;
  if (morningMax > eveningMax) {
    yMax = morningMax;
  }
  else {
    yMax = eveningMax;
  }
  console.log(yMax);
  */

  // Alternative: using the Conditional (ternary) operator
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  //var yMax = morningMax > eveningMax ? morningMax : eveningMax;
  //console.log(yMax);

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================

  // Create y axis
  var leftAxis = d3.axisLeft(yLinearScale);

  // NOTES:
  // - d3.tickFormat to set the format of the x axis ticks
  // - d3.timeFormat converts a datetime object to a human-readable string
  // - doc: https://github.com/d3/d3-time-format

  // Create x axes with the same date format (as the data)
  //var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));

  // Alternative: Create x axes with a different date format
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));


  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.communications));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.earth_obsersations));

    var line3 = d3.line()
      .x(d => xTimeScale(d.year))
      .y(d => yLinearScale(d.gps));

      var line4 = d3.line()
        .x(d => xTimeScale(d.year))
        .y(d => yLinearScale(d.tech_dev));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(purposeData))
    .classed("line green", true);

  // Append a path for line2
  // NOTE; use alternative method: bind data to path element
  chartGroup
    .data([purposeData])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);

    chartGroup
      .data([purposeData])
      .append("path")
      .attr("d", line3)
      .classed("line blue", true);

      chartGroup
        .data([purposeData])
        .append("path")
        .attr("d", line4)
        .classed("line red", true);

}).catch(function(error) {
  console.log(error);
});
