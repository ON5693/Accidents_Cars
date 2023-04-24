import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm"
import { PoliceReport } from "../../reports/entity/policeReport.entity"
import * as bcrypt from 'bcrypt';
import { Exclude, instanceToPlain } from "class-transformer";
import { Vehicles } from "../../vehicles/entity/vehicles.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ unique: true, nullable: false })
    document!: string;

    @Column({ nullable: false })
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({ unique: true, nullable: true })
    driverLicense!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => PoliceReport, (policeReport) => policeReport.user, {
        cascade: true,
    })
    police_report: PoliceReport[];

    @OneToMany(() => Vehicles, (vehicles) => vehicles.user, {
        cascade: true,
    })
    vehicles!: Vehicles[];

    @ManyToMany(() => PoliceReport, (incidents) => incidents.third)
    incidents!: PoliceReport[];

    toJSON() {
        return instanceToPlain(this);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();

        this.password = await bcrypt.hash(password || this.password, salt);
    }

}
