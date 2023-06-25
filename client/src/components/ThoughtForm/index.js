import React, { useState } from "react";
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
    <div className="bg-light">
      <h3>Lets hear what your thinking...</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <p
                className={`m-0 ${
                  characterTitleCount === 20 || error ? "text-danger" : ""
                }`}
              >
                {" "}
                Title Count: {characterTitleCount}/20
              </p>
              <input
                name="thoughtTitle"
                placeholder="Title"
                value={thoughtTitle}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleTitleChange}
              ></input>
              <textarea
                name="thoughtText"
                placeholder="What are you thinking..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleTextChange}
              ></textarea>
              <p
                className={`m-0 ${
                  characterTextCount === 1000 || error ? "text-danger" : ""
                }`}
              >
                Text Count: {characterTextCount}/1000
              </p>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-light btn-block py-3" type="submit">
                Submit Take
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to participate in these discussions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
