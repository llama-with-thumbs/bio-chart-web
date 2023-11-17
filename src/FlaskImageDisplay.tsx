import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

interface Flask {
  flask: string;
  last_update: string;
  culture: string;
  most_recent_snippet_path: string;
  substrate: string;
  gif_path: string;
  // Add other flask properties as needed
}

interface FlaskImageDisplayProps {
  flask: Flask;
}

const FlaskImageDisplay: React.FC<FlaskImageDisplayProps> = ({ flask }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [minutesAgo, setMinutesAgo] = useState<number | null>(null);

  useEffect(() => {
    // Initialize Firebase Storage
    const storage = getStorage();

    // Create a reference to the most recent image
    const imageRef = ref(storage, flask.most_recent_snippet_path);

    // Get the download URL for the image
    getDownloadURL(imageRef)
      .then((url) => setImageUrl(url))
      .catch((error) => console.error('Error getting download URL:', error));

    // Calculate minutes ago initially
    updateMinutesAgo();

    // Set up interval to update minutes every minute
    const intervalId = setInterval(updateMinutesAgo, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [flask.most_recent_snippet_path, flask.last_update]);

  const updateMinutesAgo = () => {
    const lastUpdateDate = new Date(flask.last_update);
    const currentDate = new Date();
    const differenceInMinutes = Math.floor((currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 60));
  
    if (differenceInMinutes < 60) {
      setMinutesAgo(differenceInMinutes);
    } else if (differenceInMinutes < 1440) {
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      setMinutesAgo(differenceInHours);
    } else {
      const differenceInDays = Math.floor(differenceInMinutes / 1440);
      setMinutesAgo(differenceInDays);
    }
  };
  

  return (
    <div style={{ position: 'relative', padding: '0px', margin: '0px', display: 'flex' }}>
      {imageUrl && (
        <div style={{ position: 'relative' }}>
          <img
            src={imageUrl}
            alt={`Image for ${flask.flask}`}
            style={{
              height: '200px',
              margin: '0',
              padding: '0',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              backgroundColor: 'rgba(255, 0, 0, 0)',
              color: '#00ff00',
              margin: 0,
              padding: '5px',
              fontSize: '14px',
              // fontWeight: 'bold',
              letterSpacing: '-.5px'
            }}
          >
            Last Update: {minutesAgo !== null ? <span><strong>{minutesAgo} </strong> min ago</span>: 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlaskImageDisplay;
