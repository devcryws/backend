import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Establishment } from "../entity/Establishment";
import { Category } from "../entity/Category";
import { RequestAuth } from "../services/Auth/Auth";
import { Product } from "../entity/Product";

export class ProductController {

    private productRepository = getRepository(Product);
    private establishmentRepository = getRepository(Establishment);
    private categoryRepository = getRepository(Category);

    async all(request: RequestAuth, response: Response, next: NextFunction) {
        const product = await this.productRepository.createQueryBuilder("product")
        .innerJoinAndSelect("product.category", "category")
        .getMany();

        console.log(product)
        const establishment = await this.establishmentRepository.findOne(request.userId)
        return this.productRepository.find({ establishment });
    }

    async one(request: RequestAuth, response: Response, next: NextFunction) {
        const category = await this.productRepository.findOne(request.params.id)
        const establishment = await this.establishmentRepository.findOne(request.userId)

        if(category.establishment != establishment)
            response.status(404).send("Not Found");
        else
            return this.productRepository.findOne(request.params.id);
    }

    async save(request: RequestAuth, response: Response, next: NextFunction) {
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId)
        const category = await this.categoryRepository.findOne(data.categoryId)

        data.establishment = establishment;
        data.category = category;
        //const existingProduct = await this.productRepository.createQueryBuilder("product")
           //       .where("product.name like :name", { name:`%${data.name}%` })
          //        .getOne();
const existingProduct = await this.productRepository.find({where: {name: data.name}});

        console.log(existingProduct)
        if(existingProduct)
            response.status(409).send("Complement already exists, try another name."); 
        else{
            await this.productRepository.save(data);

            response.status(200).send("Complement saved")
        }     
    }
    async update(request: RequestAuth, response: Response, next: NextFunction) {       
        let data = request.body;
        const establishment = await this.establishmentRepository.findOne(request.userId);
        const complementId:number = parseInt(request.params.id)

        let complementToUpdate = await this.productRepository.findOne(complementId, {where: { establishment }});
        if(complementToUpdate){
            complementToUpdate.name = data.name || complementToUpdate.name ;
            complementToUpdate.price = data.price || complementToUpdate.price;
            await this.productRepository.save(complementToUpdate);
            response.status(204).send("Updated complement.")
        }else
            response.status(404).send("Complement not found.");
    }

    async remove(request: RequestAuth, response: Response, next: NextFunction) {       
        const establishment = await this.establishmentRepository.findOne(request.userId)
        const complementId:number = parseInt(request.params.id)

        let complementToRemove = await this.productRepository.findOne(complementId, {where: { establishment }});

        if(complementToRemove){
            await this.productRepository.remove(complementToRemove);
            response.status(204).send("Category removed.")
        }else
            response.status(404).send("Category not found.")
    }
}