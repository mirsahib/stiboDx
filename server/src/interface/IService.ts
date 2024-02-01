import { Request, Response } from "express"
import { User } from "../features/users/user.models"

export interface IService<T> {
    create(data: T): Promise<void>
    readAll(): Promise<T[]>
    readById: (id: string) => Promise<T | null>
    update(id: string, data: T): Promise<void>
    delete(id: string): Promise<void>
}