const exec = require('../db/mysql.js')

const login = (username, password) => {
	const sql = `
    select username,realname from users where state=1 and username='${username}' and password='${password}';
  `

	return exec(sql).then(rows => {
		if (rows[0] && rows[0].username) {
			return {
				username: rows[0].username,
				realName: rows[0].realname
			}
		}
		return false
	})
}

module.exports = {
	login
}
