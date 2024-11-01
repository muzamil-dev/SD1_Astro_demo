// src/utils/dataGenerator.js

// Generates random data for the heatmap
export function generateHeatmapData(points = 1000) {
  return Array.from({ length: points }, () => ({
    intensity: Math.floor(Math.random() * 255),
  }));
}

// Generates time-series data for the line graph
export function generateLineGraphData(points = 50) {
  const now = new Date();
  return Array.from({ length: points }, (_, i) => ({
    x: new Date(now.getTime() - i * 1000), // Each point is 1 second apart
    y: Math.floor(Math.random() * 100),
  })).reverse(); // Reverse to show the oldest first
}

// Generates bar chart data
export function generateBarChartData(bars = 10) {
  return Array.from({ length: bars }, (_, i) => ({
    label: `Category ${i + 1}`,
    value: Math.floor(Math.random() * 100),
  }));
}
