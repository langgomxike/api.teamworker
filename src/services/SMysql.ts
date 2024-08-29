import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
import { log } from "./SLog";

export default class SMysql {
    private static connection: Connection;

    static getConnection(): Connection {
        if (!this.connection) {

            const user = dotenv.config().parsed?.MYSQL_USER ?? "root";
            const password = dotenv.config().parsed?.MYSQL_PASSWORD ?? "";
            const database = dotenv.config().parsed?.MYSQL_DATABASE ?? "teamworker";
            const port = +(dotenv.config().parsed?.MYSQL_PORT ?? 3306);

            log(console.log, "Check mysql's environment variables", "show mysql environment variables", {
                user: user,
                password: password,
                database: database,
                port: port,
            });

            this.connection = mysql.createConnection({
                user: user,
                password: password,
                database: database,
                port: port,
            });
        }

        // check connection status
        this.connection.connect(error => {
            if (error) {
                log(console.error, "MYSQL Connection Error", "Cannot create connection with database in docker", error ?? {});
            } else {
                log(console.info, "MYSQL Connection", "Created connection with database in docker");
            }
        });

        return this.connection;
    }
}