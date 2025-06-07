import { Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong, random secret in production
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password, role });
    
    // Do not return password hash in response
    const userResponse = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    res.status(201).json({ message: 'User registered successfully', user: userResponse });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check for user existence
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );
    
    // Do not return password hash in response
    const userResponse = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
}; 