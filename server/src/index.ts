import Server from "./App";
import express from 'express'
import { Database } from './Database'
import dbConfig from './config/config'
import { initUserModel } from "./features/users/user.models";
import UserRepository from "./features/users/user.repository";
import UserService from "./features/users/user.service";
import UserRoutes from "./features/users/user.route";

const app = express();
const port = parseInt(process.env.SERVER_PORT as string) || 3001;

// Call the function to connect to MongoDB
async function startServer() {
    try {
        const database = Database.getInstance(dbConfig);
        const dbClient = await database.connect();
        const server = new Server(app, dbClient);
        await server.configure();
        await server.registerApi()
        server.listen(port);
    } catch (error) {
        console.log("🚀 ~ startServer ~ error:", error)
    }
}

startServer();
