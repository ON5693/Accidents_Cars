import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import Joi = require("@hapi/joi");
import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi';
import { AppDataSource } from '../../data-source';
import { User } from '../../users/entity/user.entity';

export const authController = (con: typeof AppDataSource): Array<ServerRoute> => {
  const userRepo: Repository<User> = con.getRepository(User);
  return [
    {
      method: 'POST',
      path: '/register',
      async handler({ payload }: Request) {
        try {
          const {
            firstName,
            lastName,
            email,
            document,
            driverLicense,
            password,
          } = payload as Partial<User>;
          const u = userRepo.create({
              firstName,
              lastName,
              email,
              document,
              driverLicense,
              password
          });
          await userRepo.save(u);
          return {
            user: u,
            accessToken: sign({ ...u }, 'fromEnvFile'),
          };
        } catch (error) {
          console.error(error);
          return { err: 'something went wrong :(' };
        }
      },
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().max(250).min(3),
            lastName: Joi.string().required().max(250).min(3),
            email: Joi.string().required().max(250).min(4),
            document: Joi.string().required().max(11).min(11),
            driverLicense: Joi.string().required().max(30).min(10),
            password: Joi.string().required().min(1).max(15),
          }) as any,
          failAction(request: Request, h: ResponseToolkit, err: Error) {
            throw err;
          },
          options: {
            abortEarly: false,
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/login',
      async handler({ auth: { credentials } }: Request) {
        return {
          ...credentials,
          accessToken: sign({ ...credentials }, 'fromEnvFile'),
        };
      },
      options: {
        auth: {
          strategy: 'simple',
        },
      },
    },
  ];
};