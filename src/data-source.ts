import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./users/entity/user.entity"
import { CreateUserTable1681848327463 } from "./migrations/1681848327463-CreateUserTable"
import { CreatePoliceReportTable1681849347012 } from "./migrations/1681849347012-CreatePoliceReportTable"
import { PoliceReport } from "./reports/entity/policeReport.entity"
import { Vehicles } from "./vehicles/entity/vehicles.entity"
import { CreateTableVehicles1682210351652 } from "./migrations/1682210351652-CreateTableVehicles"
import { CreateTableUsersIncidents1682212645591 } from "./migrations/1682212645591-CreateTableUsersIncidents"
import { AddUsersId1682212746531 } from "./migrations/1682212746531-AddUsersId"
import { AddIncidentsId1682212759879 } from "./migrations/1682212759879-AddIncidentsId"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "protectedcars",
    synchronize: true,
    logging: ['error'],
    logger: 'advanced-console',
    entities: [User, Vehicles, PoliceReport],
    migrations: [CreateUserTable1681848327463, 
        CreatePoliceReportTable1681849347012, 
        CreateTableVehicles1682210351652, 
        CreateTableUsersIncidents1682212645591,
        AddUsersId1682212746531,
        AddIncidentsId1682212759879],
    subscribers: [],
})
