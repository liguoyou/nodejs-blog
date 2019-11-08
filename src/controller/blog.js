const xss = require('xss')
const { exec, escape } = require('../db/mysql.js')

// 获取博客列表
const getList = (author, keyword) => {
	let sql = 'select * from blogs where state=1'
	if (author) {
		sql += ` and author=${escape(author)}`
	}
	if (keyword) {
		sql += ` and content like ${escape('%' + keyword + '%')}`
	}
	sql += ' order by createtime desc;'
	return exec(sql)
}

// 获取博客详情
const getDetail = id => {
	const sql = `select * from blogs where state=1 and id=${escape(id)};`
	return exec(sql)
}

// 新建博客
const newBlog = (blogData = {}) => {
	const sql = `
    insert into blogs (title, content, createtime, author) 
    values(
      ${xss(escape(blogData.title))}, 
      ${xss(escape(blogData.content))}, 
      ${Date.now()}, 
      ${escape(blogData.author)})
  `

	return exec(sql).then(data => {
		return {
			id: data.insertId
		}
	})
}

// 更新博客
const updateBlog = (id, blogData = {}, author) => {
	const title = blogData.title
	const content = blogData.content
	const sql = `
    update blogs 
    set title=${xss(escape(title))}, content=${xss(escape(content))} 
    where id=${escape(id)} and author=${escape(author)};
  `
	return exec(sql).then(rows => {
		if (rows.affectedRows > 0) {
			return true
		}
		return false
	})
}

// 删除博客
const delBlog = (id, author) => {
	// const sql = `
	//   delete from blogs where id=${id} and author='${author}'
	// `

	// 变更状态即可
	const sql = `
    update blogs set state=0 
    where id=${escape(id)} and author=${escape(author)};
  `

	return exec(sql).then(rows => {
		if (rows.affectedRows > 0) {
			return true
		}
		return false
	})
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
