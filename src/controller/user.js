const exec = require('../db/mysql.js')

const login = body => {
	const sql = `
    select username,realname from users where state=1 and username='${body.username}' and password='${body.password}';
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
