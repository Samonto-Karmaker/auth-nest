import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import * as path from "path";

config(); // Load environment variables from .env file

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host:
        process.env.NODE_ENV === "development"
            ? process.env.DB_HOST
            : process.env.DB_HOST_PROD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.resolve(__dirname, "..", "**", "*.entity.{ts,js}")],
    synchronize: process.env.NODE_ENV === "development",
};
