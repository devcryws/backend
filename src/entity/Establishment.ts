import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Category } from "./Category";

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

    @OneToMany(() => Category, category => category.establishment)
    categories: Category[];
}
