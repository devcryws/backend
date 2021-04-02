import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Establishment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logoUrl: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
