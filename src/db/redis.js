const redis = require('redis')
const { REDIS_CONF } = require('../conf/conf.js')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
	console.error(err)
})

// 设置 redis
function set(key, val) {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	redisClient.set(key, val, redis.print)
}

// 读取 redis
function get(key) {
	const promise = new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}

			if (val == null) {
				resolve(null)
			}

			// 处理对象类型数据
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
		})
	})
	return promise
}

module.exports = {
	get,
	set
}
