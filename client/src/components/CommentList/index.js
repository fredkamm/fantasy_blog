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
            <Card className="commentList" bg="dark" text="light" border="light" >
              <Card.Header>{comment.createdAt}</Card.Header>
              <Card.Body>
                <blockquote className="blockquote-body mb-0">
                  <p> {comment.commentText} </p>
                  <footer className="blockquote-footer">
                    <Link
                      to={`/profiles/${comment.commentAuthor}`}
                      className="comment-card-link"
                    >
                      @{comment.commentAuthor}
                    </Link>
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
