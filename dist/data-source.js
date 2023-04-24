"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./users/entity/user.entity");
var _1681848327463_CreateUserTable_1 = require("./migrations/1681848327463-CreateUserTable");
var _1681849347012_CreatePoliceReportTable_1 = require("./migrations/1681849347012-CreatePoliceReportTable");
var policeReport_entity_1 = require("./reports/entity/policeReport.entity");
var vehicles_entity_1 = require("./vehicles/entity/vehicles.entity");
var _1682210351652_CreateTableVehicles_1 = require("./migrations/1682210351652-CreateTableVehicles");
var _1682212645591_CreateTableUsersIncidents_1 = require("./migrations/1682212645591-CreateTableUsersIncidents");
var _1682212746531_AddUsersId_1 = require("./migrations/1682212746531-AddUsersId");
var _1682212759879_AddIncidentsId_1 = require("./migrations/1682212759879-AddIncidentsId");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "protectedcars",
    synchronize: true,
    logging: ['error'],
    logger: 'advanced-console',
    entities: [user_entity_1.User, vehicles_entity_1.Vehicles, policeReport_entity_1.PoliceReport],
    migrations: [_1681848327463_CreateUserTable_1.CreateUserTable1681848327463,
        _1681849347012_CreatePoliceReportTable_1.CreatePoliceReportTable1681849347012,
        _1682210351652_CreateTableVehicles_1.CreateTableVehicles1682210351652,
        _1682212645591_CreateTableUsersIncidents_1.CreateTableUsersIncidents1682212645591,
        _1682212746531_AddUsersId_1.AddUsersId1682212746531,
        _1682212759879_AddIncidentsId_1.AddIncidentsId1682212759879],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map