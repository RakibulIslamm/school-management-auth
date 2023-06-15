import config from '../../../config/index';
import { UserInterface } from './user.interface';
import User from './user.model';
import { generateUserId } from './users.utils';

export const createUserDB = async (userInfo: UserInterface) => {
  const id = await generateUserId();
  userInfo.id = id;
  if (!userInfo.password) {
    userInfo.password = config.default_user_pass as string;
  }
  const user = await User.create(userInfo);
  return user;
};
