// fix card image so that all cards appear the same and not stretched

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import { Link } from "react-router-dom";
import './movie-card.scss';

import { FaLongArrowAltRight } from 'react-icons/fa';

export class MovieCard extends React.Component {
  render() {

    const { movie } = this.props;

    return (
        <Card>
          
          <Card.Body className="card-name">{movie.Title}</Card.Body>
          
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="upper-card">
            <Card.Text className="truncate">{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Body className="lower-card">
            <FaLongArrowAltRight />
            <Link to={`/movies/${movie._id}`}>

              <Button variant="link">Read more</Button>
            </Link>
          </Card.Body>
        </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Featured: PropTypes.bool
  }).isRequired
};

