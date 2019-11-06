const env = global.process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

// 如果当前是开发环境
if (env === 'dev') {
	// mysql
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblogs'
	}

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
	}
}

// 如果当前是生产环境
if (env === 'production') {
	// mysql
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'myblogs'
	}

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
	}
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF
}
