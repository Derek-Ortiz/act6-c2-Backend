import { query } from '../config/db';

// 1. Guarda la película en caché (o la recupera si ya existe)
export const upsertMovieCache = async (movie: any) => {
  const sql = `
    INSERT INTO movies (external_id, title, description, release_year, cover_image)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (external_id) DO UPDATE 
    SET title = EXCLUDED.title 
    RETURNING id;
  `;
  const values = [movie.external_id, movie.title, movie.description, movie.release_year, movie.cover_image];
  const result = await query(sql, values);
  return result.rows[0].id;
};

// 2. Gestiona el favorito (Crear o reactivar/desactivar)
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

// 3. Obtener los favoritos activos de un usuario
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