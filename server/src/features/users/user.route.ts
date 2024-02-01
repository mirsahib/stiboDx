import { Express, NextFunction, Request, Response } from "express";
import { IService } from "../../interface/IService";
import { User } from "./user.models";

interface ExtendedRequest extends Request {
    user?: User
}
export default class UserRoutes {
    private app: Express
    private userService: IService<User>
    constructor(app: Express, service: IService<User>) {
        this.app = app
        this.userService = service
        this.registerRoutes()
    }

    private registerRoutes() {
        this.app.route('/api/users')
            .get(this.read)
            .post(this.create)
        this.app.route('/api/users/:id')
            .get(this.readOne)
            .put(this.update)
            .delete(this.delete)
        this.app.param('id', this.getId)
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.userService.create(req.body as User);
            console.log("🚀 ~ UserRoutes ~ create ~ req:", req.body)
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.log("🚀 ~ UserRoutes ~ create ~ error:", error)
            res.status(500).json("Internal Server Error")
        }
    }

    read = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.readAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }

    readOne = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const users = req.user;
            res.status(200).json(users);
        } catch (error) {
            console.log("🚀 ~ UserRoutes ~ readOne= ~ error:", error)
            res.status(500).json("Internal Server Error")
        }
    }

    update = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User;
            const updatedUser = await this.userService.update(user.id, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }

    delete = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const user = req.user as User;
            await this.userService.delete(user.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }
    getId = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            const user = await this.userService.readById(userId);
            if (user) {
                req.user = user; // Append user to req object
                next();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.log("🚀 ~ UserRoutes ~ getId= ~ error:", error)
            res.status(500).json("Internal Server Error")
        }
    }

}