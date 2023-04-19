import { config } from 'dotenv'
config();

import Server from "../src/models/server.js";

const serve = new Server();

serve.listen();