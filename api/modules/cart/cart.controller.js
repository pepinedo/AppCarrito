import executeQuery, { dbPool } from "../../services/dbService.js";
// import jwt from "jsonwebtoken";

class CartController {

    create = async (req, res) => {
        try{
            const {userId, name} = req.body

            let sql = "INSERT INTO carts (name, description) VALUES (?,?);"
            let values = [name, ""]
            const result = await executeQuery(sql, values)
            const cartId = result.insertId;

            let sql2 = "INSERT INTO user_cart (userId, cartId) VALUES (?,?);"
            let values2 = [userId, cartId]
            const result2 = await executeQuery(sql2, values2)

            res.status(200).json({
                "message": "Carrito creado con éxito",
                "status": "Ok"
            })
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }

    allIngredients = async(req, res)=>{
        try{
            let {cartId} = req.params

            let sql = `
                SELECT i.ingredientId, i.name, i.details, ic.isSelected
                FROM ingredients i
                INNER JOIN ingredient_cart ic ON i.ingredientId = ic.ingredientId
                WHERE ic.cartId = ?
            `;
            
            let values = [cartId]
            const result = await executeQuery(sql, values)

            res.status(200).json(result)
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
}

export default new CartController();