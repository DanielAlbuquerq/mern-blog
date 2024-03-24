import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(JSON.stringify(req.body));

    if (!content) {
      return next(errorHandler(403, "Comment is required"));
    }
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    console.log("data sent from getComments");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).sort({
    });
    console.log("comment from DataBase" + comment)
    if(!comment){
      return next(errorHandler(404, 'Comment not found'))
    }
    const userIndex = comment.likes.indexOf(req.user.id)
    if(userIndex === -1){
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id)
    } else {
      comment.numberOfLikes -=1;
      comment.likes.splice(userIndex, 1)
    }
    await comment.save()
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};