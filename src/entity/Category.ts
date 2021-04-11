import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Establishment } from "./Establishment";
import { Complement } from "./Complement";
import { Product } from "./Product";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 15
    })
    name: string;

    @Column({
        unique: true,
        length: 7
    })
    color: string;

    @Column()
    category_image_url: string;

    @ManyToOne(() => Establishment, establishment => establishment.categories)
    establishment: Establishment;

    @OneToMany(() => Complement, complement => complement.category)
    complements: Complement[];

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
