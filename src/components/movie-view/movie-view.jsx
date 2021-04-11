// card-img-top size needs to be fixed
// why is movie-view sharing styles with movie-card
// if movie is already favorited change heart icon

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';

import './movie-view.scss'
import { setUser } from '../../action/action';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {isHovered: false};
    this.toggleHover = this.toggleHover.bind(this);
  }

  onFavorite(id) {
    let token = localStorage.getItem('token');
    axios.post(`https://phantasmophobia.herokuapp.com/users/${this.props.user.username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the redux state
        console.log(response.data);
        // this.props.setUser(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  toggleHover() {
    this.setState(prevState => ({isHovered: !prevState.isHovered}));
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return(
      <Row>
        <Col md={8}>
          <Card className="single-movie-card">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body className="title-box">
              <Card.Text className="movie-title">{movie.Title}</Card.Text>
              <div className="heart-box" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
              {
                this.state.isHovered ?
                <IoIosHeart className="heart" onClick={() => this.onFavorite(movie._id)}/> :
                <IoIosHeartEmpty className="heart"/>
              }
              </div>
            </Card.Body>
            <Card.Body>
              <Card.Text className="description">DESCRIPTION</Card.Text> 
              <Card.Text className="description-text">{movie.Description}</Card.Text>
            </Card.Body>
            <Card.Body className="director-genre-box">
              <Card.Text className="director-genre">
                <span className="description">GENRE</span> <br/>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="director-genre-button" variant="link">{movie.Genre.Name}</Button>
                </Link>
              </Card.Text>
              <Card.Text className="director-genre">
                <span className="description">DIRECTOR</span> <br/>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className="director-genre-button" variant="link">{movie.Director.Name}</Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}

let mapStateToProps = state => {
  console.log(state);
  return { user: state.user }
}

// #4
export default connect(mapStateToProps, { setUser } )(MovieView);

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string,
//       Description: PropTypes.string
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string,
//       Bio: PropTypes.string,
//       Birth: PropTypes.string,
//       Death: PropTypes.string
//     }),
//     Featured: PropTypes.bool
//   }).isRequired
// };