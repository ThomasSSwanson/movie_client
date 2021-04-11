// make genre card and style

import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

import './genre-view.scss'

export class GenreView extends React.Component {

  render() {
    const { genre, movies } = this.props;

    if (!movies) return console.log('NO MOVIES');

    return(
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Card className="genre-card">
                <Card.Body className="title-box">
                  <Card.Text className="genre-title">{genre.Name}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className="description">DESCRIPTION</Card.Text> 
                  <Card.Text className="description-text">{genre.Description}</Card.Text>
                </Card.Body>
              </Card>
              <h4 className="mt-4">{genre.Name} movies</h4>
            </Col>
          </Row>
          
          <Row>
            
              {movies.map((movie) => {
                if (movie.Genre.Name === genre.Name) {
                  return (
                    <Col md={4}>
                      <MovieCard
                        key = {movie._id}
                        movie = {movie} />
                    </Col>  
                  );
                }
              })}          
        </Row>
      </React.Fragment>
    );
  }
}