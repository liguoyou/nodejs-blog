const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resData.js')

const handleBlogRouter = (req, res) => {
	const method = req.method // GET POST
	const path = req.path
	const query = req.query
	const id = req.query.id
	const body = req.body

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const author = query.author || ''
		const keyword = query.keyword || ''

		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		if (!id) {
			return new ErrorModel('参数不能为空!')
		}

		const result = getDetail(id)
		return result.then(data => {
			if (data[0]) {
				return new SuccessModel(data[0])
			}
			return new ErrorModel('未查询到数据')
		})
	}

	// 新增一篇博客
	if (method === 'POST' && path === '/api/blog/new') {
		// author 假数据, 待登录模块实现后处理
		body.author = 'guoyou'
		const result = newBlog(body)
		return result.then(insertData => {
			if (insertData.id) {
				return new SuccessModel(insertData)
			}
			return new ErrorModel('新增失败!')
		})
	}

	// 更新一篇博客
	if (method === 'POST' && path === '/api/blog/update') {
		if (!id || !body) {
			return new ErrorModel('参数不能为空!')
		}

		// author 假数据, 待登录模块实现后处理
		const author = 'guoyou'

		const result = updateBlog(id, body, author)
		return result.then(res => {
			if (res) {
				return new SuccessModel('更新成功!')
			}
			return new ErrorModel('更新失败!')
		})
	}

	// 删除博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		if (!id) {
			return new ErrorModel('参数不能为空!')
		}

		// author 假数据, 待登录模块实现后处理
		const author = 'guoyou'

		const result = delBlog(id, author)
		return result.then(res => {
			if (res) {
				return new SuccessModel('删除成功!')
			}
			return new ErrorModel('删除失败!')
		})
	}
}

module.exports = handleBlogRouter
