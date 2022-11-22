import mysql from 'promise-mysql';

const database_connection = mysql.createPool({  
  
    host:'localhost',
    port: 3309,
    user: 'root',
    password:'1234',
    connectionLimit:5,
    database:'data1'
});
database_connection.getConnection()
  .then((connection: any)=> {
   database_connection.releaseConnection(connection);
   console.log('conexion exitosa');
});

export default database_connection;