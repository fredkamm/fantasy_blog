import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const Header = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.getProfile().authenticatedPerson.username === userParam) {
  //   return <Link to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Fantasy Football Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {Auth.loggedIn() ? (
            <Nav className="me-auto">
              <Nav.Link href="/me">Profile</Nav.Link>
              <Nav.Link href="#pricing" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          )}

          <Navbar.Collapse className="justify-content-end">
            {Auth.loggedIn() ? (
              <Navbar.Text>
                Signed in as: <a href="/me">{user.username}</a>
              </Navbar.Text>
            ) : (
              <Navbar.Text />
            )}
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
