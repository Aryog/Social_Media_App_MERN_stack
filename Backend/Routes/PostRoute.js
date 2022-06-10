import express from 'express';
const router = express.Router()
import { createPost,getPost,updatePost,deletePost } from '../Controllers/PostController.js';

router.post("/",createPost);
router.get("/:id",getPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);
export default router;