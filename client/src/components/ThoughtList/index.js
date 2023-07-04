import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Takes Yet</h3>;
  }

  return (
    <Container>
      <Row>
        <h3 className="text-center text-light">{title}</h3>
      </Row>
      <Row>
        {thoughts &&
          thoughts.map((thought) => (
            <Col className="thoughtList-single" xs={12} md={12} lg={6} xl={5}>
              <Card key={thought._id} className="thoughtList">
                <Link
                  to={`/profiles/${thought.thoughtAuthor}`}
                  className="thought-card-link"
                >
                  <Card.Header>@{thought.thoughtAuthor}</Card.Header>
                </Link>
                <Card.Body className="thought-card-body">
                  <Card.Title>{thought.thoughtTitle}</Card.Title>
                  <Card.Text>{thought.thoughtText}</Card.Text>
                </Card.Body>
                <Card.Footer className="thought-card-footer">
                  <Button href={`/takes/${thought._id}`} variant="primary">
                    Comments
                  </Button>
                  {thought.createdAt}
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ThoughtList;
