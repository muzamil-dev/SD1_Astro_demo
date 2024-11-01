// src/components/BarChart.jsx
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { generateBarChartData } from '../utils/dataGenerator';

function BarChart() {
  const [data, setData] = useState(generateBarChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateBarChartData()); // Refresh bar chart data
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const svg = d3.select("#barchart");
    svg.selectAll("*").remove();

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, 500])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([200, 0]);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.label))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => 200 - yScale(d.value))
      .attr("fill", "teal");
  }, [data]);

  return <svg id="barchart" width="500" height="200" className="bg-gray-100 border" />;
}

export default BarChart;
