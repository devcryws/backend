import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Complement} from "../entity/Complement";
import { Establishment } from "../entity/Establishment";
import { Category } from "../entity/Category";
import { RequestAuth } from "../services/Auth/Auth";

export class ComplementController {

    private complementRepository = getRepository(Complement);
    private establishmentRepository = getRepository(Establishment);
    private categoryRepository = getRepository(Category);

    async all(request: RequestAuth, response: Response, next: NextFunction) {
        const establishment = await this.establishmentRepository.findOne(request.userId)
        return this.complementRepository.find({ establishment });
    }

    async one(request: RequestAuth, response: Response, next: NextFunction) {
        const category = await this.complementRepository.findOne(request.params.id)
        const establishment = await this.establishmentRepository.findOne(request.userId)

        if(category.establishment != establishment)
            response.status(404).send("Not Found");
        else
            return this.complementRepository.findOne(request.params.id);
    }

    async save(request: RequestAuth, response: Response, next: NextFunction) {
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId)
        const category = await this.categoryRepository.findOne(data.categoryId)

        data.establishment = establishment;
        data.category = category;
        const existingComplement = await this.complementRepository.findOne({name: data.name});

        if(existingComplement)
            response.status(409).send("Complement already exists, try another name."); 
        else{
            await this.complementRepository.save(data);

            response.status(200).send("Complement saved")
        }     
    }
    async update(request: RequestAuth, response: Response, next: NextFunction) {       
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId);
        const complementId:number = parseInt(request.params.id)

        let complementToUpdate = await this.complementRepository.findOne(complementId, {where: { establishment }});
        if(complementToUpdate){
            complementToUpdate.name = data.name || complementToUpdate.name ;
            complementToUpdate.price = data.price || complementToUpdate.price;
            await this.complementRepository.save(complementToUpdate);
            response.status(204).send("Updated complement.")
        }else
            response.status(404).send("Complement not found.");
    }

    async remove(request: RequestAuth, response: Response, next: NextFunction) {       
        const establishment = await this.establishmentRepository.findOne(request.userId)
        const complementId:number = parseInt(request.params.id)

        let complementToRemove = await this.complementRepository.findOne(complementId, {where: { establishment }});

        if(complementToRemove){
            await this.complementRepository.remove(complementToRemove);
            response.status(204).send("Category removed.")
        }else
            response.status(404).send("Category not found.")
    }
}