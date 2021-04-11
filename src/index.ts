require('dotenv').config();

import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
const morgan = require('morgan')
const path = require("path");
import {Request, Response} from "express";
import {Routes} from "./routes";
import {Auth} from "./services/Auth/Auth"
import { connectionConfig } from "./database/connectionConfig";
import upload from "./controller/UploadController";
import { Category } from "./entity/Category";
import {Establishment} from "./entity/Establishment";
import { Complement } from "./entity/Complement";
import { Product } from "./entity/Product";
const auth = new Auth();
createConnection(connectionConfig).then(async connection => {

    // create express app
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'))
    app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
    app.use(auth.verifyToken, function(req, res, next){
        console.log('Alguém está fazendo requisição a api ;)');
        next();
    });
    app.use(upload)

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
    
    connection.manager.create(Establishment); 
    connection.manager.create(Category); 
    connection.manager.create(Complement); 
    connection.manager.create(Product); 

    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
