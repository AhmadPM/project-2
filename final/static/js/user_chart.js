function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("#user_chart").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // Define SVG area dimensions
  var svgWidth = parseInt(d3.select("#line2").style("width"));
  var svgHeight = svgWidth - svgWidth / 2.5;


  var margin = { top: 20, right: 40, bottom: 100, left: 100 };

  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3
    .select("#user_chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  var parseTime = d3.timeParse("%Y");

  // pull the data from json file

  d3.json("static/data/user_year.json").then(function (userData) {

    userData.forEach(function (d) {

      d.year = parseTime(d.year);
      var year = +d.year;
    //  console.log(year);

    });

    // / Step 5: Create the scales for the chart
    // =================================
    var xTimeScale = d3.scaleTime()
      .domain(d3.extent(userData, d => d.year))
      .range([0, chartWidth]);

    // NOTE: We define the y scale domain in the next step
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

    // Step 6: Set up the y-axis domain
    // ==============================================
    // @NEW! determine the max y value

    // find the max of the communications data
    var commercialMax = d3.max(userData, d => d.commercial);

    // find the max of the earth data
    var governmentMax = d3.max(userData, d => d.government);

    // find the max of the gps data
    var militaryMax = d3.max(userData, d => d.military);

    // find the max of the earth data
    var civilMax = d3.max(userData, d => d.civil);

    // Find the max y value
    var yMax = d3.max([commercialMax, governmentMax,
      militaryMax, civilMax]);
    console.log(yMax);


    // Use the yMax value to set the yLinearScale domain
    yLinearScale.domain([0, yMax]);


    // Step 7: Create the axes
    // =================================

    // Create y axis
    var leftAxis = d3.axisLeft(yLinearScale);


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
      .y(d => yLinearScale(d.commercial));

    // Line generator for evening data
    var line2 = d3.line()
      .x(d => xTimeScale(d.year))
      .y(d => yLinearScale(d.government));

    var line3 = d3.line()
      .x(d => xTimeScale(d.year))
      .y(d => yLinearScale(d.military));

    var line4 = d3.line()
      .x(d => xTimeScale(d.year))
      .y(d => yLinearScale(d.civil));

    // Append a path for line1
    chartGroup
      .append("path")
      .attr("d", line1(userData))
      .classed("line green", true);

    // Append a path for line2
    // NOTE; use alternative method: bind data to path element
    chartGroup
      .data([userData])
      .append("path")
      .attr("d", line2)
      .classed("line blue", true);

    chartGroup
      .data([userData])
      .append("path")
      .attr("d", line3)
      .classed("line orange", true);

    chartGroup
      .data([userData])
      .append("path")
      .attr("d", line4)
      .classed("line red", true);

    var legendLeft = 0;

    chartGroup.append("circle").attr("cx", legendLeft + 20).attr("cy", chartHeight + 50).attr("r", 6).style("fill", "green")
    chartGroup.append("circle").attr("cx", 200 + legendLeft).attr("cy", chartHeight + 50).attr("r", 6).style("fill", "blue")
    chartGroup.append("circle").attr("cx", 370 + legendLeft).attr("cy", chartHeight + 50).attr("r", 6).style("fill", "orange")
    chartGroup.append("circle").attr("cx", 500 + legendLeft).attr("cy", chartHeight + 50).attr("r", 6).style("fill", "red")
    chartGroup.append("text").attr("x", 40 + legendLeft).attr("y", chartHeight + 50).text("Commercial").style("font-size", "15px").attr("alignment-baseline", "middle")
    chartGroup.append("text").attr("x", 220 + legendLeft).attr("y", chartHeight + 50).text("Government").style("font-size", "15px").attr("alignment-baseline", "middle")
    chartGroup.append("text").attr("x", 390 + legendLeft).attr("y", chartHeight + 50).text("Military").style("font-size", "15px").attr("alignment-baseline", "middle")
    chartGroup.append("text").attr("x", 520 + legendLeft).attr("y", chartHeight + 50).text("Civil").style("font-size", "15px").attr("alignment-baseline", "middle")


    // Create axes labels
    chartGroup.append("text")
      // NOTE: Rotated Y axis label
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", -100 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Satellite Launches");



  }).catch(function (error) {
    console.log(error);
  });
}
makeResponsive();
