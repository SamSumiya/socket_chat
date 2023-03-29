const  User  = require('../model/User.js')
const bcrypt = require('bcrypt') 


module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hasUsername = await User.findOne({ username })

    if (hasUsername) {
      return res.json({ message: 'Username is taken...', status: false })
    }

    const hasEmail = await User.findOne({ email })
    if (hasEmail) {
      return res.json({ message: 'Email already exits...', status: false })
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    })
    const registerUser = await newUser.save()

    delete registerUser.password
    return res.status(201).json({ ...registerUser, status: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({ message: 'User does not exist', status: false })
    }

    const isRightPassword = await bcrypt.compare(password, user.password)
    if (!isRightPassword) {
      return res.json({ message: 'Invalid email or password', status: false })
    }
    delete user.password
    const payload = user.email
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ user, token, status: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports.logout = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.json({ message: 'User does not exits...' })
    }
    const user = await User.findOne({ _id: id })

    res.json(user)
  } catch (err) {
    res.json({ message: err.message })
  }
}
