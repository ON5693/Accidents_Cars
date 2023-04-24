import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source"
import { ResponseToolkit, ServerRoute, Request } from 'hapi';
import { User } from "../entity/user.entity";

export const userController = (con: typeof AppDataSource): Array<ServerRoute> => {
  const userRepo: Repository<User> = con.getRepository(User);
  return [
    {
        method: 'GET',
        path: '/users',
        handler: async ({ query }: Request, h: ResponseToolkit, err?: Error) => {
            let { perPage, page, ...q } = query
            let realPage: number;
            let realTake: number;

            if (perPage) realTake = +perPage;
            else 
            {
                perPage = '10';
                realTake = 10;
            }

            if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
            else 
            {
                realPage = 0;
                page = `1`;
            }

            const findOptions = {
                take: realTake,
                skip: realPage,
                where: { ...q }
            };
            if (!q) delete findOptions.where;

            const getQuery = () => Object.keys(q)
                .map((key) => `${key}=${q[key]}`)
                .join('&');

            const handleQuery = getQuery().length === 0 ? '' : `&${getQuery()}`;

            return {
                data: await userRepo.find(findOptions),
                perPage: realTake,
                page: +page || 1,
                next: `http://localhost:3000/users?perPage=${realTake}&page=${ +page + 1 }${handleQuery}`,
                prev: `http://localhost:3000/users?perPage=${realTake}&page=${ +page - 1 }${handleQuery}`,
            };
        },
    },
    {
        method: 'GET',
        path: '/users/{id}',
        async handler(
            { params: { id } }: Request,
            h: ResponseToolkit,
            err?: Error
        ) {
            const u: User = await userRepo.findOne({
            where: { id: +id },            
            relations: ['vehicles', 'police_report']
            });
            return u;
        },
    },
    {
        method: 'POST',
        path: '/users',
        async handler(
        { payload }: Request,
        h: ResponseToolkit,
        err?: Error
        ) {
        const {firstName, lastName, email, document, driverLicense} =  payload as Partial<User>;
        const u = userRepo.create({
            firstName,
            lastName,
            email,
            document,
            driverLicense
        });
        return userRepo.save(u);
        },
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: async (
            request: Request,
            h: ResponseToolkit,
            err?: Error
        ) => {
            let params = request.params.id;
            let info = request.payload;

            const u = await userRepo.findOne({
                where: { id: +params },
            });
            
            Object.keys(info).forEach((key) => (u[key] = info[key]));
            
            userRepo.update(+params, u);
            userRepo.save(u);
            return u;
        },
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: async (
          { params: { id } }: Request,
          h: ResponseToolkit,
          err?: Error
        ) => {
          const u = await userRepo.findOne({
            where: { id: +id },
        });
          userRepo.remove(u);
          return u;
        },
    },
  ]
}