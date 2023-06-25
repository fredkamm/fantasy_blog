import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [show, setShow] = useState(true);
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    let hasErrors = false;
    const updatedErrors = { email: null, password: null };

    if (!formState.username) {
      updatedErrors.username = "Username is required.";
      hasErrors = true;
    }

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

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: "",
      email: "",
      password: "",
    });

  };

  return (
    <Card className="my-4">
      <div className="col-12 ">
        <h4 className="card-header">Sign up</h4>
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
                <FloatingLabel controlId="floatingUsername" label="Username">
                  <Form.Control
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    isInvalid={errors.name}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>

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
                Don't have an account? <br/> <Link to="/signup">Sign up</Link>.
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

export default Signup;
