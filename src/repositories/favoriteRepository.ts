import { query } from '../config/db';
import { Movie } from '../services/movieService';

export const upsertMovieCache = async (movie: Movie) => {
  const sql = `
    INSERT INTO movies (external_id, title, description, year, genre, stars)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (external_id) DO UPDATE 
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        year = EXCLUDED.year,
        genre = EXCLUDED.genre,
        stars = EXCLUDED.stars
    RETURNING id;
  `;
  
  
  const values = [
    movie.id,          
    movie.title, 
    movie.description, 
    movie.year, 
    movie.genre, 
    movie.stars
  ];
  
  const result = await query(sql, values);
  return result.rows[0].id;
};

export const toggleFavorite = async (userId: number, movieId: number, isActive: boolean) => {
  const sql = `
    INSERT INTO favorites (user_id, movie_id, is_active)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, movie_id) DO UPDATE 
    SET is_active = EXCLUDED.is_active, updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const result = await query(sql, [userId, movieId, isActive]);
  return result.rows[0];
};

export const getUserFavorites = async (userId: number) => {
  const sql = `
    SELECT m.*, f.updated_at 
    FROM favorites f
    JOIN movies m ON f.movie_id = m.id
    WHERE f.user_id = $1 AND f.is_active = TRUE
    ORDER BY f.updated_at DESC;
  `;
  const result = await query(sql, [userId]);
  return result.rows;
};