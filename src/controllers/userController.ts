import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ success: false, message: 'El correo ya está registrado' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await userRepository.createUser(name, email, passwordHash);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: newUser
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
  
};
// Agrega esto al final de userController.ts
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      return;
    }

    // Retornamos los datos del usuario (sin la contraseña)
    res.status(200).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error interno' });
  }
};