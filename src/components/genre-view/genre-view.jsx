import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export class GenreView extends React.Component {

  render() {
    const { genre, movies } = this.props;

    if (!movies) return console.log('NO MOVIES');

    return(
      <Row className="main-view justify-content-md-center">
        <Col md={10}>
          <Jumbotron fluid>
            <h1 className="genre-name">{genre.Name}</h1>

            <div className="genre-description">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
          </Jumbotron>
          <h4 className="mt-4">Some {genre.Name} movies</h4>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Name) {
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