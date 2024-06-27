import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then(connection => {
    console.log('데이터베이스에 성공적으로 연결되었습니다.');
    connection.release();
  })
  .catch(error => {
    console.log('데이터베이스 연결에 실패했습니다.', error);
  });

export default pool;