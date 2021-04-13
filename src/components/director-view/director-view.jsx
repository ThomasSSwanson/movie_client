// why is col md={12} not working?

import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card } from 'react-bootstrap'

import { MovieCard } from '../movie-card/movie-card'

import './director-view.scss'

export class DirectorView extends React.Component {
  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return(
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Card className="genre-card">
                <Card.Body className="title-box">
                  <Card.Text className="genre-title">{director.Name}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className="description">Bio</Card.Text> 
                  <Card.Text className="description-text">{director.Bio}</Card.Text>
                </Card.Body>
              </Card>
              <h4 className="mt-4">{director.Name} movies</h4>
            </Col>
          </Row>
          
          <Row>
            
              {movies.map((movie) => {
                if (movie.Director.Name === director.Name) {
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

DirectorView.propTypes = {
  movie: PropTypes.array.isRequired,
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired
  })  
};