import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="text-light text-center">No Comments Yet</h3>;
  }

  return (
    <Container className="comment-container">
      <Row>
        <h3 className="text-light">Comments:({comments.length})</h3>
      </Row>
      <Row className="">
        {comments &&
          comments.map((comment) => (
            <Card bg="dark" text="light" className="commentList">
              <Link
                to={`/profiles/${comment.commentAuthor}`}
                className="comment-card-link"
              >
                <Card.Header>@{comment.commentAuthor}</Card.Header>
              </Link>
              <Card.Body>
                <blockquote className="blockquote-body mb-0">
                  <p> {comment.commentText} </p>
                  <footer className="blockquote-footer">
                    {comment.createdAt}
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default CommentList;
