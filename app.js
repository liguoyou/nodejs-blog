const handleBlogRouter = require('./src/router/blog/blog.js')
const handleUserRouter = require('./src/router/user/user.js')
const queryString = require('querystring')

const serverHandle = (req, res) => {
	// global.process.env.NODE_ENV

	// 设置返回格式
	res.setHeader('Content-type', 'application/json')

	// 获取请求的接口路径
	req.path = req.url.split('?')[0]

	// 获取参数
	req.query = queryString.parse(req.url.split('?')[1])

	// 博客相关的接口
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}

	// 用户相关的接口
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(JSON.stringify(userData))
		return
	}

	// 接口地址不正确
	res.writeHead(404, { 'Content-type': 'text/plain' })
	res.write('404 Not in Found')
	res.end()
}

module.exports = serverHandle
