"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/user', indexControllers_1.indexController.read);
        this.router.post('/user', indexControllers_1.indexController.create);
        this.router.delete('/user/:codigo', indexControllers_1.indexController.delete);
        this.router.put('/user/:codigo', indexControllers_1.indexController.update);
        this.router.get('/user/:codigo', indexControllers_1.indexController.find);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
