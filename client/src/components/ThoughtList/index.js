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
            <Col className="thoughtList-single" xs={4} md={4}>
              <Card key={thought._id} className="thoughtList">
                <Card.Header className="thought-card-header">
                  <Link to={`/profiles/${thought.thoughtAuthor}`}>
                    @{thought.thoughtAuthor}
                  </Link>
                </Card.Header>
                <Card.Body className="thought-card-body">
                  <Card.Title>{thought.thoughtTitle}</Card.Title>
                  <Card.Text>{thought.thoughtText}</Card.Text>
                  <Button
                    className="thought-card-button"
                    href={`/takes/${thought._id}`}
                    variant="primary"
                  >
                    Comments
                  </Button>
                </Card.Body>
                <Card.Footer>{thought.createdAt}</Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ThoughtList;
