// src/components/IntensiveDashboard.jsx
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { generateRandomData } from '../utils/dataGenerator';

function IntensiveDashboard() {
  const [data, setData] = useState(generateRandomData());

  // Update data at frequent intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData(1000)); // Generate 1,000 data points every 500ms
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Heatmap rendering
  useEffect(() => {
    const svg = d3.select("#heatmap");
    svg.selectAll("*").remove();
    
    data.forEach((d, i) => {
      svg.append("rect")
        .attr("x", i % 50 * 10) // Layout data into grid
        .attr("y", Math.floor(i / 50) * 10)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", `rgb(${d.intensity}, 0, 150)`);
    });
  }, [data]);

  // Line graph rendering
  useEffect(() => {
    const svg = d3.select("#linegraph");
    svg.selectAll("*").remove();

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.x))
      .range([0, 500]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([150, 0]);

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", line);
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold my-4">Intensive Data Visualization Dashboard</h2>
      <div className="flex flex-row space-x-4">
        {/* Heatmap */}
        <svg id="heatmap" width="500" height="300" className="bg-gray-100 border"></svg>
        {/* Line Graph */}
        <svg id="linegraph" width="500" height="150" className="bg-gray-100 border"></svg>
      </div>
    </div>
  );
}

export default IntensiveDashboard;
