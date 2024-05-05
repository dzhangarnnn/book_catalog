import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "./comments/index";
import {
  addNewComment,
  fetchCommentList,
  getComments,
  getCommentsLoadingStatus,
  removeComment,
} from "../store/comments";
import { useParams } from "react-router-dom";
import LoadSpinner from "./loadSpinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Comments = () => {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(fetchCommentList(bookId));
    }
  }, [bookId]);

  const isLoading = useAppSelector(getCommentsLoadingStatus());

  const comments = useAppSelector(getComments());
  const handleSubmit = (data: { content: string }) => {
    if (bookId) {
      dispatch(addNewComment({ ...data, bookPageId: bookId }));
    }
  };
  const handleRemoveComment = (id: string) => {
    dispatch(removeComment(id));
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h4>Отзывы</h4>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              <LoadSpinner />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
