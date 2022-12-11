import "reflect-metadata";
import { DataSource } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

const app = express()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "db_tasks",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
})

AppDataSource.initialize()

app.use(bodyParser.json())
app.use(routes)

app.listen(3333)