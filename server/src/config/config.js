import { config } from "dotenv";

config();

export default {
    development: {
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.NAME_DB,
        host: process.env.HOST_DB || "127.0.0.1",
        port: process.env.PORT_DB || 3306,
        dialect: "mysql"
    },
    production: {
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.NAME_DB,
        host: process.env.HOST_DB || "127.0.0.1",
        port: process.env.PORT_DB || 3306,
        dialect: "mysql"
    },
};
