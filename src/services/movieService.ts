import axios from 'axios';

// Puedes ajustar esta interfaz según los campos reales que devuelva devsapihub
export interface Movie {
  id: number;
  title: string;
  description?: string;
  [key: string]: any; 
}

export const getExternalMovies = async (): Promise<Movie[]> => {
  try {
    const apiUrl = process.env.EXTERNAL_API_URL || 'https://devsapihub.com/api-movies';
    
    // Le indicamos a axios que esperamos un arreglo de películas
    const response = await axios.get<Movie[]>(apiUrl);
    return response.data;
  } catch (error: any) {
    console.error('Error al consumir la API externa:', error.message);
    throw new Error('No se pudieron obtener las películas de la API externa');
  }
};