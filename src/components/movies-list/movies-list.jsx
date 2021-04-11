// what is the key?

import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
    <Row className="justify-content-md-center">{filteredMovies.map(m =>
      <Col key={m._id} md={filteredMovies.length === 1
        ? 12
        : filteredMovies.length === 2
          ? 6
          : filteredMovies.length === 3
            ? 4
            : 3}>
        <MovieCard movie={m}/>
      </Col>
    )}</Row>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);