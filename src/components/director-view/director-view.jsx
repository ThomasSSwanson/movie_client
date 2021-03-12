import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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