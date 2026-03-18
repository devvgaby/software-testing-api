const mysql = require("mysql2/promise");
require("dotenv").config();

describe("Conexão com o banco de dados", () => {
  let connection;

  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: "utf8mb4", 
    });
  });

  afterAll(async () => {
    if (connection) {
      await connection.end(); 
    }
  });

  test("deve conectar e retornar 2", async () => {
    const [rows] = await connection.execute(
      "SELECT 1 + 1 AS solution"
    );

    expect(rows[0].solution).toBe(2);
  });
});