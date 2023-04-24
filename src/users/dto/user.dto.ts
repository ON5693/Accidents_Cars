import { CreateVehicleDto } from "../../vehicles/dto/vehicle.dto"; 

export type CreateUserDto = {
  document: string;
  name: string;
  driverLicense: string;
  email: string;
  vehicules: CreateVehicleDto[];
};