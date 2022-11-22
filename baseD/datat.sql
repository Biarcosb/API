create database data1;
use data1;
create table libro(
    codigo int primary key auto_increment,
    titulo varchar(100),
    autor varchar(100),
    fecha_publicacion varchar(100),
    genero varchar(100),
    valor_COP double,
    paginas int
)