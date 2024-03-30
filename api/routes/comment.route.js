import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getcomments,
} from "../controllers/comment.controler.js";

const router = express.Router();
router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.get("/getcomments",verifyToken, getcomments); 
router.put("/likeComment/:commentId", verifyToken, likeComment)
router.put("/editComment/:commentId", verifyToken, editComment)
router.delete("/deleteComment/:commentId", verifyToken, deleteComment)

export default router;
