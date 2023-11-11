import React from 'react';
import IntensityChart from './IntensityChart';
import DataDisplay from './ChartComponent';

interface Snippet {
  chamber: string;
  creation_date: string;
  flask: string;
  mean_blue_intensity: number;
  mean_green_intensity: number;
  mean_red_intensity: number;
  path: string;
}

interface SnippetsListProps {
  snippets: Snippet[];
  flask: {
    flask: string;
    last_update: string;
    // Add other flask properties as needed
  };
}
interface SnippetsListProps {
  snippets: Snippet[];
}

const SnippetsList: React.FC<SnippetsListProps> = ({ snippets, flask }) => {
  const transformedData = snippets.map(({ creation_date, mean_blue_intensity, mean_green_intensity, mean_red_intensity }) => ({
    timestamp_str: creation_date,
    mean_blue_intensity,
    mean_green_intensity,
    
    mean_red_intensity
  }));
  return (
    <div>
      <div><strong>Flask Name:</strong> {flask.flask} <strong>Flask last_update:</strong>{' '}{flask.last_update}</div>
      <DataDisplay data = {transformedData}/>
      {/* {snippets.map((snippet) => (
        <p key={snippet.path}>
          <strong>Creation Date:</strong> {snippet.creation_date}{' '}
          <strong>Mean Blue Intensity:</strong> {snippet.mean_blue_intensity}{' '}
          <strong>Mean Green Intensity:</strong> {snippet.mean_green_intensity}{' '}
          <strong>Mean Red Intensity:</strong> {snippet.mean_red_intensity}{' '}
        </p>
      ))} */}
    </div>
  );
};

export default SnippetsList;
