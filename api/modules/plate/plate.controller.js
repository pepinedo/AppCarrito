import executeQuery, { dbPool } from "../../services/dbService.js";

class PlateController {
    byCartId = async (req, res) => {
        try{
            const {cartId} = req.params

            let sql = "SELECT p.* FROM plates p INNER JOIN plate_cart pc ON p.plateId = pc.plateId WHERE pc.cartId = ?;"
            let values = [cartId]
            const result = await executeQuery(sql, values)
            const plates = result
            res.status(200).json(plates)
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    getPlateById = async (req, res) => {
        try{
            const {plateId} = req.params
            // Obtener datos del plato
            let sql = "SELECT * FROM plates WHERE plateId=?;"
            let values = [plateId]
            const result = await executeQuery(sql, values)
            const plate = result[0]

            // Obtener ingredientes asociados
            let sqlIng = "SELECT i.* FROM ingredients i INNER JOIN plate_ingredient pi ON i.ingredientId = pi.ingredientId WHERE pi.plateId = ?;"
            let valuesIng = [plateId]
            const ingredients = await executeQuery(sqlIng, valuesIng)

            res.status(200).json({ plate, ingredients })
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    createPlate = async (req, res) => {
        try{
            const {cartId, name, description} = req.body

            let sql = "INSERT INTO plates (name, description) VALUES (?, ?);"
            let values = [name, description]
            const result = await executeQuery(sql, values)

            // Obtener el id del plato creado y registrar la relación en user_plate
            const plateId = result.insertId
            if (plateId) {
                let sqlRel = "INSERT INTO plate_cart (cartId, plateId) VALUES (?, ?);"
                let valuesRel = [cartId, plateId]
                await executeQuery(sqlRel, valuesRel)
            }

            res.status(201).json({ message: "Plato creado exitosamente.", plateId })
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    addIngredientToPlate = async (req, res) => {
        try{
            const {plateId, ingredientId} = req.body

            let sql = "INSERT INTO plate_ingredient (plateId, ingredientId) VALUES (?, ?);"
            let values = [plateId, ingredientId]
            const result = await executeQuery(sql, values)
            res.status(201).json({ message: "Ingrediente agregado al plato exitosamente."})
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    removeIngredientFromPlate = async (req, res) => {
        try{
            const {plateId, ingredientId} = req.body

            let sql = "DELETE FROM plate_ingredients WHERE plateId=? AND ingredientId=?;"
            let values = [plateId, ingredientId]
            const result = await executeQuery(sql, values)
            res.status(200).json({ message: "Ingrediente eliminado del plato exitosamente."})
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    getIngredientsByPlateId = async (req, res) => {
        try{
            const { plateId } = req.params

            let sql = "SELECT i.* FROM ingredients i INNER JOIN plate_ingredient pi ON i.ingredientId = pi.ingredientId WHERE pi.plateId = ?;"
            let values = [plateId]
            const result = await executeQuery(sql, values)
            const ingredients = result
            res.status(200).json(ingredients)
        }
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
    selectAllIngredients = async (req, res) => {
        try{
            let sql = "SELECT * FROM ingredients;"
            let values = []
            const result = await executeQuery(sql, values)
            const ingredients = result
            res.status(200).json(ingredients)
        }  
        catch (error){
            console.log(error)
            res.status(500).json({ message: "Error en el servidor."})
        }
    }
}

export default new PlateController();