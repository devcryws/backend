import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Category} from "../entity/Category";
import {Auth} from "../services/Auth/Auth";
import { Establishment } from "../entity/Establishment";

export class CategoryController {

    private categoryRepository = getRepository(Category);
    private establishmentRepository = getRepository(Establishment);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find({ establishment: request.userId });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId)

        data.establishment = establishment;

        const existingCategory = await this.categoryRepository.findOne({name: data.name});

        if(existingCategory)
            response.status(409).send("Category already exists, try another name."); 
        else{
            await this.categoryRepository.save(data);

            response.status(200).send("Category saved")
        }     
    }
    async update(request: Request, response: Response, next: NextFunction) {       
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId);

        let categoryToUpdate = await this.categoryRepository.findOne({id: request.params.id, establishment });

        if(categoryToUpdate){
            categoryToUpdate.name = data.name || categoryToUpdate.name ;
            categoryToUpdate.color = data.color || categoryToUpdate.color;
            categoryToUpdate.imageBGUrl = data.imageBGUrl || categoryToUpdate.imageBGUrl;
            await this.categoryRepository.save(categoryToUpdate);
            response.status(204).send("Updated category.")
        }else
            response.status(404).send("Category not found.");
    }

    async remove(request: Request, response: Response, next: NextFunction) {       
        const establishment = await this.establishmentRepository.findOne(request.userId)
        let categoryToRemove = await this.categoryRepository.findOne({id: request.params.id, establishment });

        if(categoryToRemove){
            await this.categoryRepository.remove(categoryToRemove);
            response.status(204).send("Category removed.")
        }else
            response.status(404).send("Category not found.")
    }
}