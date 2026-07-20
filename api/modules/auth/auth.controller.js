import executeQuery, { dbPool } from "../../services/dbService.js";
import jwt from "jsonwebtoken";

class UsersController {

    login = async (req, res) => {
        /* to do: validación login front y back */
        const { email, password } = req.body;

        // First check if the user exists without verification constraint
        let sql = "SELECT * FROM user WHERE email = ?";
        let values = [email];

        try 
        {
            const result = await executeQuery(sql, values);

            // User doesn't exist
            if (result.length === 0)
                res.status(401).json({ message: "Credenciales incorrectas" });
            else 
            {
                // User exists but is not verified
                if (result[0].is_verified !== 1) 
                {
                    res.status(403).json({ message: "Usuario no verificado" });
                    return;
                }
            }

            // Check password
            let hash = result[0].password;
            let match = await bcrypt.compare(password, hash);

            if (!match)
                res.status(401).json({ message: "Credenciales incorrectas" });
            else {
                let payload = {
                    id: result[0].user_id,
                    is_admin: result[0].is_admin
                };
                const token = jwt.sign(payload, process.env.TOKEN_KEY, {
                    expiresIn: "2d",
                });
                res.status(200).json(token);
            }
        }    
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: "Error del servidor" });
        }
    };

    register = async (req, res) => {
        const { username, email, password } = req.body;

        let sql = "INSERT INTO user (username, email, password) VALUES (?,?,?,?,?)";

        try 
        {
            let hash = await bcrypt.hash(password, 10);
            let values = [username, email, hash];

            const result = await executeQuery(sql, values);

            const token = await new Promise((resolve, reject) => {
                jwt.sign(
                { id: result.insertId },
                process.env.TOKEN_KEY_CONFIRM_REGISTER,
                {},
                (error, token) => {
                    if (error) reject(error);
                    resolve(token);
                }
                );
            });

            let mailConfig = {
                email,
                user_name,
                last_name,
                token,
                typeEmail: "confirmUser",
            };

            await sendMail(mailConfig);

            res.status(200).json("Registro con éxito");
        } 
        catch (error) 
        {
            console.error("Error en el registro:", error);

            // Manejo de error por email duplicado
            //ER_DUP_ENTRY es un código de error de MySQL que significa "entrada duplicada"
            if (error.code === "ER_DUP_ENTRY")
                return res.status(400).json({ message: "Email already registered" });

            res.status(500).json({ message: "Error en el servidor" });
        }
    };
}

export default new UsersController();