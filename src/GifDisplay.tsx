import React, { useEffect, useState } from 'react';
import { list, ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import your Firebase setup
import './GifDisplay.css'; // Import the SCSS file

const getCategoryGifs = async ({ flask }: { flask: string }) => {
    const categoryRef = ref(storage, 'output_gif_folder');
    const listResult = await list(categoryRef);
    const gifUrls = [];

    for (const item of listResult.items) {
        console.log((item.name))
        if (item.name === `${flask}.gif`) {
            const gifUrl = await getDownloadURL(item);
            gifUrls.push({ url: gifUrl, name: flask }); // Store both URL and name
        }
    }

    return gifUrls;
};

interface GifDisplayProps {
    flask: string;
}

const GifDisplay: React.FC<GifDisplayProps> = ({ flask }) => {
    const [gifInfo, setGifInfo] = useState<{ url: string; name: string }[]>([]);

    useEffect(() => {
        getCategoryGifs({ flask })
            .then((gifs) => {
                setGifInfo(gifs);
            })
            .catch((error) => {
                console.error('Error fetching GIFs:', error);
            });
    }, []);

    return (
        <div className="gif-container">
            {gifInfo.length > 0 ? (
                gifInfo.map((gif, index) => (
                    <div key={index} className="gif-item">
                        <img src={gif.url} />
                    </div>
                ))
            ) : (
                <p>No GIF found for flask {flask}</p>
            )}
        </div>
    );
};

export default GifDisplay;
