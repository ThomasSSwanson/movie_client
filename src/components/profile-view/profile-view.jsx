// style

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Row, Col, Card } from 'react-bootstrap';

import './profile-view.scss';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  

  deleteUser() {
    let storageUser = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios.delete(`https://phantasmophobia.herokuapp.com/users/${storageUser}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert(storageUser + 'has been deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.pathname = '/';
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteFavorite(movie) {
    let token = localStorage.getItem('token');
    let url = "https://phantasmophobia.herokuapp.com/users/" + localStorage.getItem('user') + '/movies/' + movie._id
    axios.delete(url, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  render() {
    const {movies, user} = this.props;
    console.log(user);
    const favoriteMovieList = movies.filter((movie) => {
      return user.favoriteMovies.includes(movie._id);
    });

    if (!movies) alert("Please sign in");

    return(
      <Row className='profile-view'>
        <Col>
              <Form style={{ width: "24rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{user.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{user.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{user.birthday}</Form.Label>
                </Form.Group>
                  <Link to={`/users/update/${user.username}`}>
                    <Button variant="outline-light" 
                            type="link"
                            size="sm" 
                            block
                    >
                      Edit Profile
                    </Button>
                  </Link>
                <Link to={`/`}>
                  <Button variant="outline-light" 
                          type="submit"
                          size="sm"
                          block
                  >
                    Back to Main
                  </Button>
                </Link>
                <Button variant="outline-danger" 
                        size="sm"
                        block
                        onClick={() => this.deleteUser()}
                >
                  Delete Account
                </Button>
                
              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "24rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                      <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.deleteFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
      </Row>
    )}
}

let mapStateToProps = state => {
  return { user: state.user }
}

// #4
export default connect(mapStateToProps)(ProfileView);