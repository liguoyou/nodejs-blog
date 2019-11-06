const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const queryString = require('querystring')
const { get, set } = require('./src/db/redis.js')

// session 数据
// const SESSION_DATA = {}

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

		// 监听数据
		let postData = ''
		req.on('data', chunk => {
			// chunk 是一个 Buffer 对象
			postData += chunk.toString()
		})

		// 监听请求完成
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

	// 获取参数, 并转成 queryString 对象
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

	// 解析 session (使用redis)
	let needSetCookie = false
	let userId = req.cookie.userid
	if (!userId) {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`

		// 初始化 redis 中的 session 值
		set(userId, {})
	}
	// 获取 session
	req.sessionId = userId
	get(req.sessionId)
		.then(sessionData => {
			if (sessionData == null) {
				// 初始化 redis 中的 session 值
				set(req.sessionId, {})

				// 设置 session
				req.session = {}
			} else {
				req.session = sessionData
			}
			console.log('req.session', req.session)

			// 处理 post data
			return getPostData(req)
		})
		.then(postData => {
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
