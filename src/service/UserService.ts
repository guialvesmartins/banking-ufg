import { prisma } from "../prisma"
import { hash } from "bcryptjs";

class UserService {
    
    async create(name: string, email: string, password: string){
        try {
            const userExist = await prisma.user.findUnique({
                where: {email}
            });
            if(userExist){
                throw new Error("User already exists in the database.")
            }

            const hashPassword = await hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name, 
                    email, 
                    password
                }
            });
            return user;
        } catch (error) {
            console.error(`Error creating user. ${error}`)
            throw error;
        }
    }

    async getAll(){
        try {
            const users = await prisma.user.findMany();
            return users
        } catch (error) {
            console.log(`Error fetching users. ${error}`)
            throw error;
        }
    }

}

export { UserService }