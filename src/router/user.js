const { login } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resData.js')
const { set } = require('../db/redis.js')

const handleUserRouter = (req, res) => {
	// 登录
	if (req.method === 'GET' && req.path === '/api/user/login') {
		// const result = login(req.body)
		const { username, password } = req.query
		const result = login(username, password)
		return result.then(resData => {
			if (resData && resData.username) {
				// 操作cookie
				req.session.username = resData.username
				req.session.realName = resData.realName

				// 同步 redis
				set(req.sessionId, req.session)

				console.log('req.session is', req.session)

				return new SuccessModel('登录成功')
			}
			return new ErrorModel('用户名或密码错误')
		})
	}

	// 登录验证的测试
	if (req.method === 'GET' && req.path === '/api/user/login-test') {
		console.log('req.session: ', req.session)
		if (req.session.username) {
			return Promise.resolve(new SuccessModel('登录成功'))
		}
		return Promise.resolve(new ErrorModel('尚未登录'))
	}
}

module.exports = handleUserRouter
