const  Message = require('../model/Message.js') 

module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body

    const data = new Message({
      message: { text: message },
      users: [from, to],
      sender: from,
    })
    const savedData = await data.save()
    if (savedData) {
      return res.json({ message: 'Message added successfully' })
    } else {
      return res.json({ message: 'Failed to add message...' })
    }
  } catch (err) {
    res.json({ message: err.message })
  }
}

module.exports.getMessages = async (req, res) => {
  try {
		const { from, to } = req.body
		const data = await Message.find({ users: {
			$all: [from, to],
		}}).sort({ updatedAt: 1})

		const modifiedMessages = data.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from, 
				message: msg.message.text, 
			}
		})
		res.json(modifiedMessages)
  } catch (err) {
		res.json({ message: err.message})
	}
}
