// rem vs px
// why does account button break but the other button doesnt?

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom'

// #0 
import { setMovies } from '../../action/action';
import { setUser } from '../../action/action';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, Form, FormControl, Container } from 'react-bootstrap'

import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileUpdate from '../profile-update/profile-update'
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view'

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let storageUser = localStorage.getItem('user');
    if (accessToken !== null) {
      this.getMovies(accessToken);
    }

    console.log(this.props.user);

    if (Object.entries(this.props.user).length === 0 && storageUser !== null) {
      axios.get(`https://phantasmophobia.herokuapp.com/users/${storageUser}`, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
    .then(response => {
        this.props.setUser(response.data)
        console.log('HERE');
        console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    } 
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {

    console.log(authData);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
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
      // #1 Assign the result to the redux state
        this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let { movies, user } = this.props;
    

    // If no user is logged in render the login view
    

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (

      <Router>
        <Navbar className="custom-nav" variant="dark">
          <Navbar.Brand href={`/`}>Horror Hill</Navbar.Brand>
          <Nav className="ml-auto profile-nav">
            <Link className="profile-link" to={`/users/${localStorage.getItem('user')}`}>
              {localStorage.getItem('user')}
            </Link>
            <p className="profile-link" onClick={() => this.onLogout()}>Logout</p>
          </Nav>
        </Navbar>

        <Navbar className="custom-nav lower-nav" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={`/users/${localStorage.getItem('user')}`}>Account</Nav.Link>
            <Nav.Link href={`/`}>Movies</Nav.Link>
          </Nav>
        </Navbar>

        <Container className="main-view-box">
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              if (Object.entries(user).length === 0) return <LoginView onLoggedIn={authData => this.onLoggedIn(authData)}/>;
              return <MoviesList movies={ movies }/>}}/>
            
            <Route path="/register" render={() => <RegistrationView />} />

            <Route path="/movies/:movieId" render={({ match }) => <Col md={8}><MovieView movie={movies.find(m => m._id === match.params.movieId)}/></Col>}/>
            
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <DirectorView movies={ movies } director={movies.length > 0 ?  movies.find(m => m.Director.Name === match.params.name).Director : match.params.name}/>}}/>
            
            <Route exact path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <GenreView movies={ movies } genre={movies.length > 0 ?  movies.find(m => m.Genre.Name === match.params.name).Genre : match.params.name}/>}}/>

            <Route exact path="/users/:username" render={() => <ProfileView movies = {movies}/>}/>

            <Route exact path="/users/update/:username"  render={({ history }) => <ProfileUpdate onGoBack={() => history.goBack()}/>}/>
          </Row>
        </Container>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return {movies: state.movies,
          user: state.user }
}

// #4
export default connect(mapStateToProps, { setMovies, setUser } )(MainView);