import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Card className="comment-card" bg="light" text="dark" border="light">
          <h4 className="m-2">Leave a comment:</h4>

          <Form className="comment-form" onSubmit={handleFormSubmit}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comment"
              className="comment-form-input bg-light mb-3"
            >
              <Form.Control
                as="textarea"
                name="commentText"
                placeholder="Comment"
                value={commentText}
                className="form-input bg-light w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              />
            </FloatingLabel>
            <div className="comment-form-footer">
              <Button className="" type="submit">
                Add Comment
              </Button>
              <p
                className={`${
                  characterCount === 1000 || error ? "text-danger" : ""
                }`}
              >
                {characterCount}/1000
                {error && <span className="ml-2">{error.message}</span>}
              </p>
            </div>
          </Form>
        </Card>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default CommentForm;
