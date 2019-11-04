const { login } = require('../../controller/user.js')
const { SuccessModel, ErrorModel } = require('../../model/resData.js')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1999)
	return d.toGMTString()
}

const handleUserRouter = (req, res) => {
	// 登录
	if (req.method === 'GET' && req.path === '/api/user/login') {
		// const result = login(req.body)
		const { username, password } = req.query
		const result = login(username, password)
		return result.then(resData => {
			if (resData) {
				// 操作cookie
				res.setHeader(
					'Set-Cookie',
					`username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
				)

				return new SuccessModel('登录成功')
			}
			return new ErrorModel('用户名或密码错误')
		})
	}

	// 登录验证的测试
	if (req.method === 'GET' && req.path === '/api/user/login-test') {
		if (req.cookie.username) {
			return Promise.resolve(new SuccessModel('登录成功'))
		}
		return Promise.resolve(new ErrorModel('用户名或密码错误'))
	}
}

module.exports = handleUserRouter
