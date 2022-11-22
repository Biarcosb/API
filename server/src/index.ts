import express, {Application} from "express";
import indexRoures from './rutas/indexRoures';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";


class Index{
    public app: Application;
    constructor(){
        this.app=express();
        this.config();
        this.ruta();
    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));//Conexion entre interfaces
        this.app.use(cors());
        this.app.use(express.json());//Parceo, convierte todos los archivos de .json en java
        this.app.use(express.urlencoded({extended: false}));//Comunicacion Html
        
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }
    ruta():void{
        this.app.use(indexRoures);
    }
    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port',this.app.get('port'));
        });
    }
}
const index= new Index();
index.start();