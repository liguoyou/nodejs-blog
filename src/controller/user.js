const login = (data = {}) => {
	if (data.username === 'guoyou' && data.password === '1234') {
		return true
	}
	return false
}

module.exports = {
	login
}
