import express, { json, urlencoded } from "express";
import { join } from 'path';
import fileupload from "express-fileupload";
import userRouter from '../routes/user.routes.js';
import fileRouter from '../routes/files.routes.js';

class Server {

    constructor(){
        this.app = express();

        
        this.paths = {
            users: "/api/users",
            files: "api/files"
        }

        this.middleware();
        this.routes();

    }

    middleware(){

        this.app.use( json() );
        this.app.use( urlencoded( {
            extended:false
        }));

        this.app.use( express.static( join('src', 'public')  ) );

        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: './src/public',
            createParentPath: true
        }));

    }

    routes(){
        this.app.use(this.paths.users, userRouter);
        this.app.use(this.paths.files, fileRouter);
    }

    listen(){

        this.app.listen(process.env.PORT);
    }


}

export default  Server;