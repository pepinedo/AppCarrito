import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()


// Esto debe ser const pero lo he cambiado por var por un error que estaba dando
export let dbPool;

const executeQuery = async (sql, values=[]) =>{
  let connection;
  try {
    if (!dbPool) {
        dbPool = mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          dateStrings: true
        });
      }
      connection =  await dbPool.getConnection();
      let [result] = await connection.query(sql, values);
      return result
  } 
  catch (error) {
      throw error;
  }
  finally{
      if (connection){
        connection.release()
        }
    }
}
export default executeQuery;


