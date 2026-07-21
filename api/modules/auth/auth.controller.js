import executeQuery, { dbPool } from "../../services/dbService.js";
import { generateAccessToken, generateRefreshToken, generateBothTokens } from "../../services/jwtService.js";

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
                return res.status(401).json({ message: "Credenciales incorrectas" });

            // User exists but is not verified
            if (result[0].is_verified !== 1) 
                return res.status(403).json({ message: "Usuario no verificado" });

            // Check password
            let hash = result[0].password;
            let match = await bcrypt.compare(password, hash);

            // Contraseña incorrecta
            if (!match)
                return res.status(401).json({ message: "Credenciales incorrectas" });

            let payload = {
                id: result[0].user_id,
                is_admin: result[0].is_admin
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // 3. Setear el Refresh Token en una Cookie HTTP-Only segura
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,                                // No accesible por JS (Anti-XSS)
                secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
                sameSite: "strict",                            // Anti-CSRF
                maxAge: 7 * 24 * 60 * 60 * 1000                // Expiración en ms (7 días)
            });

            return res.status(200).json({
                status: "success",
                message: "Login exitoso",
                accessToken,
                user: {
                    id: result[0].user_id,
                    username: result[0].username,
                }
            });
        }    
        catch (error) 
        {
            console.log(error);
            return res.status(500).json({ message: "Error del servidor" });
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