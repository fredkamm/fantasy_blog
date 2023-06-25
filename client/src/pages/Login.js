import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [errors, setErrors] = useState({ email: null, password: null });
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

    // Perform validation
    let hasErrors = false;
    const updatedErrors = { email: null, password: null };

    if (!formState.email) {
      updatedErrors.email = "Email is required.";
      hasErrors = true;
    }

    if (!formState.password) {
      updatedErrors.password = "Password is required.";
      hasErrors = true;
    }

    setErrors(updatedErrors);

    if (hasErrors) {
      return;
    }

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
    <Card className="my-4">
      <div className="col-12">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    className="form-input"
                    value={formState.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="******"
                    className="form-input"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                  />
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
              <p className="flex-row justify-center mb-4">
                Don't have an account?
                <br />
                <Link to="/signup">Sign up</Link>.
              </p>
              <Button
                variant="primary"
                style={{ cursor: "pointer" }}
                type="submit"
              >
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
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
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
