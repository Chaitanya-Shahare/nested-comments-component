import { useState } from "react";
import Comment from "./Comment";
import { nanoid } from "nanoid";

// Planning
// - Create comments
// - Create basic ui for adding comments
// - Add comment function
// - Create Comment component
// - Add reply comment function
// - DFS

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      title: "First comment",
      children: [],
    },
    {
      id: 2,
      title: "Second comment",
      children: [
        {
          id: 3,
          title: "Nested in second comment",
          children: [],
        },
      ],
    },
  ]);
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const getCommentFromText = (text) => {
    return {
      id: nanoid(),
      title: text,
      children: [],
    };
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setComments([...comments, getCommentFromText(commentText)]);
    setCommentText("");
  };

  const addReply = (parentCommentId, replyText) => {
    setComments((prevComments) => {
      const updatedComments = addCommentToTree(
        prevComments,
        parentCommentId,
        replyText
      );
      return updatedComments;
    });
  };

  const addCommentToTree = (comments, parentCommentId, replyText) => {
    return comments.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          children: [...comment.children, getCommentFromText(replyText)],
        };
      }

      if (comment.children.length > 0) {
        return {
          ...comment,
          children: addCommentToTree(
            comment.children,
            parentCommentId,
            replyText
          ),
        };
      }

      return comment;
    });
  };

  return (
    <div className="comments">
      {/* comment form */}
      <form className="comment-form" onSubmit={handleAddComment}>
        <input
          className="comment-form__text-input"
          type="text"
          value={commentText}
          onChange={handleCommentChange}
          autoFocus
        />
        <input type="submit" value="Comment" />
      </form>

      {/* Comments */}
      <ul className="comments-wrapper">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </ul>
    </div>
  );
}

export default Comments;
