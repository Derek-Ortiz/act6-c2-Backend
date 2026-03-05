import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());


app.use('/api/v1/movies', movieRoutes);       
app.use('/api/v1/users', userRoutes);         
app.use('/api/v1/favorites', favoriteRoutes); 

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Backend SOA con TS funcionando al 100%' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express (TS) corriendo en el puerto ${PORT}`);
});