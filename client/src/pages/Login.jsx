import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [show, setShow] = useState(true);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Card
      className="login-form-card my-4"
      bg="dark"
      text="light"
      border="light"
    >
      <div className="card">
        <h4 className="card-header bg-dark text-light p-2">Login</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Button className="login-button" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}

          {error && (
            <Alert
              className="my-3 p-3"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              <Alert.Heading>ERROR!</Alert.Heading>
              <p>
                {error.message}
                {show}
              </p>
            </Alert>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Login;
