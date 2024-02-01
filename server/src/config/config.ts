import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define TypeScript types for environment variables
export interface EnvironmentVariables {
    SERVER_PORT: number;
    PGADMIN_DEFAULT_EMAIL: string
    PGADMIN_DEFAULT_PASSWORD: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
}

// Validate and export environment variables
const env: EnvironmentVariables = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT ?? '3000', 10) || 3000,
    PGADMIN_DEFAULT_EMAIL: process.env.PGADMIN_DEFAULT_EMAIL ?? 'admin@localhost',
    PGADMIN_DEFAULT_PASSWORD: process.env.PGADMIN_DEFAULT_PASSWORD ?? 'admin',
    POSTGRES_USER: process.env.POSTGRES_USER ?? 'admin',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'admin',
    POSTGRES_DB: process.env.POSTGRES_DB ?? 'admin'
};

export default env;
