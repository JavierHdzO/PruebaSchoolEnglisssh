import { request, response } from "express";
import { connection, executeQuery } from "../database/index.js";
import { hasher } from "../hepers/hash-password.js";


const getUsers = async(req = request, res = response) => {
    
    try {
        const [row] = await connection.execute(
            "SELECT * FROM Usuarios");
        
            res.json({
                users: row
            });
    } catch (error) {
        return res.status(500).json({
            message: "reporte al administrador"
        });
    }
        
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

        if(!row[1]){
            res.status(404).json({
                message:"Usuario no encontrado"
            });
        }

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
        
         const [row] = await connection.execute(
            "INSERT INTO Usuarios(Nombre, Apellidos, Usuario, Contrasena) VALUES(?,?,?,?)",
            [nombre, apellidos, usuario, paswordHashed]
        );


        res.json({
            user:{
                nombre,
                apellidos,
                usuario
            },
            ok:true
        });

    } catch (error) {
        res.status(500).json({
            message:"Reporte al administrador"
        })
    }

}

const updateUser = async(req, res) => {

    const { nombre, apellidos, usuario, contrasena } = req.body;
    const { id } = req.params;

    try {

        if(!id) return res.status(404).json({ message: "Usuario no encotrado", ok:false  })

        const paswordHashed = await hasher(contrasena);
        
         const [row] = await connection.execute(
            "UPDATE Usuarios SET Nombre = ?, Apellidos = ?, Usuario = ?, Contrasena = ? WHERE UsuarioId = ?",
            [nombre, apellidos, usuario, paswordHashed, id]
        );

        res.json({
            user:{
                nombre,
                apellidos,
                usuario
            },
            messsage: "Usuario actualizado",
            ok:true
        });

    } catch (error) {
        res.status(500).json({
            message:"Reporte al administrador"
        })
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.params;

    if(!id) res.status(404).json({ message: 'Usuario no encontrado', ok: false });

    try {

        const [row] = await connection.execute( 
            "DELETE FROM Usuarios WHERE UsuarioId = ?",
            [id]
          );
        

        if(row.affectedRows === 0){
            res.json({
                message: "El usuario no ha podido ser eliminado"
            });
        }

        res.json({
            message:"El usuario ha sido eliminado",
            ok: true
        })


    } catch (error) {
        res.status(500).json({
            message:"Reporte al administrador"
        })
    }
}

export  {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}