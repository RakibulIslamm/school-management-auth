import { Request, Response } from 'express'
import { createUserDB } from './user.services'

export const createUser = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const user = await createUserDB(data)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to create user' })
  }
}
