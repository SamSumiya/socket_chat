import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
	let token = req.header('Authorization')

	if (!token) {
		return res.status(400).send('Access denied')
	}

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length).trimLeft()
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET)

	req.user = verified 
	next()
}