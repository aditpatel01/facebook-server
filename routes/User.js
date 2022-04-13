const router = require('express').Router()
const {
  me,
  fetchUserById,
  fetchRecommandedUsers,
  fetchSendedFriendRequest,
  fetchIncommingFriendRequest,
  searchUsers
} = require('../controllers/User/FetchUser')

const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  cancelSendedFriendRequest,
  updateProfile
} = require('../controllers/User/UserAction')
const authRequired = require('../middleware/requiredAuth')

router.get('/me', authRequired, me)
router.get('/recommanded_users', authRequired, fetchRecommandedUsers)
router.get('/friend_request/sended', authRequired, fetchSendedFriendRequest)
router.get(
  '/friend_request/received',
  authRequired,
  fetchIncommingFriendRequest,
)

router.get('/search', searchUsers)
router.get('/friend_request/:userId/send', authRequired, sendFriendRequest)
router.get(
  '/friend_request/:requestId/accept',
  authRequired,
  acceptFriendRequest,
)
router.get(
  '/friend_request/:requestId/decline',
  authRequired,
  declineFriendRequest,
)
router.get(
  '/friend_request/:requestId/cancel',
  authRequired,
  cancelSendedFriendRequest,
)
router.get('/:user_id', authRequired, fetchUserById)

router.put('/update_profile/:input', authRequired, updateProfile)

module.exports = router