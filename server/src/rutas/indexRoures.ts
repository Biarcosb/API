import { Router } from "express";
import { indexController } from '../controllers/indexControllers';
import {Request, Response } from "express";

class IndexRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/user',indexController.read);
        this.router.post('/user',indexController.create);
        this.router.delete('/user/:codigo',indexController.delete);
        this.router.put('/user/:codigo',indexController.update);
        this.router.get('/user/:codigo',indexController.find);
    }
}
const indexRoutes =new IndexRoutes();
export default indexRoutes.router;