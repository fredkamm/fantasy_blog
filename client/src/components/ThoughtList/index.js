import React from 'react';
import { Link } from 'react-router-dom';

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
      {showTitle && <h3 className="text-center mb-3 text-light">{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/takes/${thought._id}`}
            >
              Got something to say? Click here.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
