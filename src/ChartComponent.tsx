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

// Define the props interface
interface DataDisplayProps {
  data: { timestamp_str: string; mean_blue_intensity: number }[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  // Sort the data by timestamp_str in ascending order
  const sortedData = [...data].sort((a, b) =>
    Date.parse(a.timestamp_str) - Date.parse(b.timestamp_str)
  );

  return (
    <div className='chart-box'>
      <LineChart width={300} height={215} data={sortedData}>
        <XAxis dataKey="timestamp_str" tick={false} /> {/* Hide x-axis ticks */}
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="mean_blue_intensity"
          name="Mean Blue Intensity"
          stroke="rgb(75, 192, 192)"
        />
      </LineChart>
    </div>
  );
};

export default DataDisplay;
