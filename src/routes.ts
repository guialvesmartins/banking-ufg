import { Router } from 'express'
import { CheckingAccountController } from './controllers/CheckingAccountController';
import { StatementController } from './controllers/StatementController';

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const path = "/checkingaccounts";

//CheckingAccounts
routes.get(path, checkingAccountController.getAll)
routes.get(`${path}/:id`, checkingAccountController.verifyIfExist ,checkingAccountController.getById)
routes.post(path, checkingAccountController.create)
routes.put(`${path}/:id`, checkingAccountController.verifyIfExist ,checkingAccountController.update)
routes.delete(`${path}/:id`, checkingAccountController.verifyIfExist , checkingAccountController.delete)

//Statement
routes.post(`${path}/:id/deposit`, checkingAccountController.verifyIfExist ,statementController.deposit)
routes.get(`${path}/:id/statement`, checkingAccountController.verifyIfExist ,statementController.getStatment)
routes.get(`${path}/:id/balance`, checkingAccountController.verifyIfExist ,statementController.getBalance)
routes.post(`${path}/:id/withdraw`, checkingAccountController.verifyIfExist ,statementController.withdraw)
routes.post(`${path}/:id/pix`, checkingAccountController.verifyIfExist ,statementController.pix)
routes.post(`${path}/:id/ted`, checkingAccountController.verifyIfExist ,statementController.ted)
routes.get(`${path}/:id/statement/period`, checkingAccountController.verifyIfExist ,statementController.getByPeriod)


export { routes }