import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <div style={{ borderRadius: "10px", boxShadow: "0px 2px 2px 2px #ffff" }}>
        <h3
          className="card-header bg-light text-dark p-2 m-0"
          style={{ borderRadius: "10px 10px 0px 0px" }}
        >
          {thought.thoughtTitle} <br />
          <span style={{ fontSize: "1rem" }}>
            @{thought.thoughtAuthor} <br /> {thought.createdAt}
          </span>
        </h3>
        <div
          className="bg-dark text-light p-4 py-4"
          style={{ borderRadius: "0px 0px 10px 10px" }}
        >
          <blockquote
            className="p-4"
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              lineHeight: "1.5",
            }}
          >
            {thought.thoughtText}
          </blockquote>
        </div>
      </div>

      <div>
        <CommentForm thoughtId={thought._id} />
      </div>
      <div>
        <CommentList comments={thought.comments} />
      </div>
    </div>
  );
};

export default SingleThought;
