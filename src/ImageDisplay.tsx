import React, { useEffect, useState } from 'react';
import getCategoryImages from './getCategoryImages';
import './ImageDisplay.css'; // Import the SCSS file

interface ImageDisplayProps {
  sample: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ sample }) => {
  const [images, setImages] = useState<{ name: string; timestamp: string; url: string }[]>([]);

  useEffect(() => {
    getCategoryImages({ sample })
      .then((imageUrls) => {
        // Transform the imageUrls array into the expected structure
        const imageList = imageUrls.map((url, index) => {
          // Extract the timestamp from the URL
          const timestamp = url.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/);
          let formattedTimestamp = '';

          if (timestamp) {
            const dateParts = timestamp[0].split('_');
            if (dateParts.length === 2) {
              // Assuming 'yyyy-mm-dd' and 'hh-mm-ss' format
              const [date, time] = dateParts;
              formattedTimestamp = `${date.replace(/-/g, '/')} ${time.replace(/-/g, ':')}`;
            }
          }

          return {
            name: `Image ${index}`,
            timestamp: formattedTimestamp,
            url: url,
          };
        });
        setImages(imageList);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div className="image-container">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.url} alt={image.name} />
          <p>{sample}</p>
          <p>{image.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
