import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { MovieCar } from '../movie-card/movie-card'

export class DirectorView extends React.Component {
  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return(
      <Row className="main-view justify-content-md-center">
        <Col md={10}>
          <Jumbotron fluid>
            <h1 className="director-name">{director.Name}</h1>

            <div className="director-bio">
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </div>

            <div className="director-birth">
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </div>

            <div className="director-death">
              <span className="label">Death: </span>
              <span className="value">{director.Death}</span>
            </div>
            
          </Jumbotron>

          <h4 className="mt-4">Some {director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Name) {
                return (
                  <MovieCard
                    key = {movie._id}
                    movie = {movie} />
                );
              }
            })}
          </div>
        </Col>
      </Row>
    );
  }
}