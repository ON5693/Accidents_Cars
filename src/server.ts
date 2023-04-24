import * as Hapi from '@hapi/hapi';
import { Server, ServerRoute } from '@hapi/hapi';
import 'colors';
import { get } from 'node-emoji';
import { AppDataSource } from "./data-source"
import { userController } from './users/controller/user.controller';
import { authController } from './auth/controller/auth.controller';
import { reportsController } from './reports/controller/reports.controller';
import { vehicleController } from './vehicles/controller/vehicle.controller';
import { validateBasic, validateJWT } from './auth';

const server: Server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

export const start: any = async () => { 
  await server.start().then();
  console.log(
    get('rocket'),
    `Server running on ${server.info.uri}`.green,
    get('rocket')
    );
  return server;
}

const init = async () => {

  await server.register(require('hapi-auth-jwt2'));
  await server.register(require('@hapi/basic'));
  const con = await AppDataSource.initialize();

  server.auth.strategy('simple', 'basic', { validate: validateBasic(con) });
  server.auth.strategy('jwt', 'jwt', {
    key: 'fromEnvFile', // Never Share your secret key
    validate: validateJWT(con), // validate function defined above
  });
  server.auth.default('jwt');

  console.log(get('dvd'), 'DB init -> Done', get('dvd'));

  server.route([
    ...userController(con),
    ...authController(con),
    ...reportsController(con),
    ...vehicleController(con),
  ] as Array<ServerRoute>);

  start();

  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });
}

init();

