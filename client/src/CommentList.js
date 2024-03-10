const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    if (comment.status === "pending") {
      comment.content = "This comment is awaiting moderation.";
    }
    if (comment.status === "rejected") {
      comment.content = "This comment has been rejected.";
    }
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
