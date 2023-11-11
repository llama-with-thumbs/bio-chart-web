import React from 'react';
import IntensityChart from './ChartComponent';
import FlaskInfo from './FlaskInfo';

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
    culture: string;
    // Add other flask properties as needed
  };
  creation_date: string;
}
interface SnippetsListProps {
  snippets: Snippet[];
}

const SnippetsList: React.FC<SnippetsListProps> = ({ snippets, flask, creation_date }) => {
  const transformedData = snippets.map(({ creation_date, mean_blue_intensity, mean_green_intensity, mean_red_intensity }) => ({
    timestamp_str: creation_date,
    mean_blue_intensity,
    mean_green_intensity,

    mean_red_intensity
  }));
  
  // Basic styling for flex display
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '0',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <FlaskInfo flask={flask} creation_date={creation_date}/>
      <IntensityChart data={transformedData} />
    </div>
  );
};

export default SnippetsList;
