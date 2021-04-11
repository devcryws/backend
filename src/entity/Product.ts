import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Establishment } from "./Establishment";
import { Category } from "./Category";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true,
      nullable: true,
      length: 15
    })
    name: string;

    @Column({
        nullable: true,
        length: 45
    })
    description: string;

    @Column({
        type: "double",
        nullable: true
    })
    price: number;

    @Column({
        default: "http://www.rcdrilling.com/wp-content/uploads/2013/12/default-placeholder.png"
    })
    product_img_url: string

    @ManyToOne(() => Establishment, establishment => establishment.products)
    establishment: Establishment;

    @ManyToOne(() => Category, category => category.products)
    category: Category
}
