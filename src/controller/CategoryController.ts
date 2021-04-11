import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Category} from "../entity/Category";
import {Auth, RequestAuth} from "../services/Auth/Auth";
import { Establishment } from "../entity/Establishment";

export class CategoryController {

    private categoryRepository = getRepository(Category);
    private establishmentRepository = getRepository(Establishment);

    async all(request: RequestAuth, response: Response, next: NextFunction) {
        const establishment = await this.establishmentRepository.findOne(request.userId)

        return this.categoryRepository.find({ establishment});
    }

    async one(request: RequestAuth, response: Response, next: NextFunction) {
        const category = await this.categoryRepository.findOne(request.params.id)
        const establishment = await this.establishmentRepository.findOne(request.userId)

        if(category.establishment != establishment)
            response.status(404).send("Not Found");
        else
            return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: RequestAuth, response: Response, next: NextFunction) {
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
    async update(request: RequestAuth, response: Response, next: NextFunction) {       
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId);
        const categoryId:number = parseInt(request.params.id)
        let categoryToUpdate = await this.categoryRepository.findOne(categoryId, {where: {establishment} });

        if(categoryToUpdate){
            categoryToUpdate.name = data.name || categoryToUpdate.name ;
            categoryToUpdate.color = data.color || categoryToUpdate.color;
            categoryToUpdate.category_image_url = data.imageBGUrl || categoryToUpdate.category_image_url;
            await this.categoryRepository.save(categoryToUpdate);
            response.status(204).send("Updated category.")
        }else
            response.status(404).send("Category not found.");
    }

    async remove(request: RequestAuth, response: Response, next: NextFunction) {       
        const establishment = await this.establishmentRepository.findOne(request.userId)
        const categoryId:number = parseInt(request.params.id)
        let categoryToRemove = await this.categoryRepository.findOne(categoryId ,{where: { establishment }});

        if(categoryToRemove){
            await this.categoryRepository.remove(categoryToRemove);
            response.status(204).send("Category removed.")
        }else
            response.status(404).send("Category not found.")
    }
}