// src/components/LineGraph.jsx
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { generateLineGraphData } from '../utils/dataGenerator';

function LineGraph() {
  const [data, setData] = useState(generateLineGraphData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateLineGraphData()); // Refresh line graph data
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return <svg id="linegraph" width="500" height="150" className="bg-gray-100 border" />;
}

export default LineGraph;
