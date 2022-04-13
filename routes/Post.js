const router = require('express').Router()
const {
  fetchAllPosts,
  fetchPostById,
} = require('../controllers/Post/FetchPost')
const {
  createPost,
} = require('../controllers/Post/postAction')
const authRequired = require('../middleware/requiredAuth')

router.post('/', authRequired, createPost)
router.get('/', authRequired, fetchAllPosts)
router.get('/:postId', authRequired, fetchPostById)



module.exports = router