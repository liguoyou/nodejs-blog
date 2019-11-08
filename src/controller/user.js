const { exec, escape } = require('../db/mysql.js')

const login = body => {
	const sql = `
    select username,realname from users 
    where state=1 and username=${escape(body.username)} 
    and password=${escape(body.password)};
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
