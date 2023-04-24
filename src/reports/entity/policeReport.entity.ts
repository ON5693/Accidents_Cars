import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from "../../users/entity/user.entity"
import { Vehicles } from "../../vehicles/entity/vehicles.entity";

@Entity('police_report')
export class PoliceReport {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerVehiculePlate: string;

    @Column()
    customerDocument: string;

    @Column()
    policeReport: string;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.police_report)
    user: User;

    @Column()
    user_id: number;
    
    @Column({ type: "jsonb", nullable: true })
    vehiclesInvolved!: Vehicles[];

    @JoinTable({ name: 'users_incidents' })
    @ManyToMany(() => User, (third) => third.incidents)
    third!: User[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

}
