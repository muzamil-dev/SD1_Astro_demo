// src/components/Heatmap.jsx
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { generateHeatmapData } from '../utils/dataGenerator';

function Heatmap() {
  const [data, setData] = useState(generateHeatmapData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateHeatmapData()); // Refresh heatmap data
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const svg = d3.select("#heatmap");
    svg.selectAll("*").remove();

    data.forEach((d, i) => {
      svg.append("rect")
        .attr("x", (i % 50) * 10) // 10px grid
        .attr("y", Math.floor(i / 50) * 10)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", `rgb(${d.intensity}, 0, 150)`);
    });
  }, [data]);

  return <svg id="heatmap" width="500" height="300" className="bg-gray-100 border" />;
}

export default Heatmap;
