import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Establishment} from "../entity/Establishment";
import {Auth} from "../services/Auth/Auth";

export class EstablishmentController {

    private establishmentRepository = getRepository(Establishment);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.establishmentRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.establishmentRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let data = request.body;

        let userName = await this.establishmentRepository.findOne({name: data.name});
        let userEmail = await this.establishmentRepository.findOne({email: data.email});
        if(userName || userEmail)
            response.status(500).send("User already exists, try another name and/or another email.")
        else{
            const auth = new Auth();

            data.password = auth.passwordEncrypt(data.password);

            let establishmentRes = await this.establishmentRepository.save(data);

            const token = auth.createToken(establishmentRes.id);

            response.json({auth: true, token})
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let establishmentToRemove = await this.establishmentRepository.findOne(request.params.id);
        await this.establishmentRepository.remove(establishmentToRemove);
    }

    async login(request: Request, response: Response, next: NextFunction){
        let data = request.body;

        let user = await this.establishmentRepository.findOne({email: data.email});
        if(user){
            const auth = new Auth();

            const passwordIsCorrect = auth.passwordCompare(data.password, user.password);

            if(!passwordIsCorrect)
                response.status(500).send("wrong password");
            else{
                const token = auth.createToken(data.id);
                response.json({auth: true, token})
            }
        }else
            response.status(500).send("User not found")
    }
}