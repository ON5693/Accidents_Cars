import { User } from "../../users/entity/user.entity";
import { Vehicles } from "../../vehicles/entity/vehicles.entity";

export type CreateReportsDto = {
    customerVehiculePlate: string;
    customerDocument: string;
    policeReport: string;
    third: User[];
    vehiclesInvolved: Vehicles[];
  };