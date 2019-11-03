const getList = (author, keyword) => {
	// 返回假数据(格式是正确的)
	return [
		{
			id: 1,
			title: '博客标题A',
			content: '博客内容A',
			create_time: 1572752034152,
			author: 'GuoYou.Li'
		},
		{
			id: 2,
			title: '博客标题B',
			content: '博客内容B',
			create_time: 1572752062091,
			author: 'Water'
		}
	]
}

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

module.exports = {
	getList,
	getDetail
}
