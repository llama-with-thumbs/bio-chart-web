import React from 'react';

const FlaskInfo = ({ flask, creation_date }) => {
  const { flask: flaskName, last_update, culture } = flask;

  return (
    <div style={{
        border: '1px solid #ccc',
        height: '200px',
        borderRadius: '8px',
        lineHeight: 'normal',
        margin: '0'
      }}>
      <h2>Flask Information</h2>
      <div><strong>Flask identification:</strong> {flaskName}</div>
      <div><strong>Seeded culture:</strong> <a href={culture} target="_blank" rel="noopener noreferrer">wiki link</a></div>
      <div><strong>Creation date:</strong>{creation_date}</div>
      <div><strong>Last Update:</strong> {last_update}</div>
      <div><strong>Elapsed Time:</strong></div>
    </div>
  );
};

export default FlaskInfo;
