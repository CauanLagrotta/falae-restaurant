import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: ", err);
  } else {
    console.log("Conectado ao banco de dados");
  }
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          useremail TEXT NOT NULL UNIQUE,
          userphone TEXT NOT NULL UNIQUE,
          userpassword TEXT NOT NULL,
          staff INTEGER DEFAULT 0
        );
      `);

  db.run(`
        CREATE TABLE IF NOT EXISTS Product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          productname TEXT NOT NULL,
          productprice REAL NOT NULL CHECK (productprice > 0),
          productcategory TEXT NOT NULL,
          productdescription TEXT,
          productImageUrl TEXT
        );
      `);

  db.run(`
        CREATE TABLE IF NOT EXISTS Orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          totalPrice REAL NOT NULL DEFAULT 0,
          useraddress TEXT NOT NULL,
          orderstatus TEXT NOT NULL DEFAULT 'Pendente',
          createdAt TEXT DEFAULT (datetime('now', 'localtime')),
          FOREIGN KEY (userId) REFERENCES User(id)
        );
      `);

  db.run(`
        CREATE TABLE IF NOT EXISTS OrderItem (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderquantity INTEGER NOT NULL CHECK (orderquantity > 0),
          orderId INTEGER NOT NULL,
          productId INTEGER NOT NULL,
          FOREIGN KEY (orderId) REFERENCES Orders(id),
          FOREIGN KEY (productId) REFERENCES Product(id)
        );
      `);
});

export default db;
