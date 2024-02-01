import { Sequelize } from 'sequelize';
import { EnvironmentVariables } from './config/config';
interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dialect: string;
}

export class Database {
    private client: Sequelize;
    private static instance: Database;
    private constructor(config: EnvironmentVariables) {
        console.log("🚀 ~ Database ~ constructor ~ config:", config)
        this.client = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
            host: 'postgres',
            dialect: 'postgres',
            port: 5432,
        });
    }

    public static getInstance(config: EnvironmentVariables): Database {
        if (!Database.instance) {
            Database.instance = new Database(config);
        }

        return Database.instance;
    }

    public async connect(): Promise<Sequelize> {
        try {
            await this.client.authenticate();
            console.log('Connected to the database');
            return this.client;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.close();
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Error while disconnecting from the database:', error);
            throw error;
        }
    }

}
