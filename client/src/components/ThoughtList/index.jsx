import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>Blog History</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link
                className="text-light"
                to={`/profiles/${thought.thoughtAuthor}`}
              >
                {thought.thoughtAuthor}
              </Link>
              <p>{thought.createdAt}</p>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Comments
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
