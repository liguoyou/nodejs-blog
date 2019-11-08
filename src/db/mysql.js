const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/conf.js')

// 创建数据库连接
const con = mysql.createConnection(MYSQL_CONF)

// 连接数据
con.connect()

// 统一执行 sql 的函数
const exec = sql => {
	const promise = new Promise((reslove, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err)
				return
			}

			reslove(result)
		})
	})

	// 返回 promise
	return promise
}

// 防止 sql 注入
const escape = mysql.escape

module.exports = {
	exec,
	escape
}
