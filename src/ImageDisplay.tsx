import React, { useEffect, useState } from 'react';
import { list, ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import your Firebase setup
import './ImageDisplay.css'; // Import the SCSS file

const getCategoryImages = async ({ sample }: { sample: string }) => { // Specify the type for sample
  const categoryRef = ref(storage, `captured_images/${sample}/Latest_capture`);
  const listResult = await list(categoryRef);
  const imageUrls = [];

  for (const item of listResult.items) {
    const imageUrl = await getDownloadURL(item);
    imageUrls.push(imageUrl);
  }

  return imageUrls;
};

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
          <div className='flask-details-container'>
            <h3>
              Mycelium culture flask {sample}
            </h3>
            <div className='timeline-container'>
              <p>Start time: Sep 22, 2023, 4:27:12 PM</p>
              <p>Latest update: {image.timestamp}</p>
              <p>Elapsed Time: 641 hours ( 26 days )</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
