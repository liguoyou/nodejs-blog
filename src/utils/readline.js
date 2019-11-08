// 逐行读取 log 文件进行统计分析

const fs = require('fs')
const path = require('path')
const readLine = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
// 创建 readStream
const readStream = fs.createReadStream(fileName)

// 创建 readLine 对象
const RL = readLine.createInterface({
	input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
RL.on('line', lineData => {
	if (!lineData) return

	// 记录总行数
	sum++

	const arr = lineData.split(' -- ')
	if (arr[2] && arr[2].indexOf('Chrome') > 0) {
		// 累加 chrome 的数量
		chromeNum++
	}
})

RL.on('close', () => {
	console.log('Chrome 占比: ' + chromeNum / sum)
})
