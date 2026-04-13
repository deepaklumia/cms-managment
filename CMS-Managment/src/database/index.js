import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost',
    database: 'cms_db',
    password: 'example',
    port: 5432,
});

export default pool;