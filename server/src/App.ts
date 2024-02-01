import { Express } from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import { initUserModel } from "./features/users/user.models";
import UserRepository from "./features/users/user.repository";
import UserService from "./features/users/user.service";
import UserRoutes from "./features/users/user.route";
import { Sequelize } from "sequelize";

export class Server {
    private app: Express;
    private dbClient: Sequelize;

    constructor(app: Express, dbClient: Sequelize) {
        this.app = app;
        this.dbClient = dbClient;
    }
    async configure() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.registerModels()
        // Add error handler middleware
    }

    async registerApi() {
        const userRepo = new UserRepository(this.dbClient)
        const userService = new UserService(userRepo)
        new UserRoutes(this.app, userService);
    }

    private registerModels() {
        initUserModel(this.dbClient)
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
}

export default Server