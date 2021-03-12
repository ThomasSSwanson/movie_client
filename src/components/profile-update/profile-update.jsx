import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import * as yup from 'yup';

import { Form, Button, Col } from 'react-bootstrap';

import './profile-update.scss';
import axios from 'axios';


export function ProfileUpdate(props) {

  const schema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    confirmPassword: yup.string().required(),
    birthday: yup.date().required()
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={values => {

        let token = localStorage.getItem('token');

        axios.put(`http://phantasmophobia.herokuapp.com/users/update/${localStorage.getItem('user')}`, {
          username: values.username,
          password: values.password,
          email: values.email,
          password: values.password,
          birthday: values.birthday
        },
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("Your profile was updated successfully");
          localStorage.setItem('user', data.username)
          window.open(`/users/${localStorage.getItem('user')}`, '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error changing user information')
        });
      }}
      initialValues={{
        password: '',
        username: '',
        confirmPassword: '',
        email: '',
        birthday: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationFormik06">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthday"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
                isInvalid={!!errors.birthday}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthday}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
      
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}
