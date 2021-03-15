import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileUpdate } from '../profile-update/profile-update'
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view'

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  getMovies(token) {
    axios.get('https://phantasmophobia.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;

    // If no user is logged in render the login view
    

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
    
          <header>
            <Link to={`/users/${localStorage.getItem('user')}`}>
              {localStorage.getItem('user')}
            </Link>
            <Button variant="outline-dark" onClick={() => this.onLogout()}>Logout</Button>
          </header>

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return movies.map(m =>  <Col md={3}><MovieCard key={m._id} movie={m}/></Col>)}}/>
          
          <Route path="/register" render={() => <RegistrationView />} />

          <Route path="/movies/:movieId" render={({ match }) => <Col md={8}><MovieView movie={movies.find(m => m._id === match.params.movieId)}/></Col>}/>
          
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView movies={ movies } director={movies.find(m => m.Director.Name === match.params.name).Director}/>}}/>
          
          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <GenreView movies={ movies } genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}}/>

          <Route exact path="/users/:username" render={() => <ProfileView movies = {movies}/>}/>

          <Route exact path="/users/update/:username" render={() => <ProfileUpdate/>}/>
        </Row>
      </Router>
    );
  }
}