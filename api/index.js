import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import createError from 'http-errors';
import { fileURLToPath } from 'url';
import cors from 'cors';
import logger from 'morgan';
import { log } from 'console';
import usersRoutes from './modules/users/users.routes.js';

//----------------------------------------------------------------
// Para la ruta relativa de public
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//----------------------------------------------------------------
// Configurar dotenv apuntando a la carpeta config que está un nivel arriba
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });
//----------------------------------------------------------------


//----------------------------------------------------------------
// LA APP
const PORT = process.env.PORT || 3000;
const app = express();
//----------------------------------------------------------------


//----------------------------------------------------------------
// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------------------
//----------------------------------------------------------------
// endpoints
app.use("/users", usersRoutes)

app.get('/', (req, res) => {
  console.log("HOLI");
  res.status(200).json({
      mensaje: "TODO OKEI",
  });
});
//----------------------------------------------------------------



// ------------------------
// get y set de ejemplo
// ------------------------
app.get('/users', (req, res)=>{

  var user = [
    {
      "userId":1,
      "username":"Paquito"
    }
  ]
  try{
    res.status(200).json({
      user
    })

  }
  catch (ex){
    console.log(ex)
    res.status(500);
  }
})

app.post('/users', (req, res)=>{
  var ingredient = req.body

  try{
    res.status(200).json(ingredient)
  }
  catch (ex){
    console.log(ex)
    res.status(500);
  }
})








//----------------------------------------------------------------
// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});
//----------------------------------------------------------------
// --------- ERRORES ------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json(err.message);
});
//----------------------------------------------------------------
export default app;