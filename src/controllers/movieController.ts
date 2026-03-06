import { Request, Response } from 'express';
import * as movieService from '../services/movieService';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await movieService.getExternalMovies();
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await movieService.getExternalMovieById(Number(id));
    
    if (!movie) {
      res.status(404).json({
        success: false,
        message: 'Película no encontrada'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};