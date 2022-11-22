"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../rutas/database"));
class IndexController {
    //Endponits
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get all user
            try {
                const url = req.query.pagina;
                if (url == null) {
                    let number_register0 = 20; //Valor por defecto
                    let inicial0 = 0;
                    const sql0 = "SELECT * FROM libro Orders LIMIT ?, ?";
                    const number_records0 = "SELECT COUNT(codigo) FROM libro";
                    const check_records0 = yield database_1.default.query(number_records0);
                    const check_data0 = yield database_1.default.query(sql0, [inicial0, number_register0]);
                    res.status(200).json({
                        ok: true,
                        msg: 'getUsuarios',
                        result: check_data0,
                        page: {
                            inicial0,
                            number_register0,
                            result: check_records0
                        }
                    });
                }
                else {
                    //Páginación  
                    let pagina = 0;
                    pagina = Number(req.query.pagina);
                    if ((pagina >= 0)) {
                        let number_register1 = 4;
                        let inicial1 = 0;
                        inicial1 = (pagina - 1) * number_register1;
                        const sql1 = "SELECT * FROM libro Orders LIMIT ?, ?";
                        const number_records1 = "SELECT COUNT(codigo) FROM libro";
                        const check_records1 = yield database_1.default.query(number_records1);
                        const check_data1 = yield database_1.default.query(sql1, [inicial1, number_register1]);
                        res.status(200).json({
                            ok: true,
                            msg: 'getUsuarios',
                            result: check_data1,
                            page: {
                                inicial1,
                                number_register1,
                                result: check_records1
                            }
                        });
                    }
                    else {
                        res.status(500).json("Ingrese nuevamente el numero de pagina de tipo entero, ya que la asignación es incorrecta: ");
                    }
                }
            }
            catch (error) {
                res.status(500).send("Error: " + error);
            }
        });
    }
    //Get a user for code
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo } = req.params;
                const sql2 = "SELECT * FROM libro WHERE codigo =?";
                const check_data2 = yield database_1.default.query(sql2, [codigo]);
                //Condicional para verificar que el codigo ingresado es ó no el correcto
                if (check_data2.length > 0) {
                    res.status(200).json({
                        message: "Codigo correcto",
                        IsSuccess: true,
                        result: check_data2
                    });
                }
                else {
                    res.status(500).json("ERROR:Ingrese nuevamente el codigo");
                }
            }
            catch (error) {
                res.status(500).send("Error: " + error);
            }
        });
    }
    //Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request_body0 = req.body;
                const sql3 = "INSERT INTO libro(titulo,autor,fecha_publicacion,genero,valor_COP,paginas) VALUES (?,?,?,?,?,?)";
                const check_data3 = yield database_1.default.query(sql3, [request_body0.titulo, request_body0.autor, request_body0.fecha_publicacion, request_body0.genero, request_body0.valor_COP, request_body0.paginas]);
                request_body0.codigo = check_data3.insertId;
                res.status(200).send({
                    message: "Successfully added",
                    IsSuccess: true,
                    result: request_body0
                });
            }
            catch (error) {
                res.status(500).send("Error: " + error);
            }
        });
    }
    //Delete
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo } = req.params;
                const sql4 = "DELETE FROM libro WHERE codigo =?";
                const check_data4 = yield database_1.default.query(sql4, [codigo]);
                res.status(200).send({
                    message: "Successfully added",
                    IsSuccess: true,
                    result: ''
                });
            }
            catch (error) {
                res.status(500).send("Error: " + error);
            }
        });
    }
    //Update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request_body1 = req.body;
                const { codigo } = req.params;
                const sql5 = "UPDATE libro SET titulo=?,autor=?,fecha_publicacion=?, genero= ?,valor_COP= ?, paginas=? WHERE codigo =?";
                const check_data5 = yield database_1.default.query(sql5, [request_body1.titulo, request_body1.autor, request_body1.fecha_publicacion, request_body1.genero, request_body1.valor_COP, request_body1.paginas, codigo]);
                request_body1.codigo = check_data5.insertId;
                res.status(200).send({
                    message: "Successfully added",
                    IsSuccess: true,
                    result: request_body1
                });
            }
            catch (error) {
                res.status(500).send("Error: " + error);
            }
        });
    }
}
exports.indexController = new IndexController();
