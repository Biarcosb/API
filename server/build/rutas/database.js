"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const database_connection = promise_mysql_1.default.createPool({
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: '1234',
    connectionLimit: 5,
    database: 'data1'
});
database_connection.getConnection()
    .then((connection) => {
    database_connection.releaseConnection(connection);
    console.log('conexion exitosa');
});
exports.default = database_connection;
