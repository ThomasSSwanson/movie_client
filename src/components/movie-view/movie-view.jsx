import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';

import './movie-view.scss'
import { setUser } from '../../action/action';
import axios from 'axios';
import { connect } from 'react-redux';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  onFavorite(id) {
    let token = this.props.user.token;
    console.log(token)
    axios.post(`https://phantasmophobia.herokuapp.com/users/${this.props.user.user.username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // #1 Assign the result to the redux state
        console.log(response.data)
        // this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return(
      <div className="movie-view">

        <img className="movie-poster" src={movie.ImagePath} />

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>

        <Button onClick={() => this.onFavorite(movie._id)} variant="link">Favorite this</Button>

      </div>
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