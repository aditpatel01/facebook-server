const User = require('../../models/User')
const Post = require('../../models/Post')
const FilterPostData = require('../../utils/FilterPostData')
exports.createPost = async (req, res) => {
  let { content, privacy, image, body } = req.body

  if (!content && content.trim().length === 0 && !image) {
    return res.status(422).json({
      error:
        'Post Image or Write Some Content  to Post. Can`t upload empty post',
    })
  }
  try {
    const createPost = new Post({
      image,
      privacy,
      content,
      user: req.userId,
      isProfilePost: false,
    })

    const savePost = await createPost.save()

    const post = await Post.findById(savePost.id)
      .populate('user')
    const postData = FilterPostData(post)

    res
      .status(201)
      .json({ message: 'post created successfully', post: postData })


  } catch (err) {
    console.log(err)
    return res.status(500).json({error:"Something went wrong"})
  }
}

