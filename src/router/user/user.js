const { login } = require('../../controller/user.js')
const { SuccessModel, ErrorModel } = require('../../model/resData.js')

const handleUserRouter = (req, res) => {
	// 登录
	if (req.method === 'POST' && req.path === '/api/user/login') {
		const result = login(req.body)
		return result.then(res => {
			if (res) {
				return new SuccessModel('登录成功')
			}
			return new ErrorModel('用户名或密码错误')
		})
	}
}

module.exports = handleUserRouter
