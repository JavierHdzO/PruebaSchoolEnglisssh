import { createConnection } from "mysql2/promise";

export const connection = await createConnection({
    host:"localhost",
    port:3306,
    database: 'prueba',
    user:"prueba",
    password:'prueba',
});

connection.setMaxListeners(100);

export const executeQuery = async(query) => {
    const result =  await connection.query(query);

    return result;
}

