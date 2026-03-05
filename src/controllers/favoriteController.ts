import { Request, Response } from 'express';
import * as favoriteRepository from '../repositories/favoriteRepository';

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    // En un entorno real, userId vendría del token JWT de sesión.
    // Por ahora lo recibiremos del body para probar.
    const { userId, movie } = req.body; 

    // 1. Asegurarnos de que la película esté en nuestro caché local
    const localMovieId = await favoriteRepository.upsertMovieCache(movie);

    // 2. Crear la relación de favorito (is_active = true)
    const favorite = await favoriteRepository.toggleFavorite(userId, localMovieId, true);

    res.status(200).json({ success: true, message: 'Agregada a favoritos', data: favorite });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al guardar favorito' });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, movie } = req.body;
    
    // Obtenemos el ID local de la película
    const localMovieId = await favoriteRepository.upsertMovieCache(movie);

    // Aplicamos el "Soft Delete" (is_active = false)
    const favorite = await favoriteRepository.toggleFavorite(userId, localMovieId, false);

    res.status(200).json({ success: true, message: 'Removida de favoritos', data: favorite });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al remover favorito' });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const favorites = await favoriteRepository.getUserFavorites(Number(userId));

    res.status(200).json({ success: true, data: favorites });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener favoritos' });
  }
};