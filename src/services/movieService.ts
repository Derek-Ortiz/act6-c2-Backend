import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  genre: string;
  stars: number;
}

export const getExternalMovies = async (): Promise<Movie[]> => {
  try {
    const apiUrl = process.env.EXTERNAL_API_URL || 'https://devsapihub.com/api-movies';
    const response = await axios.get<Movie[]>(apiUrl);
    return response.data;
  } catch (error: any) {
    console.error('Error al consumir la API externa:', error.message);
    throw new Error('No se pudieron obtener las películas de la API externa');
  }
};

export const getExternalMovieById = async (id: number): Promise<Movie | null> => {
  try {
    const movies = await getExternalMovies();
    return movies.find(movie => movie.id === id) || null;
  } catch (error: any) {
    console.error('Error al buscar la película:', error.message);
    throw new Error('No se pudo obtener la película');
  }
};