// main/database.js
const sqlite3 = require("sqlite3").verbose();
import path from "path";
// Define la ruta a tu archivo de base de datos
const dbPath = path.join(__dirname, "passmanager.db");

// Crea una nueva base de datos o abre la existente
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  console.log("DBPATH", dbPath);
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos SQLite");
  }
});

// Utiliza serialize para ejecutar consultas en serie
db.serialize(() => {
  // Crear tabla Usuarios si no existe
  db.run(
    `CREATE TABLE IF NOT EXISTS Usuarios (
      usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_usuario TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      contrasena TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla Usuarios:", err.message);
      } else {
        console.warn("Tabla Usuarios creada con éxito");
      }
    }
  );

  // Crear tabla Configuraciones si no existe
  db.run(
    `CREATE TABLE IF NOT EXISTS Configuraciones (
            configuracion_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            descripcion TEXT,
            usuario_id INTEGER NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
        )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla Configuraciones:", err.message);
      } else {
        console.warn("Tabla Configuraciones creada con éxito");
      }
    }
  );
});

const isThereUsers = () => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM Usuarios`, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row.count > 0);
    });
  });
};

const insertConfiguration = (name, desc) => {
  console.log("NAME", name);
  console.log("DESC", desc);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO configurations (name, desc) VALUES (?, ?)`,
      [name, desc],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID });
      }
    );
  });
};

export { db, insertConfiguration, isThereUsers };
