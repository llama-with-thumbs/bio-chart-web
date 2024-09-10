import React, { useState, useEffect } from 'react';

// Function to draw a closed path in a 150px X 200px div, display the sample ID, and fill the shape
const PerimeterPath = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paths, setPaths] = useState([]);
  const [canvasId] = useState(`canvas-${Math.random().toString(36).substr(2, 9)}`); // Generate a unique canvas ID

  // Sort data by timestamp
  const sortedData = [...data].sort((a, b) => new Date(a.timestamp_str) - new Date(b.timestamp_str));

  const drawPath = (ctx, perimeterPath, sampleId) => {
    if (perimeterPath && perimeterPath.object_perimeter && ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous frame

      // Parse the object_perimeter from string to array
      const parsedPerimeter = JSON.parse(perimeterPath.object_perimeter);

      // Calculate the bounding box of the shape (min and max values for x and y)
      const xValues = parsedPerimeter.map(([x, y]) => x);
      const yValues = parsedPerimeter.map(([x, y]) => y);

      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // Calculate the center of the shape
      const shapeCenterX = (minX + maxX) / 2;
      const shapeCenterY = (minY + maxY) / 2;

      // Canvas center
      const canvasCenterX = 150 / 2; // Half of canvas width
      const canvasCenterY = 200 / 2; // Half of canvas height

      // Translation offsets to center the shape
      const offsetX = canvasCenterX - (shapeCenterX / 800) * 150;
      const offsetY = canvasCenterY - (shapeCenterY / 800) * 200;

      ctx.beginPath();
      parsedPerimeter.forEach(([x, y], index) => {
        const scaledX = (x / 800) * 150 + offsetX; // Scale and shift to center
        const scaledY = (y / 800) * 200 + offsetY; // Scale and shift to center

        if (index === 0) {
          ctx.moveTo(scaledX, scaledY);
        } else {
          ctx.lineTo(scaledX, scaledY);
        }
      });

      // Close the path to make it a closed perimeter
      ctx.closePath();

      // Fill the inside of the shape with pale green
      ctx.fillStyle = 'rgba(152, 251, 152, 0.5)'; // Pale green with 50% transparency
      ctx.fill();

      // Stroke the perimeter
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw the sample ID (starting from 0) on the canvas
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Frame ID: ${sampleId}`, 10, 20);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById(canvasId); // Use the dynamically generated canvasId
    const ctx = canvas.getContext('2d');
    
    // Set up a timeout-based animation loop (reduce to 10 FPS)
    const updatePath = () => {
      if (paths.length > 0 && paths[paths.length - 1].object_perimeter) {
        drawPath(ctx, paths[paths.length - 1], currentIndex - 1);
      }
      if (currentIndex < sortedData.length) {
        setPaths(prevPaths => [...prevPaths, sortedData[currentIndex]]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        setCurrentIndex(0);
        setPaths([]);
      }
    };

    const intervalId = setTimeout(updatePath, 100); // 100ms per frame (~10 FPS)

    // Cleanup interval on component unmount
    return () => clearTimeout(intervalId);
  }, [paths, currentIndex, sortedData, canvasId]);

  return (
    <div style={{ border: "1px solid #ccc", width: "150px", height: "200px", margin: "0 10px 0 0", borderRadius: "8px"}}>
      <canvas id={canvasId} width={150} height={200}></canvas> {/* Use the dynamically generated canvasId */}
    </div>
  );
};

export default PerimeterPath;
