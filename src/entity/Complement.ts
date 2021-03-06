import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Establishment } from "./Establishment";
import { Category } from "./Category";

@Entity()
export class Complement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true,
      nullable: true,
      length: 20
    })
    name: string;

    @Column({
        type: "double",
        nullable: true
    })
    price: number;

    @ManyToOne(() => Establishment, establishment => establishment.complements)
    establishment: Establishment;

    @ManyToOne(() => Category, category => category.complements)
    category: Category
}
