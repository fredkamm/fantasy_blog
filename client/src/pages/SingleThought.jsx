import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

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
    <Container className="single-thought-container">
      <Card
        className="single-thought-card my-2"
        bg="light"
        text="dark"
        border="dark"
      >
        <Card.Header className="card-header single-thought-header">
          <h3>{thought.thoughtTitle}</h3>
          <Link
            to={`/profiles/${thought.thoughtAuthor}`}
            className="single-thought-link"
          >
            <p>@{thought.thoughtAuthor}</p>
          </Link>
        </Card.Header>
        <Card.Body className="single-thought-body">
          <Card.Text>{thought.thoughtText}</Card.Text>
        </Card.Body>
        <Card.Footer className="single-thought-footer">
          {thought.createdAt}
        </Card.Footer>
      </Card>

      <CommentForm thoughtId={thought._id} />
      <CommentList comments={thought.comments} />
    </Container>
  );
};

export default SingleThought;
