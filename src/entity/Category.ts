import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Establishment } from "./Establishment";

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
}
