import React, { useEffect, useState } from 'react';
import getCategoryImages from './getCategoryImages'; // Import the function from step 2

const ImageDisplay: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    getCategoryImages()
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.error('Error fetching image URLs:', error);
      });
  }, []);

  return (
    <div className="image-container">
      {imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index}`}
          className="image-item"
        />
      ))}
    </div>
  );
};

export default ImageDisplay;
