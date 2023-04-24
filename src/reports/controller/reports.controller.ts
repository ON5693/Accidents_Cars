import { Repository } from 'typeorm';
import { ServerRoute, ResponseToolkit, Request } from 'hapi';
import { AppDataSource } from '../../data-source';
import { PoliceReport } from '../entity/policeReport.entity';
import { User } from '../../users/entity/user.entity';
import { CreateReportsDto } from '../dto/reports.dto';

export const reportsController = (con: typeof AppDataSource): Array<ServerRoute> => {
  const reportsRepo: Repository<PoliceReport> = con.getRepository(PoliceReport);
  const userRepo: Repository<User> = con.getRepository(User);
  return [
    {
      method: 'GET',
      path: '/reports',
      handler: (request: Request, h: ResponseToolkit, err?: Error) =>
      reportsRepo.find(),
    },
    {
      method: 'GET',
      path: '/reports/{id}',
      handler: ({ params: { id } }: Request, h: ResponseToolkit, err?: Error) =>
      reportsRepo.findOne({
        where: { id: +id },
        relations: ['third']
      }),
    },
    {
      method: 'POST',
      path: '/reports',
      handler: async (
        {
          payload,
          auth: {
            credentials: { user },
          },
        }: Request,
        h: ResponseToolkit,
        err?: Error
      ) => {
        const createReportsDto: CreateReportsDto = payload as PoliceReport;

        const third = await Promise.all(
          createReportsDto.third.map(async (u) => { 

            let user = await userRepo.query(`
            SELECT * FROM users
            WHERE document = '${u.document}' `);

            if(user.length > 0) {
              return user[0];
            }
            else {
              const obj =  userRepo.create({ 
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                document: u.document,
                driverLicense: u.driverLicense,
                password: '1234'});

              return await userRepo.save(obj);  
              }
            }
          ));

        const p = reportsRepo.create({
          user_id: (user as User).id,
          ...createReportsDto, 
          third
        });

        return reportsRepo.save(p);
      },
    },
    {
      method: 'PATCH',
      path: '/reports/{id}',
      handler: async (
        { params: { id }, payload }: Request,
        h: ResponseToolkit,
        err?: Error
      ) => {
        const p = await reportsRepo.findOne({
            where: { id: +id }
        });
        Object.keys(payload).forEach((key) => (p[key] = payload[key]));
        reportsRepo.update(id, p);
        return p;
      },
    },
    {
      method: 'DELETE',
      path: '/reports/{id}',
      handler: async (
        { params: { id } }: Request,
        h: ResponseToolkit,
        err?: Error
      ) => {
        const p = await reportsRepo.findOne({
            where: { id: +id }
        });
        reportsRepo.remove(p);
        return p;
      },
    },
  ];
};
