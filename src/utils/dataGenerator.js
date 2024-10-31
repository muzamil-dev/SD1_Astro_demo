// src/utils/dataGenerator.js
export function generateRandomData(points = 1000) {
    return Array.from({ length: points }, () => ({
      x: new Date().getTime() + Math.random() * 1000, // Random timestamp
      y: Math.random() * 100, // Random y-value for visualization
      intensity: Math.floor(Math.random() * 255) // Intensity for heatmap
    }));
  }
  