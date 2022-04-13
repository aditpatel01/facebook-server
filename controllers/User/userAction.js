const User = require('../../models/user')
const FriendRequest = require('../../models/friendRequest')
const FilterUserData = require('../../utils/FilterUserData')

exports.sendFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (req.userId == req.params.userId) {
      return res
        .status(400)
        .json({ error: 'You cannot send friend request to yourself' })
    }

    if (user.friends.includes(req.userId)) {
      return res.status(400).json({ error: 'Already Friends' })
    }

    const friendRequest = await FriendRequest.findOne({
      sender: req.userId,
      receiver: req.params.userId,
    })

    if (friendRequest) {
      return res.status(400).json({ error: 'Friend Request already send' })
    }

    const newFriendRequest = new FriendRequest({
      sender: req.userId,
      receiver: req.params.userId,
    })

    const save = await newFriendRequest.save()

    const friend = await FriendRequest.findById(save.id).populate('receiver')

    const chunkData = {
      id: friend.id,
      user: FilterUserData(friend.receiver),
    }

    res
      .status(200)
      .json({ message: 'Friend Request Sended', friend: chunkData })

    const sender = await FriendRequest.findById(save.id).populate('sender')
    
    const senderData = {
      id: sender.id,
      user: FilterUserData(sender.sender),
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.acceptFriendRequest = async (req, res) => {
  try {
    const friendsRequest = await FriendRequest.findById(req.params.requestId)
    if (!friendsRequest) {
      return res
        .status(404)
        .json({ error: 'Request already accepted or not sended yet' })
    }

    const sender = await User.findById(friendsRequest.sender)
    if (sender.friends.includes(friendsRequest.receiver)) {
      return res.status(400).json({ error: 'already in your friend lists' })
    }
    sender.friends.push(req.userId)
    await sender.save()

    const currentUser = await User.findById(req.userId)
    if (currentUser.friends.includes(friendsRequest.sender)) {
      return res.status(400).json({ error: 'already  friend ' })
    }
    currentUser.friends.push(friendsRequest.sender)
    await currentUser.save()

    const chunkData = FilterUserData(sender)

    await FriendRequest.deleteOne({ _id: req.params.requestId })
    res
      .status(200)
      .json({ message: 'Friend Request Accepted', user: chunkData })

  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.cancelSendedFriendRequest = async (req, res) => {
  try {
    const friendsRequest = await FriendRequest.findById(
      req.params.requestId,
    ).populate('receiver')
    if (!friendsRequest) {
      return res
        .status(404)
        .json({ error: 'Request already cenceled or not sended yet' })
    }
    await FriendRequest.deleteOne({ _id: req.params.requestId })

    res.status(200).json({ message: 'Friend Request Canceled' })
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

exports.declineFriendRequest = async (req, res) => {
  try {
    const friendsRequest = await FriendRequest.findById(
      req.params.requestId,
    ).populate('sender')
    if (!friendsRequest) {
      return res
        .status(404)
        .json({ error: 'Request already declined or not sended yet' })
    }
    await FriendRequest.deleteOne({ _id: req.params.requestId })

    res.status(200).json({ message: 'Friend Request Declined' })
   
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}



exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (req.params.input === 'name') {
      user.name = req.body.name
    }
    if (req.params.input === 'email') {
      user.email = req.body.email
    }

    if (req.params.input === 'bio') {
      user.bio = req.body.bio
    }
    if (req.params.input === 'location') {
      user.location = req.body.location
    }
    if (req.params.input === 'education') {
      user.education = req.body.education
    }

    await user.save()
    res.status(200).json({ message: 'Updated Successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}
