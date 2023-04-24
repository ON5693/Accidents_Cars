import { Request, ResponseToolkit } from '@hapi/hapi';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users/entity/user.entity';
import { AppDataSource } from './data-source';

export const validateJWT = (con: typeof AppDataSource) => {
  const userRepo: Repository<User> = con.getRepository(User);
  return async (
    { id }: Partial<User>,
    request: Request,
    h: ResponseToolkit
  ) => {
    const user: User = await userRepo.findOne({
        where: { id }
    });
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: { user } };
  };
};

export const validateBasic = (con: typeof AppDataSource) => {
  const userRepo: Repository<User> = con.getRepository(User);
  return async (
    request: Request,
    username: string,
    password: string,
    h: ResponseToolkit
  ) => {
    const user: User = await userRepo.findOne({ 
        where: { email: username }
    });
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = await bcrypt.compare(password, user.password);

    // credentials - a credentials object passed back to the application in `request.auth.credentials`.
    return { isValid: isValid, credentials: user };
  };
};