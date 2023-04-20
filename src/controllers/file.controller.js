import { request, response } from 'express';
import { uploadFile } from '../hepers/upload-files.js';

export const uploadFiles = async(req =  request, res = response) => {
    
    
    try {
        
        const objectFile = await uploadFile(req.files);

        const { pathCarga, nombreTemporal} = objectFile;

        const path = process.env.DOMAIN + ':' + process.env.PORT + '/' + nombreTemporal;

        return res.json({
            path: path,
            ok: true
        })


    } catch (error) {
        return res.status(500).json({
            message: "Reporte al administrador",
            ok: false
        });
    }
}

