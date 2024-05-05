import React from "react";
import Comment from "./comment";
import { IComment } from "../../models/IComment";

interface Props {
  comments: IComment[];
  onRemove: (id: string) => void;
}

const CommentsList: React.FC<Props> = ({ comments, onRemove }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
      ))}
    </>
  );
};

export default CommentsList;
