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

  useEffect(() => {
    // Initialize Firebase Storage
    const storage = getStorage();

    // Create a reference to the most recent image
    const imageRef = ref(storage, flask.most_recent_snippet_path);

    // Get the download URL for the image
    getDownloadURL(imageRef)
      .then((url) => setImageUrl(url))
      .catch((error) => console.error('Error getting download URL:', error));
  }, [flask.most_recent_snippet_path]);

  return (
    <div style={{ padding: '0px', margin: '0px', display: 'flex' }}>
      {imageUrl && <img src={imageUrl} alt={`Image for ${flask.flask}`} style={{
        height: '200px', margin: '0', padding: '0', border: "1px solid #ccc",
        borderRadius: '3px'
      }} />}
    </div>
  );
};

export default FlaskImageDisplay;
