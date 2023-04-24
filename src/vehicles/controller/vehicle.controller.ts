import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source"
import { ResponseToolkit, ServerRoute, Request } from 'hapi';
import { Vehicles } from "../entity/vehicles.entity"; 
import { CreateVehicleDto } from "../dto/vehicle.dto";
import { User } from "../../users/entity/user.entity";

export const vehicleController = (con: typeof AppDataSource): Array<ServerRoute> => {
  const carsRepo: Repository<Vehicles> = con.getRepository(Vehicles);
  return [
    {
        method: 'GET',
        path: '/vehicles',
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
                data: await carsRepo.find(findOptions),
                perPage: realTake,
                page: +page || 1,
                next: `http://localhost:3000/vehicles?perPage=${realTake}&page=${ +page + 1 }${handleQuery}`,
                prev: `http://localhost:3000/vehicles?perPage=${realTake}&page=${ +page - 1 }${handleQuery}`,
            };
        },
    },
    {
        method: 'GET',
        path: '/vehicles/{id}',
        async handler(
            { params: { id } }: Request,
            h: ResponseToolkit,
            err?: Error
        ) {
            const v: Vehicles = await carsRepo.findOne({
            where: { id: +id },            
            relations: ['user']
            });
            return v;
        },
    },
    {
        method: 'POST',
        path: '/vehicles',
        async handler(
          {
            payload,
            auth: {
                credentials: { user },
            },
          }: Request,
          h: ResponseToolkit,
          err?: Error
        ) {
        const createVehicleDto: CreateVehicleDto =  payload as Vehicles;
        
        const v = carsRepo.create({
            userId: (user as User).id,
            ...createVehicleDto
        });
        return carsRepo.save(v);
        },
    },
    {
        method: 'PATCH',
        path: '/vehicles/{id}',
        handler: async (
            request: Request,
            h: ResponseToolkit,
            err?: Error
        ) => {
            let params = request.params.id;
            let info = request.payload;

            const v = await carsRepo.findOne({
                where: { id: +params },
            });
            
            Object.keys(info).forEach((key) => (v[key] = info[key]));
            
            carsRepo.update(+params, v);
            carsRepo.save(v);
            return v;
        },
    },
    {
        method: 'DELETE',
        path: '/vehicles/{id}',
        handler: async (
          { params: { id } }: Request,
          h: ResponseToolkit,
          err?: Error
        ) => {
          const v = await carsRepo.findOne({
            where: { id: +id },
        });
        carsRepo.remove(v);
          return v;
        },
    },
  ]
}