import { request, response } from "express";
import { connection, executeQuery } from "../database/index.js";
import { hasher } from "../hepers/hash-password.js";


const getUsers = async(req = request, res = response) => {
    
    connection.query(
        "SELECT * FROM Usuarios",
        (err, results) => {

            if(err){
                return res.json({
                    message: "Internal Server error",
                    "ok":false
                });
            }

            res.json({
                usuarios: results,
                ok: true
            })
         }
        );
     

}

const getUser = async(req, res) => {

    const {id} = req.params;

    if(!id) return res.status(400).json({  
            message: "Parametro Id no encontrado",
            ok: false 
        })

    try {
        
        const [row] = await connection.execute(
            "SELECT UsuarioId, Nombre, Apellidos, Usuario FROM Usuarios WHERE UsuarioId = ? ",
            [id]
        
        )

        

        res.json({
            user: row ,
            ok: true
        });
    } catch (error) {
        res.status.json({
            message: "Reporte al administrador"
        })
    }
}

const createUser = async(req, res) => {

    const { nombre, apellidos, usuario, contrasena } = req.body;

    try {

        const paswordHashed = await hasher(contrasena);
        
         await sconnection.execute(
            "INSERT INTO Usuarios(Nombre, Apellidos, Usuario, Contrasena) VALUES(?,?,?,?)",
            [nombre, apellidos, usuario, paswordHashed],
            async (error, results) => {
                res.json({
                    user: results
                })
            }
        );

    } catch (error) {
        res.status(500).json({
            message:"Reporte al administrador"
        })
    }

}

const updateUser = async(req, res) => {

}

const deleteUser = async(req, res) => {

}

export  {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}