import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState("");
  const [thoughtTitle, setThoughtTitle] = useState("");

  const [characterTextCount, setCharacterTextCount] = useState(0);
  const [characterTitleCount, setCharacterTitleCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtTitle,
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      console.log(data);

      setThoughtTitle("");
      setThoughtText("");
    } catch (err) {
      console.error(err);
      console.log(err.message); // Log the error message
      console.log(err.graphQLErrors); // Log any GraphQL-specific errors
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 1000) {
      setThoughtText(value);
      setCharacterTextCount(value.length);
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtTitle" && value.length <= 20) {
      setThoughtTitle(value);
      setCharacterTitleCount(value.length);
    }
  };

  return (
    <Card className="thoughtForm">
      <h3>Create a post:</h3>
      {Auth.loggedIn() ? (
        <>
          <Form className="thoughtForm-form" onSubmit={handleFormSubmit}>
            <div className="thoughtForm-body">
              <p
                className={`title-count ${
                  characterTitleCount === 20 || error ? "text-danger" : ""
                }`}
              >
                {" "}
                Title Count: {characterTitleCount}/20
              </p>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  name="thoughtTitle"
                  placeholder="Tile"
                  value={thoughtTitle}
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Post"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  name="thoughtText"
                  placeholder="Post"
                  value={thoughtText}
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleTextChange}
                />
              </FloatingLabel>
              <div className="thoughtForm-footer">
                <Button variant="primary" type="submit">
                  Submit Take
                </Button>
                <p
                  className={`post-count ${
                    characterTextCount === 1000 || error ? "text-danger" : ""
                  }`}
                >
                  {characterTextCount}/1000
                </p>
              </div>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to participate in these discussions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Card>

    //   <FloatingLabel
    //   controlId="floatingTextarea"
    //   label="Comments"
    //   className="mb-3"
    //   >
    //   <Form.Control as="textarea" placeholder="Leave a comment here" />
    // </FloatingLabel>
    // <FloatingLabel controlId="floatingTextarea2" label="Comments">
    //   <Form.Control
    //     as="textarea"
    //     placeholder="Leave a comment here"
    //     style={{ height: '100px' }}
    //     />
    // </FloatingLabel>
  );
};

export default ThoughtForm;
