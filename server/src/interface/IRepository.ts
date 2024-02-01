export interface IRepository<T> {
    createUser(userData: { [key: string]: any }): Promise<T>
    getUserById(userId: string): Promise<T | null>
    getAllUsers(): Promise<T[]>
    updateUser(userId: string, updatedUserData: { [key: string]: any }): Promise<[number, T[]]>
    deleteUser(userId: string): Promise<number>
}