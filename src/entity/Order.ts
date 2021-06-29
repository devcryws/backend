import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Establishment } from "./Establishment";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table: number;

    @Column()
    value: number;

    @ManyToOne(() => Establishment, establishment => establishment.orders)
    establishment: Establishment;
} 
