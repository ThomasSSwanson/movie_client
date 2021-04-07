import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './login-view.scss'

import { setUser } from '../../action/action';


export function LoginView(props) {
  const { setUser } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[1].value)
    /* Send a request to the server for authentication */
    axios.post('http://phantasmophobia.herokuapp.com/login', {
      username: e.target[0].value,
      password: e.target[1].value
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      setUser(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link to={`/register`}>
        <Button variant="link">Register</Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser } )(LoginView);