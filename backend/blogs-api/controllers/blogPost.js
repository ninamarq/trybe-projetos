const services = require('../services/blogpost');

const postBlog = async (req, res, next) => {
  try {
    const objResponse = await services.createPost(req.body, req.headers);
    return res.status(201).json({
      id: objResponse.id,
      userId: objResponse.userId,
      title: objResponse.title,
      content: objResponse.content,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await services.allPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await services.getPostById(id);
    if (!post) {
      return res.status(404).json({
        message: 'Post does not exist',
      });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postBlog,
  getPosts,
  getById,
};
