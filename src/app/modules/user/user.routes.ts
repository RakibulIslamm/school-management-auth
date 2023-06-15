import { Router } from 'express';
import { validateCreateUserRequest } from './middlewares/validateCreateUserRequest';
import { createUser } from './user.controller';
import { createUserZodSchema } from './user.validation';
const router = Router();

router.post(
  '/create-user',
  validateCreateUserRequest(createUserZodSchema),
  createUser
);

export default router;
