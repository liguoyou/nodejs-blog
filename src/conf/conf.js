const env = global.process.env.NODE_ENV

let MYSQL_CONF

// 如果当前是开发环境
if (env === 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblogs'
	}
}

// 如果当前是生产环境
if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblogs'
	}
}

module.exports = MYSQL_CONF
