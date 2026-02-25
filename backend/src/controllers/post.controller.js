const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log('Aantal posts uit DB:', posts.length); // <-- voeg deze regel toe
    res.json(posts);
  } catch (err) {
    console.error('Fout bij ophalen posts:', err); // <-- en deze
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
};

exports.deletePost = async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
};

exports.updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) return res.sendStatus(404);
  res.json(updated);
};
