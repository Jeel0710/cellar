const Pool = require('pg').Pool;

const devConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
    }
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? productionConfig : devConfig);

module.exports = pool;

