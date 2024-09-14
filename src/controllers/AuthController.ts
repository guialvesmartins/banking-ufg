import { NextFunction, request, Request, response, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do arquivo .env

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

class AuthController {
    //keyToken = env("KEY_TOKEN");
    
    async authenticate( req: Request, res: Response){
        
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(400).json({error: "User or password invalid."});
            }

            const isValuePassword = await compare(password, user.password);

            if (!isValuePassword) {
                return res.status(400).json({error: "User or password invalid."});
            }
            const keyToken = process.env.KEY_TOKEN || "secret";

            const token = sign({id: user.id, email: user.email }, keyToken, { expiresIn: "1m"});
            
            return res.status(200).json({
                user: { 
                        id: user.id,
                        email
                    },
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }

    }

    async authMiddleware(req: Request, res: Response, next: NextFunction){
        try {
            const { authorization } = req.headers;
            const keyToken = process.env.KEY_TOKEN || "secret";

            if(!authorization) { 
                return res.status(401).json({ error: "Token not provider"});
            }

            const [, token] = authorization.split(" ");
            const decoded = verify(token,keyToken);
            const { id } = decoded as TokenPayload;
            console.log(`ID do Token: ${id}`)
            return next();

        } catch (error) {
            res.status(401).json({error: "Token invalid."});
        }
    }

}

export { AuthController }