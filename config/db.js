var mysql = require("mysql2/promise");

// create a new MySQL connection
async function connectDB() {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	})
	
	return connection;
}
  
// connect to the database
//   connection.connect((error) => {
// 	if (error) {
// 		console.error('Error connecting to MySQL database:', error);
// 	} else {
// 		console.log('Connected to MySQL database!');
// 	}
//   });

module.exports = connectDB;