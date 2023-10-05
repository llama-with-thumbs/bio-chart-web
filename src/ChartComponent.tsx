import React from 'react';
import './ChartComponent.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface DataDisplayProps {
  data: { timestamp_str: string; mean_blue_intensity: number }[];
}

interface DataPoint {
  timestamp_str: string;
  mean_blue_intensity: number;
}

const calculateMovingAverage = (data: DataPoint[], windowSize: number) => {
  const smoothedData = [];

  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize); j <= i; j++) {
      sum += data[j].mean_blue_intensity;
      count++;
    }

    smoothedData.push({
      ...data[i],
      mean_blue_intensity: (sum / count).toFixed(2),
    });
  }

  return smoothedData;
};

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  // Sort the data by timestamp_str in ascending order
  const sortedData = [...data].sort(
    (a, b) => Date.parse(a.timestamp_str) - Date.parse(b.timestamp_str)
  );

  // Calculate a moving average with a window size of 5 (you can adjust this)
  const smoothedData = calculateMovingAverage(sortedData, 5);

  return (
    <div className='chart-box'>
      <LineChart width={300} height={215} data={smoothedData}>
        <XAxis dataKey='timestamp_str' tick={false} />
        <YAxis domain={[0, 100]} /> {/* Set the Y-axis domain to [0, 100] */}
        <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='mean_blue_intensity'
          name='Mean Blue Intensity'
          stroke='rgb(75, 192, 192)'
          strokeWidth={3} // Adjust the strokeWidth to make the line thicker
          dot={false} // Turn off rendering of data points (circles)
        />
      </LineChart>
    </div>
  );
};

export default DataDisplay;
