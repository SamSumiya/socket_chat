const User = require ('../model/User.js')

module.exports.createNewUserImage = async (req, res) => {
  try {
    const { image } = req.body
    const { id } = req.params

    const user = await User.findByIdAndUpdate(
      id,
      {
        isAvatarImageSet: true,
        avatarImage: image,
      },
      { new: true },
    )
    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    })
  } catch (err) {
    res.json({ message: err.message })
  }
}
