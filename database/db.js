const Database = require("better-sqlite3")

const path = require("path");

const caminhoBanco = path.join(__dirname, "database.db");

const db = new Database(caminhoBanco)
module.exports = db