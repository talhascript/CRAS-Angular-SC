require("dotenv").config(); // Comment this when deploying to heroku

const mysql = require("mysql");

class Database {
  constructor() {
    if (this.instance) return this.instance;

    Database.instance = this;

    this.pool = mysql.createPool({
      connectionLimit: process.env.DATABASE_CONNECTION_LIMIT || 10,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    });
  }

  testConnection() {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT 1", (ex, rows) => {
        if (ex) {
          console.log("Connection to database FAILED");
          reject(false);
        } else {
          console.log("Connected to database");
          resolve(true);
        }
      });
    });
  }

  async testConnectionRetry() {
    const tries = 3;
    for (let i = 0; i < tries; i++) {
      try {
        await this.testConnection();
        break;
      } catch (error) {
        await waitFor(10000);
      }
    }
  }

  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
}

function waitFor(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

module.exports = new Database();
