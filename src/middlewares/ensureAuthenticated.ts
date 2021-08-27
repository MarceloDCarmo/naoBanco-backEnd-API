import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }
    const [,token] = authToken.split(" ");

    try {
        const decode = verify(token, "eaa474ac8948940e31539fcfba1cfa6f")
        //request.user_id = sub; // add Later (config types express)

        return next();
    }catch(err){
        return response.status(401).end();
    }


    
    return next();
}