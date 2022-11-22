import {Request, Response } from "express";
import database_connection from '../rutas/database';
import cors from 'cors';

class IndexController{
    //Endponits
    public async read( req:Request,  res:Response ){
       //Get all user
       try{
       const url =req.query.pagina;
       if (url == null ){
            let number_register0: number =20;//Valor por defecto
            let inicial0 : number = 0;
            const sql0 = "SELECT * FROM libro Orders LIMIT ?, ?";
            const number_records0= "SELECT COUNT(codigo) FROM libro";
            const check_records0= await database_connection .query(number_records0);
            const check_data0= await database_connection .query(sql0,[inicial0,number_register0]);
            res.status(200).json({
                ok: true,
                msg: 'getUsuarios',
                result:check_data0,
                page: {
                    inicial0,
                    number_register0,
                    result:check_records0
                }
            });              
                  
        } else{
            //Páginación  
            let pagina:number=0;
            pagina=Number(req.query.pagina);
            if ((pagina >= 0)){
                let number_register1: number =4;
                let inicial1 : number = 0;
                inicial1=(pagina-1)*number_register1;
                const sql1 = "SELECT * FROM libro Orders LIMIT ?, ?";
                const number_records1= "SELECT COUNT(codigo) FROM libro";
                const check_records1= await database_connection .query(number_records1);
                const check_data1= await database_connection .query(sql1,[inicial1,number_register1]);
                res.status(200).json({
                    ok: true,
                    msg: 'getUsuarios',
                    result:check_data1,
                    page: {
                        inicial1,
                        number_register1,
                        result:check_records1
                    }
                }); 
            }else{
                res.status(500).json("Ingrese nuevamente el numero de pagina de tipo entero, ya que la asignación es incorrecta: ");
            }
        }}catch (error) 
        {
            res.status(500).send("Error: "+ error);
        }  
    }
    //Get a user for code
    public async find( req:Request,  res:Response ){
        try {
            const {codigo}=req.params;
            const sql2 = "SELECT * FROM libro WHERE codigo =?";
            const  check_data2 = await database_connection .query(sql2,[codigo]);
            //Condicional para verificar que el codigo ingresado es ó no el correcto
            if(check_data2.length >0){
                res.status(200).json({
                    message: "Codigo correcto",
                    IsSuccess: true,
                    result:check_data2
                });
            }else
            {
                res.status(500).json("ERROR:Ingrese nuevamente el codigo"); 
            }
        }catch (error) 
        {
        res.status(500).send("Error: "+ error);
        }       
    }
    //Create
    public async create( req:Request,  res:Response){
        try {
            const request_body0=req.body;
            const sql3 = "INSERT INTO libro(titulo,autor,fecha_publicacion,genero,valor_COP,paginas) VALUES (?,?,?,?,?,?)"
            const check_data3=await database_connection .query(sql3,[request_body0.titulo,request_body0.autor,request_body0.fecha_publicacion,request_body0.genero,request_body0.valor_COP,request_body0.paginas]);
            request_body0.codigo=check_data3.insertId;
            res.status(200).send({
                message: "Successfully added",
                IsSuccess: true,
                result: request_body0
            });
        } catch (error) {
        res.status(500).send("Error: "+ error);
        }         
    }
    //Delete
    public async delete( req:Request,  res:Response){
        try {
            const {codigo}=req.params;
            const sql4 = "DELETE FROM libro WHERE codigo =?";
            const check_data4= await database_connection .query(sql4,[codigo]);
            res.status(200).send({
                message: "Successfully added",
                IsSuccess: true,
                result:'' 
            });
        } catch (error) {
        res.status(500).send("Error: "+ error);
        }           
    }
    //Update
    public async update( req:Request,  res:Response){
        try {
            const request_body1=req.body;
            const {codigo}=req.params;
            const sql5 = "UPDATE libro SET titulo=?,autor=?,fecha_publicacion=?, genero= ?,valor_COP= ?, paginas=? WHERE codigo =?"
            const check_data5=await database_connection.query(sql5,[request_body1.titulo,request_body1.autor,request_body1.fecha_publicacion,request_body1.genero,request_body1.valor_COP,request_body1.paginas, codigo]);
            request_body1.codigo=check_data5.insertId;
            res.status(200).send({
                message: "Successfully added",
                IsSuccess: true,
                result:request_body1
            });
        } catch (error) {
        res.status(500).send("Error: "+ error);
        }           
    }
}
export const indexController=new IndexController();
