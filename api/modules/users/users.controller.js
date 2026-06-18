import executeQuery, { dbPool } from "../../services/dbService.js";
// import jwt from "jsonwebtoken";

class UsersController {

    getUserById = async (req, res) => {
        try{
            const {userId} = req.params

            let sql = "SELECT * FROM users WHERE userId=?;"
            let values = [userId]
            const result = await executeQuery(sql, values)
            const user = result[0]
            res.status(200).json(user)
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }

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
    
}

export default new UsersController();