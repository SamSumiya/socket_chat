const User = require('../model/User.js')

module.exports.getAllContacts = async (req, res) => {
  try {
    const { id } = req.params
    const allUsers = await User.find({ _id: { $ne: id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ])
    return res.json({ users: allUsers })
  } catch (err) {
    res.json({ message: err.message })
  }
}
