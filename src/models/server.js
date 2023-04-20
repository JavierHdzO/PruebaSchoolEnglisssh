import express, { json, urlencoded } from "express";
import { join } from 'path';
import userRouter from '../routes/user.routes.js'

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
    }

    routes(){
        this.app.use(this.paths.users, userRouter);
    }

    listen(){

        this.app.listen(process.env.PORT);
    }


}

export default  Server;