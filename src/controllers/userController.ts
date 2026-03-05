import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ success: false, message: 'El correo ya está registrado' });
      return;
    }

    // Encriptar la contraseña (10 salt rounds es el estándar seguro)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Guardar en BD
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