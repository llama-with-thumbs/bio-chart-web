import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Function to smooth the area data over a moving average window
const calculateMovingAverage = (data, windowSize) => {
  const smoothedData = [];

  for (let i = 0; i < data.length; i++) {
    let sumArea = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize); j <= i; j++) {
      sumArea += data[j].object_area;
      count++;
    }

    smoothedData.push({
      ...data[i],
      object_area: (sumArea / count).toFixed(2),
    });
  }

  return smoothedData;
};

// Custom tooltip for displaying time and area information
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedDate = new Date(label).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: '2px',
        margin: "0, 5px",
        padding: "0, 5px",
        lineHeight: "0.2"
      }}>
        <p>{`Timestamp: ${formattedDate}`}</p>
        <p>{`Object Area: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const AreaChart = ({ data }) => {
  // Sort data by timestamp
  const sortedData = [...data].sort((a, b) => new Date(a.timestamp_str) - new Date(b.timestamp_str));

  // Smooth data using a moving average with a window size of 5
  const smoothedData = calculateMovingAverage(sortedData, 5);

  return (
    <div
      className="chart-box"
      style={{
        border: "1px solid #ccc",
        borderRadius: '8px',
        margin: "10px",
        padding: "0 10px"
      }}
    >
      <LineChart width={400} height={200} data={smoothedData}>
        <XAxis
          dataKey="timestamp_str"
          tickFormatter={(timestamp) => {
            const formattedDate = new Date(timestamp).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return formattedDate;
          }}
        />
        <YAxis domain={['auto', 'auto']} label={{ value: 'Area', angle: -90, position: 'insideLeft' }} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="object_area"
          name="Object Area"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default AreaChart;
