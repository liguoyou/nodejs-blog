const handleBlogRouter = require('./src/router/blog/blog.js')
const handleUserRouter = require('./src/router/user/user.js')
const queryString = require('querystring')

// session 数据
const SESSION_DATA = {}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1999)
	return d.toGMTString()
}

// 处理 post data 数据
const getPostData = req => {
	const promise = new Promise((reslove, reject) => {
		if (req.method !== 'POST') {
			reslove({})
			return
		}

		if (req.headers['content-type'] !== 'application/json') {
			reslove({})
			return
		}

		let postData = ''
		req.on('data', chunk => {
			// chunk 是一个 Buffer 对象
			postData += chunk.toString()
		})

		req.on('end', () => {
			if (!postData) {
				reslove({})
				return
			}
			reslove(JSON.parse(postData))
		})
	})

	return promise
}

const serverHandle = (req, res) => {
	// global.process.env.NODE_ENV

	// 设置返回格式
	res.setHeader('Content-type', 'application/json')

	// 获取请求的接口路径
	req.path = req.url.split('?')[0]

	// 获取参数
	req.query = queryString.parse(req.url.split('?')[1])

	// 解析 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if (!item) return

		const arr = item.split('=')
		const key = arr[0].trim()
		const val = arr[1].trim()
		req.cookie[key] = val
	})

	// 解析 session
	let needSetCookie = false
	let userId = req.cookie.userid
	if (userId) {
		SESSION_DATA[userId] = SESSION_DATA[userId] || {}
	} else {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
		SESSION_DATA[userId] = {}
	}
	req.session = SESSION_DATA[userId]

	// 处理 post data
	getPostData(req).then(postData => {
		req.body = postData

		// 博客相关的接口
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then(blogData => {
				if (needSetCookie) {
					// 操作 cookie
					res.setHeader(
						'Set-Cookie',
						`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
					)
				}

				res.end(JSON.stringify(blogData))
			})
			return
		}

		// 用户相关的接口
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then(data => {
				if (needSetCookie) {
					// 操作 cookie
					res.setHeader(
						'Set-Cookie',
						`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
					)
				}

				res.end(JSON.stringify(data))
			})
			return
		}

		// 接口地址不正确
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.write('404 Not Found\n')
		res.end()
	})
}

module.exports = serverHandle
