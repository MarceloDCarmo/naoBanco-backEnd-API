import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { AccountRepository } from "../repositories/AccountRepository"
import { PixRepository } from "../repositories/PixRepository"
//import { TransactionRepository } from "../repositories/TransactionRepository"
import { hash } from "bcryptjs"
import "express-async-errors";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class UserService {

    async createUser({name, email, admin, password} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);
        
        if(!email){
            throw new Error("Email Incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password : passwordHash,
        })
        await usersRepository.save(user);
        return user;
    }

    async DeleteUserAndALL(email : string) {
        const userRepository = getCustomRepository(UsersRepositories);
        try
        { //Validation for e-mail account.
            const user = await userRepository.findOne({email});
            if(!user){
                throw new Error("User no exists");
            }else
            {
                console.log(`User: ${user.email} - User Found`);
            }//Validation for e-mail account.


            //Get account and check if exist.
            const accountRepository = getCustomRepository(AccountRepository)         
            const accounts = await accountRepository.find({
                where: {
                    user: user.id
                },
            });

            if(accounts){
                //Delete All pix Key and All transactions.
                await accounts.forEach(accountToDelete => {

                    //Pix Check and Delete.
                    console.log(`User: ${user.email} - Check Pix Key to delete`);
                    const pixRepository = getCustomRepository(PixRepository);
                    const pixExistResult = pixRepository.findOne({
                        account: accountToDelete.account_number
                    })
                    if(pixExistResult)
                    {
                        pixRepository.delete({
                            account: accountToDelete.account_number
                        })
                        console.log(`User: ${user.email} - Delete Pix Keys Finished`);
                    }else
                    {
                        console.log(`User: ${user.email} - Not found Pix Keys to delete`);
                    }//Pix Check and Delete.

                    // //Transactions Check and Delete.
                    // console.log(`User: ${user.email} - Check Transactions to delete`);
                    // const transactionRepository = getCustomRepository(TransactionRepository);
                    // accounts.forEach(accountTransaction => {
                    //     console.log(`User: ${user.email} - Check Transactions to Account: ${accountToDelete.account_number}.${accountTransaction.account_number} `);
                    //     let transactionExistResult = transactionRepository.createQueryBuilder()
                    //                                                     .where("transaction.sender_account = :idSender", { idSender: accountToDelete.account_number })
                    //                                                     .andWhere("transaction.receiver_account = :idReceiver", { idReceiver: accountTransaction.account_number });
                        
                        
                    //     // findOne({
                    //     //     sender_account: accountToDelete.account_number,
                    //     //     receiver_account: accountTransaction.account_number
                    //     // })
                    //     if(!transactionExistResult)
                    //     {
                    //         console.log(`User: ${user.email} - No Transactions Deleted to ${accountToDelete.account_number} from ${accountTransaction.account_number}`);
                    //     }
                    //     else
                    //     {
                    //         console.log(`User: ${user.email} - ${transactionExistResult}`)
                    //         transactionRepository.delete({
                    //             sender_account: accountToDelete.account_number,
                    //             receiver_account: accountTransaction.account_number
                    //         })
                    //         console.log(`User: ${user.email} - Delete Transactions to ${accountToDelete.account_number} from ${accountTransaction.account_number}`);
                    //     }
                    // });
                    // console.log(`User: ${user.email} - Delete Transactions Finisheed`);
                    // //Transactions Check and Delete.

                });

                //Account Delete Ok.
                console.log(`User: ${user.email} - Accounts to delete`);
                await accountRepository.delete({
                     user: user.id
                })
                console.log(`User: ${user.email} - Accounts Deleted`);

                
            }else 
            {
                console.log(`User: ${user.email} - Don't have accounts.`);
            }
            
            //Delete User
            console.log(`User: ${user.email} to deleted`);    
            await userRepository.delete({
                email:email
            })
            return `User: ${user.email} and all information are deleted.`;
            
        }
        catch(e) {
            console.log(`Error: ${e.message}`); 
            throw new Error("Unable to delete user: " + e.message);
        }
    }

    async updateUser(email : string, attribute: string, value: string) {
        try
        { 
            //Get User
            const userRepository = getCustomRepository(UsersRepositories);
            const user = await userRepository.findOne({email});
            if(!user){
                throw new Error("User not found");
            }

            let userToUpdate = user;
            userToUpdate.updated_at = new Date();

            switch(attribute){
                case 'name':
                    userToUpdate.name = value;
                    break;
                case 'email':
                    userToUpdate.email = value;
                    break;
                case 'admin':
                    if(value === 'true'){
                        userToUpdate.admin = true;
                    }else{
                        userToUpdate.admin = false;
                    }
                    break;
                case 'password':
                    const passwordHash = await hash(value, 8);
                    userToUpdate.email = passwordHash;
                    break;
            }

            const result = await userRepository.save(userToUpdate)
            return result
            
        }
        catch(e) {
            console.log(`Error: ${e.message}`); 
            throw new Error("Unable to update: " + e.message);
        }
    }

    async getUser(email: string) {
        try
        { 
            //Get User
            const userRepository = getCustomRepository(UsersRepositories);
            const user = await userRepository.findOne({email});
            if(!user){
                throw new Error("User not found");
            }
            return user;
            
        }
        catch(e) {
            console.log(`Error: ${e.message}`); 
            throw new Error("Unable to get user: " + e.message);
        }
    }
}

export {UserService}