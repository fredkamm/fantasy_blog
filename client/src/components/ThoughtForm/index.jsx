import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
          thoughtAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });
      setThoughtTitle("");
      setThoughtText("");
      setCharacterTextCount(0);
      setCharacterTitleCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 999) {
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
      <h3>Create a post</h3>

      {Auth.loggedIn() ? (
        <>
          <Form className="thoughtForm-form" onSubmit={handleFormSubmit}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                name="thoughtTitle"
                placeholder="Here's a new thought..."
                value={thoughtTitle}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleTitleChange}
              ></Form.Control>
            </FloatingLabel>
            <p
              className={`${
                characterTitleCount === 20 || error ? "text-danger" : ""
              }`}
            >
              {characterTitleCount}/20
            </p>

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

            <p
              className={`m-0 ${
                characterTextCount === 999 || error ? "text-danger" : ""
              }`}
            >
              {characterTextCount}/999
            </p>

            <div className="thoughtForm-footer">
              <Button variant="primary" type="submit">
                Post
              </Button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </Form>
        </>
      ) : (
        <div className="thoughtForm-login">
          <p>You need to be logged in to participate in these discussions. </p>
          <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup.</Link>
          </p>
        </div>
      )}
    </Card>
  );
};

export default ThoughtForm;
