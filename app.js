const handleBlogRouter = require('./src/router/blog/blog.js')
const handleUserRouter = require('./src/router/user/user.js')

const serverHandle = (req, res) => {
	// global.process.env.NODE_ENV

	// 设置返回格式
	res.setHeader('Content-type', 'application/json')

	// 访问的接口地址
	const path = req.url.split('?')[0]
	req.path = path

	// 博客相关的接口
	const blogRouterResult = handleBlogRouter(req, res)
	if (blogRouterResult) {
		res.end(JSON.stringify(blogRouterResult))
		return
	}

	// 用户相关的接口
	const userRouterResult = handleUserRouter(req, res)
	if (userRouterResult) {
		res.end(JSON.stringify(userRouterResult))
		return
	}

	// 接口不正确
	res.writeHead(404, { 'Content-type': 'text/plain' })
	res.write('404 Not in Found')
	res.end()

	// const resData = {
	// 	code: 1,
	// 	data: [
	// 		{
	// 			title: '博客标题BB',
	// 			content: '博客内容BB',
	// 			env: global.process.env.NODE_ENV
	// 		}
	// 	]
	// }

	// res.end(JSON.stringify(resData))
}

module.exports = serverHandle
