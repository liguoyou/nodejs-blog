const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require('../../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../../model/resData.js')

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
		return new SuccessModel(getList(author, keyword))
	}

	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		if (!id) {
			return new ErrorModel('参数不能为空!')
		}
		return new SuccessModel(getDetail(id))
	}

	// 新增一篇博客
	if (method === 'POST' && path === '/api/blog/new') {
		return new SuccessModel(newBlog(body))
	}

	// 更新一篇博客
	if (method === 'POST' && path === '/api/blog/update') {
		if (!id || !body) {
			return new ErrorModel('参数不能为空!')
		}

		return new SuccessModel(updateBlog(id, body))
	}

	// 删除博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		if (!id || !body) {
			return new ErrorModel('参数不能为空!')
		}

		return new SuccessModel(delBlog(id))
	}
}

module.exports = handleBlogRouter
