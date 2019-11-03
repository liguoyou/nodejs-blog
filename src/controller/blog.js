const exec = require('../db/mysql.js')

// 获取博客列表
const getList = (author, keyword) => {
	let sql = 'SELECT * from blogs where state=1'
	if (author) {
		sql += ` and author='${author}'`
	}
	if (keyword) {
		sql += ` and content like '%${keyword}%'`
	}
	sql += ' order by createtime desc;'

	// 返回 promise
	return exec(sql)
}

// 获取博客详情
const getDetail = id => {
	// 返回假数据(格式是正确的)
	return {
		id: 1,
		title: '博客标题A',
		content: '博客内容A',
		create_time: 1572752034152,
		author: 'GuoYou.Li'
	}
}

// 新建博客
const newBlog = (blogData = {}) => {
	return {
		id: 3
	}
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
	return '更新成功'
}

// 删除博客
const delBlog = id => {
	return '删除成功'
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
