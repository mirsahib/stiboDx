import { Sequelize } from "sequelize";
import { User } from './user.models';
import { IRepository } from "../../interface/IRepository";

export default class UserRepository implements IRepository<User> {
    constructor(private readonly sequelize: Sequelize) { }

    // CREATE
    public async createUser(userData: { [key: string]: any }): Promise<User> {
        const user = await User.create(userData);
        return user;
    }
    public async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    }

    // READ
    public async getUserById(userId: string): Promise<User | null> {
        const user = await User.findByPk(userId);
        return user;
    }

    // UPDATE
    public async updateUser(userId: string, updatedUserData: { [key: string]: any }): Promise<[number, User[]]> {
        const result = await User.update(updatedUserData, {
            where: { id: userId },
            returning: true, // Return the updated user
        });
        return result;
    }

    // DELETE
    public async deleteUser(userId: string): Promise<number> {
        const result = await User.destroy({
            where: { id: userId },
        });
        return result;
    }
}