import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entity/user.entity"; 

@Entity('vehicles')
export class Vehicles {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column()
  year!: string;

  @Column()
  plate!: string;

  @Column()
  brand!: string;

  @Column({ unique: true })
  chassis!: string;

  @Column()
  userId: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.vehicles)
  user!: User;

}
