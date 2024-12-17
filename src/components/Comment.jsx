import { useState } from "react";
import PropTypes from "prop-types";

function Comment({ comment, addReply }) {
  const [isReply, setIsReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const displayReplyFrom = () => {
    setIsReply(true);
  };
  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };
  const handleReply = (e) => {
    e.preventDefault();
    addReply(comment.id, replyText);
    setIsReply(false);
    setReplyText("");
  };
  return (
    <li className="comment">
      <span className="comment__title">
        {comment.title}
        <button className="comment__btn" onClick={displayReplyFrom}>
          Reply
        </button>
      </span>
      {isReply && (
        <form className="comment__reply-form" onSubmit={handleReply}>
          <input
            className="comment-form__text-input"
            type="text"
            value={replyText}
            onChange={handleReplyChange}
            autoFocus
          />
          <input type="submit" value="Reply" />
        </form>
      )}
      <ul className="comment__replies-wrapper">
        {comment.children.map((reply) => {
          return <Comment key={reply.id} comment={reply} addReply={addReply} />;
        })}
      </ul>
    </li>
  );
}
Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequire,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        children: PropTypes.array,
      })
    ),
  }).isRequired,
  addReply: PropTypes.func.isRequired,
};

export default Comment;
