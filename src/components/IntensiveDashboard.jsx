// src/components/IntensiveDashboard.jsx
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { generateHeatmapData, generateLineGraphData, generateBarChartData } from '../utils/dataGenerator';
import '../styles/tailwind.css';

function IntensiveDashboard() {
  // State for each chart type
  const [heatmapData, setHeatmapData] = useState(generateHeatmapData());
  const [lineGraphData, setLineGraphData] = useState(generateLineGraphData());
  const [barChartData, setBarChartData] = useState(generateBarChartData());

  // Update each dataset at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData());
      setLineGraphData(generateLineGraphData());
      setBarChartData(generateBarChartData());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Heatmap rendering
  useEffect(() => {
    const svg = d3.select("#heatmap");
    svg.selectAll("*").remove();
    
    heatmapData.forEach((d, i) => {
      svg.append("rect")
        .attr("x", (i % 50) * 10)
        .attr("y", Math.floor(i / 50) * 10)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", `rgb(${d.intensity}, 0, 150)`);
    });
  }, [heatmapData]);

  // Line graph rendering
  useEffect(() => {
    const svg = d3.select("#linegraph");
    svg.selectAll("*").remove();

    const xScale = d3.scaleTime()
      .domain(d3.extent(lineGraphData, d => d.x))
      .range([0, 500]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([150, 0]);

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    svg.append("path")
      .datum(lineGraphData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", line);
  }, [lineGraphData]);

  // Bar chart rendering
  useEffect(() => {
    const svg = d3.select("#barchart");
    svg.selectAll("*").remove();

    const xScale = d3.scaleBand()
      .domain(barChartData.map(d => d.label))
      .range([0, 500])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([150, 0]);

    svg.selectAll("rect")
      .data(barChartData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.label))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => 150 - yScale(d.value))
      .attr("fill", "teal");
  }, [barChartData]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold my-4">Intensive Data Visualization Dashboard</h2>
      <div className="flex flex-row space-x-4">
        <svg id="heatmap" width="500" height="300" className="bg-gray-100 border"></svg>
        <svg id="linegraph" width="500" height="150" className="bg-gray-100 border"></svg>
        <svg id="barchart" width="500" height="150" className="bg-gray-100 border"></svg>
      </div>
    </div>
  );
}

export default IntensiveDashboard;
