const { getList, getDetail } = require('../../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../../model/resData.js')

const handleBlogRouter = (req, res) => {
	const method = req.method // GET POST
	const path = req.path
	const query = req.query

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const author = query.author || ''
		const keyword = query.keyword || ''
		return new SuccessModel(getList(author, keyword))
	}

	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		const id = query.id
		if (!id) {
			return new ErrorModel('参数不能为空!')
		}
		return new SuccessModel(getDetail(id))
	}

	// 新增一篇博客
	if (method === 'POST' && path === '/api/blog/new') {
		return {
			msg: '这是新增博客的接口'
		}
	}

	// 更新一篇博客
	if (method === 'POST' && path === '/api/blog/update') {
		return {
			msg: '这是更新博客的接口'
		}
	}

	// 删除博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		return {
			msg: '这是删除博客的接口'
		}
	}
}

module.exports = handleBlogRouter
