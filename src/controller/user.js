const exec = require('../db/mysql.js')

const login = (data = {}) => {
	const sql = `
    select username from users where state=1 and username='${data.username}' and password='${data.password}';
  `

	return exec(sql).then(rows => {
		if (rows[0] && rows[0].username) {
			return true
		}
		return false
	})
}

module.exports = {
	login
}
