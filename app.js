const serverHandle = (req, res) => {
	// 设置返回格式
	res.setHeader('Content-type', 'application/json')

	const resData = {
		code: 1,
		data: [
			{
				title: '博客标题BB',
				content: '博客内容BB',
				env: global.process.env.NODE_ENV
			}
		]
	}

	res.end(JSON.stringify(resData))
}

module.exports = serverHandle
