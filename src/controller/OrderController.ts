import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Order } from "../entity/Order";
import { Establishment } from "../entity/Establishment";
import { RequestAuth } from "../services/Auth/Auth";

export class OrderController {
    private orderRepository = getRepository(Order);
    private establishmentRepository = getRepository(Establishment);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.findOne(request.params.id);
    }

    async save(request: RequestAuth, response: Response, next: NextFunction) {
        let data = request.body;

        const order = this.orderRepository.create(data);

        await this.orderRepository.save(order);

        return response.status(200).send("Order saved");
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let data = request.body;

        
    }
}