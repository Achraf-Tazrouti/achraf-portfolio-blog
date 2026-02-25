const express = require('express');
const { getPosts, createPost, deletePost, updatePost } = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// iedereen mag lezen
router.get('/', getPosts);

// alleen admin (JWT) mag posten
router.post('/', auth, auth.requireAdmin, createPost);

// alleen admin (JWT) mag verwijderen
router.delete('/:id', auth, auth.requireAdmin, deletePost);

// alleen admin (JWT) mag updaten
router.put('/:id', auth, auth.requireAdmin, updatePost);

module.exports = router;
