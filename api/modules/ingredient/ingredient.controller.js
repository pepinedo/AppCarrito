import executeQuery, { dbPool } from "../../services/dbService.js";
// import jwt from "jsonwebtoken";

class IngredientController {

    create = async (req, res) => {
        try{
            const {cartId, name} = req.body

            // 1º Comprobar si existe ingrediente con el mismo nombre
            let sql = "SELECT ingredientId, name FROM ingredients WHERE name=?;"
            let values = [name]
            const result = await executeQuery(sql, values)
            let ingredientId

            // 2º Si no existe, lo creas
            if(!result[0]){
                let sql2 = "INSERT INTO ingredients (name) VALUES (?);"
                let values2 = [name]
                const result2 = await executeQuery(sql2, values2)
                ingredientId = result2.inserId
            }else{
                ingredientId = result[0].ingredientId
            }

            // 3º Asignarlo al carrito
            let sql3 = "INSERT INTO ingredient_cart (cartId, ingredientId, isSelected) VALUES (?,?, true);"
            let values3 = [cartId, ingredientId]
            const result3 = await executeQuery(sql3, values3)

            console.log(result)

            res.status(200).json({
                "message": "Ingrediente creado con éxito",
                "status": "Ok",
                result
            })
        }
        catch (error) {
            // duplicado
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                return res.status(409).json({ 
                    message: "Este ingrediente ya ha sido añadido al carrito." 
                });
            }

            // Cualquier otro error (error 500)
            res.status(500).json({ message: "Error interno en el servidor." });
        }
    }

    toggle = async (req, res) =>{
        let {cartId, ingredientId} = req.body

        let sql = "UPDATE ingredient_cart SET isSelected = NOT isSelected WHERE cartId = ? AND ingredientId=?;"
        let values = [cartId, ingredientId]
        const result = await executeQuery(sql, values)

        try{
            res.status(200).json(result)
        }
        catch{
            res.status(500).json({ message: "Error interno en el servidor." });
        }
    }
}

export default new IngredientController();