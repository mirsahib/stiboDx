
import { IService } from "../../interface/IService";
import { IRepository } from "../../interface/IRepository";
import { User } from "./user.models";

export default class UserService implements IService<User> {

    private repo: IRepository<User>
    constructor(repo: IRepository<User>) {
        this.repo = repo
    }
    create = async (data: User) => {
        await this.repo.createUser(data);
    }

    async readAll(): Promise<User[]> {
        return await this.repo.getAllUsers();
    }
    async readById(id: string): Promise<User | null> {
        return await this.repo.getUserById(id);
    }

    async update(id: string, data: User): Promise<void> {
        const [, updatedUsers] = await this.repo.updateUser(id, data);
        if (updatedUsers.length === 0) {
            throw new Error('User not found');
        }
    }

    async delete(id: string): Promise<void> {
        const deletedRows = await this.repo.deleteUser(id);
        if (deletedRows === 0) {
            throw new Error('User not found');
        }
    }

}