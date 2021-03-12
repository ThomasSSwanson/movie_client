import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

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
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
                      style={{ width: '16rem' }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Link
                          className="text-muted"
                          to={`/movies/${movie._id}`}
                        >
                          <Card.Title>{movie.Title}</Card.Title>
                        </Link>
                        <Card.Text>
                          {movie.Description.substring(0, 90)}...
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-top-0">
                        <Link to={`/movies/${movie._id}`}>
                          <Button
                            variant="link"
                            className="read-more-link pl-0"
                          >
                            Read more
                          </Button>
                        </Link>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Col>
      </Row>
    );
  }
}