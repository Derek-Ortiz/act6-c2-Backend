import { Request, Response } from 'express';
import * as favoriteRepository from '../repositories/favoriteRepository';

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, movie } = req.body; 

    const localMovieId = await favoriteRepository.upsertMovieCache(movie);

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
    
    const localMovieId = await favoriteRepository.upsertMovieCache(movie);

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