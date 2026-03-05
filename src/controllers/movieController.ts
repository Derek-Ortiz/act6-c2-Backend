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