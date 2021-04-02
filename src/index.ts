import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {Establishment} from "./entity/Establishment";
import {Auth} from "./services/Auth/Auth"
require('dotenv').config();

const auth = new Auth();
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use(auth.verifyToken, function(req, res, next){
        console.log('Alguém está fazendo requisição a api ;)');
        next();
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(Establishment, {
    //     name: "Pizzaria do Pedro",
    //     logoUrl: "https://img2.gratispng.com/20180215/xzq/kisspng-pizza-pizza-logo-pizza-icon-5a857cee4496c8.044598621518697710281.jpg",
    //     address: "Rua inventada,123, Centro - Itanhaem - SP",
    //     email: "pizzariapedro@gmail.com",
    //     password: "12345678"
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
