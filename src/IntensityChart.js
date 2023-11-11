import React from 'react';
import { Line } from 'react-chartjs-2';


const IntensityChart = ({ data }) => {
  // Extract data for each line
  const creationDates = data.map(entry => new Date(entry.creation_date).getTime());
  const blueIntensities = data.map(entry => entry.mean_blue_intensity);
  const greenIntensities = data.map(entry => entry.mean_green_intensity);
  const redIntensities = data.map(entry => entry.mean_red_intensity);

  // Data for the chart
  const chartData = {
    labels: creationDates,
    datasets: [
      {
        label: 'Mean Blue Intensity',
        data: blueIntensities,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Mean Green Intensity',
        data: greenIntensities,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Mean Red Intensity',
        data: redIntensities,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    scales: {
      x: [
        {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Creation Date',
          },
        },
      ],
      y: {
        min: 0,
        max: 255,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default IntensityChart;
