import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Takes Yet</h3>;
  }

  return (
    <div>
      {showTitle && (
        <h3 className="text-center mt-1 mb-1 text-light">{title}</h3>
      )}
      {thoughts &&
        thoughts.map((thought) => (
          <div
            key={thought._id}
            className="card"
            style={{ boxShadow: "0px 2px 2px 2px #ffff", borderRadius: "10px" }}
          >
            <h4
              className="card-header bg-light p-2 m-0"
              style={{ borderRadius: "10px 10px 0px 0px" }}
            >
              {showUsername ? (
                <Link
                  className="text-dark"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtTitle} <br />
                  <span style={{ fontSize: "1rem" }}>
                    @{thought.thoughtAuthor} <br /> {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>{thought.createdAt}</span>
                </>
              )}
            </h4>
            {/* TODO: Add a border to the card */}
            <div className="card-body bg-primary text-light p-2" style={{ borderTop: "1px solid #ffff" }}> 
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              style={{ borderRadius: "0px 0px 10px 10px" }}
              to={`/takes/${thought._id}`}
            >
              Comments
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
