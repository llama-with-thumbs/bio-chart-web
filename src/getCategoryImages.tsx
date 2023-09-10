import { list, ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import your Firebase setup

const getCategoryImages = async () => {
  const categoryRef = ref(storage, 'captured_images');
  const listResult = await list(categoryRef);
  const imageUrls = [];

  for (const item of listResult.items) {
    const imageUrl = await getDownloadURL(item);
    imageUrls.push(imageUrl);
  }

  return imageUrls;
};

export default getCategoryImages;
