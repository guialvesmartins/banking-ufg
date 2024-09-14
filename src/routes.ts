import { Router } from 'express'
import { CheckingAccountController } from './controllers/CheckingAccountController';
import { StatementController } from './controllers/StatementController';
import { AuthController } from './controllers/AuthController';

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const authController = new AuthController();
const path = "/checkingaccounts";

//CheckingAccounts
routes.get(path, authController.authMiddleware , checkingAccountController.getAll)
routes.get(`${path}/searchByName`, authController.authMiddleware ,checkingAccountController.getByName)
routes.get(`${path}/:id`, authController.authMiddleware , checkingAccountController.verifyIfExist ,checkingAccountController.getById)
routes.post(path, authController.authMiddleware , checkingAccountController.create)
routes.put(`${path}/:id`, authController.authMiddleware , checkingAccountController.verifyIfExist ,checkingAccountController.update)
routes.delete(`${path}/:id`, authController.authMiddleware , checkingAccountController.verifyIfExist , checkingAccountController.delete)

//Statement
routes.post(`${path}/:id/deposit`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.deposit)
routes.get(`${path}/:id/statement`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.getStatment)
routes.get(`${path}/:id/balance`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.getBalance)
routes.post(`${path}/:id/withdraw`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.withdraw)
routes.post(`${path}/:id/pix`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.pix)
routes.post(`${path}/:id/ted`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.ted)
routes.get(`${path}/:id/statement/period`, authController.authMiddleware , checkingAccountController.verifyIfExist ,statementController.getByPeriod)

export { routes }