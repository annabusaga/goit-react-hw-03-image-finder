import axios from 'axios';

export async function getImages({ value, page }) {
  return await axios(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=34389298-00d50d9a1bff1d8671ab6cb35&image_type=photo&orientation=horizontal&per_page=12`
  );
}
