import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Establishment } from "./Establishment";
import { Complement } from "./Complement";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    imageBGUrl: string;

    @ManyToOne(() => Establishment, establishment => establishment.categories)
    establishment: Establishment;

    @OneToMany(() => Complement, complement => complement.category)
    complements: Complement[];
}
