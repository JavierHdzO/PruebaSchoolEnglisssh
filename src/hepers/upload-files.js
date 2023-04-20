import { v4 as uuidv4 } from 'uuid';

export const uploadFile =  (requestFiles, extensionAllowed = ["mp4","jpg","png","mp4"]) => {
        return new Promise( (res, rej) => {

            const { file } = requestFiles;

            const nameCut = file.name.split('.');
            const extension = nameCut[ nameCut.length -1 ];

            if(!extensionAllowed.includes(extensionAllowed)){
                return rej("Archivo no soportado por el servidor");
            }

            const nombreTemporal = uuidv4 +'.'+ extension;

            const pathCarga =  `./src/public/${nombreTemporal}`

            file.mv( pathCarga, (error) => {
                if(error) return rej(error);
            });

            res( { pathCarga, nombreTemporal } );

        });
}

