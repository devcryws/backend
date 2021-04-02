const jwt =require("jsonwebtoken");
import {NextFunction, Request, Response} from "express";
const bcrypt = require("bcrypt");

interface payload {
  id: number,
  iat: number, 
  exp: number 
}

const doNotValidateToken = (req: Request) => {
  return req.originalUrl === '/establishments/login' ||  (req.originalUrl === '/establishments' && req.method == 'POST');
}

export class Auth {
  verifyToken(req:Request, res:Response, next:NextFunction){
    if(doNotValidateToken(req))
      return next();
 
    let token = req.headers['authorization'];  

    if (!token)
      return res.status(403).send({ auth: false, message: 'Não foi fornecido o Token.' });
    else 
      token = token.replace('Bearer ','');    

    jwt.verify(token, process.env.SECRET, (err, decoded:payload) => {
        if (err)
          return res.status(500).send({ auth: false, message: 'Token inválido, realize a autenticação novamente.' });

        // if everything good, save to request for use in other routes                
        req.userId = decoded.id
        next();
      });
  }
  createToken(establishmentId){
    return jwt.sign({ id: establishmentId }, process.env.SECRET, {
      expiresIn: 43200, //Tempo que expira a chave
    });
  }
  passwordEncrypt(password){
    return bcrypt.hashSync(password, 8);
  }
  passwordCompare(plaintextPassword, hash){
    return bcrypt.compareSync(plaintextPassword, hash);
  }
} 



