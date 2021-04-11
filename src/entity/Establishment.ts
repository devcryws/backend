import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Category } from "./Category";
import { Complement } from "./Complement";
import { Product } from "./Product";

@Entity()
export class Establishment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true,
      nullable: true,
      length: 40
    })
    name: string;

    @Column({nullable: true})
    logoUrl: string;

    @Column({nullable: true})
    address: string;

    @Column({
      unique: true,
      nullable: true
    })
    email: string;

    @Column({nullable: true})
    password: string;

    @OneToMany(() => Category, category => category.establishment)
    categories: Category[];

    @OneToMany(() => Complement, complement => complement.establishment)
    complements: Complement[];

    @OneToMany(() => Product, product => product.establishment)
    products: Product[];
}

