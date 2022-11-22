"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoures_1 = __importDefault(require("./rutas/indexRoures"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Index {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.ruta();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev')); //Conexion entre interfaces
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //Parceo, convierte todos los archivos de .json en java
        this.app.use(express_1.default.urlencoded({ extended: false })); //Comunicacion Html
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    ruta() {
        this.app.use(indexRoures_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const index = new Index();
index.start();
