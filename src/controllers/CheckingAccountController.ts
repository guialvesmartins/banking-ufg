import { NextFunction, Request, Response } from "express";
import { CheckingAccountService } from "../service/CheckingAccountService";

class CheckingAccountController {

    private checkingAccontService: CheckingAccountService;

    constructor() {
        this.checkingAccontService = new CheckingAccountService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const {name, email, number} = req.body;
            const validation = this.isValidNameAndEmailAndNumber(name, email, number)
            if(!validation.isValid){
                return res.status(400).json({error: validation.msg});
            }
            const checkingAcconunt = await this.checkingAccontService.create(name, email, number);
            return res.status(201).json(checkingAcconunt)
        } catch (error) {
            this.handleError(res, error,"Error creating checkingAcconunt");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            const {name, email, number} = req.body;
            const validation = this.isValidNameAndEmailAndNumber(name, email, number)
            if(!validation.isValid){
                return res.status(400).json({error: validation.msg});
            }
            const checkingAcconunt = await this.checkingAccontService.update(idCheckingAccount,name, email, number);
            return res.status(201).json(checkingAcconunt)
        } catch (error) {
            this.handleError(res, error,"Error updating checkingAcconunt");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            await this.checkingAccontService.delete(idCheckingAccount);
            return res.status(204).json();
        } catch (error) {
            this.handleError(res, error,"Error deleting checkingAcconunt");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const checkingAccounts = await this.checkingAccontService.getAll();
            return res.status(200).json(checkingAccounts);
        } catch (error) {
            this.handleError(res, error,"Error fetching checkingAcconunt");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id
            const checkingAccount = this.checkingAccontService.getById(idCheckingAccount);
            if(!checkingAccount){
                return res.status(404).json({error: "Checking not found"});
            }
            return res.status(200).json(checkingAccount);
        } catch (error) {
            this.handleError(res, error,"Error fetching getById checkingAcconunt");
        }
    }
    
    verifyIfExist = async(req :Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const checkingAcconunt = await this.checkingAccontService.getById(id)

            if(!checkingAcconunt) {
                return res.status(400).json({error: "CheckingAccount not found."})
            }
            return next();
        } catch (error) {
            this.handleError(res, error,"Error verify if exists checkingAcconunt");
        }
    }

    getByName = async (req: Request, res: Response) => {
        try {
            const {name} = req.query;
            const checkingAcconunt = await this.checkingAccontService.getByName(name as string);
            return res.status(200).json(checkingAcconunt);
        } catch (error) {
            this.handleError(res, error, "Error fechting by name chechingAccount.")
        }
    }

    private isValidNameAndEmailAndNumber(name: any, email: any, number: any){
        if(typeof name !== "string" || name.trim().length == 0 ){
            return { isValid: false, msg: "Invalid name: must be a non empty string"}
        }
        if(typeof email !== "string" || email.trim().length == 0 ){
            return { isValid: false, msg: "Invalid email: must be a non empty string"}
        }
        if(typeof number !== "string" || number.trim().length == 0 ){
            return { isValid: false, msg: "Invalid number: must be a non empty string"}
        }
        return {isValid : true}
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}.${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({ error: "An unexpected error ocurred." });
        }

    }
}

export { CheckingAccountController }