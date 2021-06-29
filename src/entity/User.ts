import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Establishment } from "./Establishment";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        nullable: false,
        length: 50
    })
    name: string;

    @Column({
        nullable: false,
        length: 11
    })
    phone: string;

    @Column({
        nullable: false,
        length: 12
    })
    password: string;

    @Column({
        nullable: true,
        length: 200
    })
    userPhoto: string;

    @ManyToOne(() => Establishment, establishment => establishment.users)
    establishment: Establishment;

}