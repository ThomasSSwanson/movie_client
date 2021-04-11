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

      // <Row className="main-view justify-content-md-center">
      //   <Col md={10}>
      //     <Jumbotron fluid>
      //       <h1 className="director-name">{director.Name}</h1>

      //       <div className="director-bio">
      //         <span className="label">Bio: </span>
      //         <span className="value">{director.Bio}</span>
      //       </div>

      //       <div className="director-birth">
      //         <span className="label">Birth: </span>
      //         <span className="value">{director.Birth}</span>
      //       </div>

      //       <div className="director-death">
      //         <span className="label">Death: </span>
      //         <span className="value">{director.Death}</span>
      //       </div>
            
      //     </Jumbotron>

      //     <h4 className="mt-4">Some {director.Name} movies</h4>
      //     <div className="d-flex row mt-3 ml-1">
      //       {movies.map((movie) => {
      //         if (movie.Director.Name === director.Name) {
      //           return (
      //             <MovieCard
      //               key = {movie._id}
      //               movie = {movie} />
      //           );
      //         }
      //       })}
      //     </div>
      //   </Col>
      // </Row>
    );
  }
}