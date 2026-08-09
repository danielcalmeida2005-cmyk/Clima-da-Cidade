
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const caminhoBanco = path.join(__dirname, 'database.db');
const db = new Database(caminhoBanco);

export default db;




// import Database from "better-sqlite3"

// import path from "path";

// const caminhoBanco = path.join(__dirname, "database.db");

// const db = new Database(caminhoBanco)

// export default db

