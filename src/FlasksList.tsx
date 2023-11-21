import React from 'react';
import FlaskImageDisplay from './FlaskImageDisplay';
import FlaskInfo from './FlaskInfo';
import FlaskGifDisplay from './FlaskGifDisplay';
import IntensityChart from './FlaskChartComponent';

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
    most_recent_snippet_path: string;
    substrate: string;
    gif_path: string;
    // Add other flask properties as needed
  };
  creation_date: string;
}
interface SnippetsListProps {
  snippets: Snippet[];
}

const FlasksList: React.FC<SnippetsListProps> = ({ snippets, flask, creation_date }) => {
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
    padding: '5px 10px',
    margin: '0',
  };

  return (
    <div style={containerStyle}>
      <FlaskImageDisplay flask={flask} />
      <FlaskInfo flask={flask} creation_date={creation_date}/>
      <FlaskGifDisplay flask={flask} />
      <IntensityChart data={transformedData} />
    </div>
  );
};

export default FlasksList;
