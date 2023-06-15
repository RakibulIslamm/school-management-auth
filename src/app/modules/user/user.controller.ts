import { RequestHandler } from 'express';
import { createUserDB } from './user.services';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await createUserDB(data);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
