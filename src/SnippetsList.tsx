import React from 'react';

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
    name: string;
    creation_date: string;
    // Add other flask properties as needed
  };
}
interface SnippetsListProps {
  snippets: Snippet[];
}

const SnippetsList: React.FC<SnippetsListProps> = ({ snippets, flask }) => {
  return (
    <div>
      <div><strong>Flask Name:</strong> {flask.name} <strong>Flask creation_date:</strong>{' '}{flask.creation_date}</div>
      {snippets.map((snippet) => (
        <p key={snippet.path}>
          <strong>Chamber:</strong> {snippet.chamber}{' '}
          <strong>Creation Date:</strong> {snippet.creation_date}{' '}
          <strong>Flask:</strong> {snippet.flask}{' '}
          <strong>Mean Blue Intensity:</strong> {snippet.mean_blue_intensity}{' '}
          <strong>Mean Green Intensity:</strong> {snippet.mean_green_intensity}{' '}
          <strong>Mean Red Intensity:</strong> {snippet.mean_red_intensity}{' '}
          <strong>Path:</strong> {snippet.path}
        </p>
      ))}
    </div>
  );
};

export default SnippetsList;
