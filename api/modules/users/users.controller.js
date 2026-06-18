import executeQuery, { dbPool } from "../../services/dbService.js";
// import jwt from "jsonwebtoken";

class UsersController {

    getAllUsers = async (req, res) => {
        try{
            let sql = "SELECT * FROM users;"
            const result = await executeQuery(sql);
            const users = result
            res.status(200).json(users);
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }

    obtenerUsuariosFalsos = async (req, res) => {
        try{
            const usuariosFalsos = [
                { userId: 1, username: 'juan_perez', email: 'juan.perez@example.com', password: 'P4ssw0rd!' },
                { userId: 2, username: 'maria_gomez', email: 'maria.gomez@example.com', password: 'P4ssw0rd!' },
                { userId: 3, username: 'carlos_mendoza', email: 'carlos.mendoza@example.com', password: 'P4ssw0rd!' },
                { userId: 4, username: 'ana_martinez', email: 'ana.martinez@example.com', password: 'P4ssw0rd!' },
                { userId: 5, username: 'lucas_silva', email: 'lucas.silva@example.com', password: 'P4ssw0rd!' }
            ];

            res.status(200).json(usuariosFalsos);
        }
        catch{
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
}

export default new UsersController();