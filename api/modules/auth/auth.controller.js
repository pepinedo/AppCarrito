import executeQuery, { dbPool } from "../../services/dbService.js";
// import jwt from "jsonwebtoken";

class UsersController {

    login = async (req, res) => {
        try{
            const {email, password} = req.body
            console.log(email, password)
            let sql = "SELECT * FROM users WHERE email=? AND password=?;"
            let values = [email, password]
            const result = await executeQuery(sql, values)
            
            if(result[0]){
                console.log("EE")
                return res.status(200).json({"message":"Login con exito"})
            }
            res.status(401).json({
                "message":"Credenciales incorrectas."
            })
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }

    register = async (req, res) => {
        try{
            const {username, email, password} = req.body

            if (!username || !email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

            let sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?);";
            let values = [username, email, password];
            const result = await executeQuery(sql, values);

            res.status(200).json({
                message: "Usuario registrado con éxito.",
                userId: result.insertId
            });
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
}

export default new UsersController();