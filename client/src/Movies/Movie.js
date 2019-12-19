import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  updateMovie = e => {
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };
  deleteItem = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        // this.props.setMovie(res.data);
        const filtered = this.props.movie.filter(item => {
          if (this.state.movie.id !== item.id) {
            return item;
          }
        });
        this.props.setMovie(filtered);
        this.props.history.push("/");
        console.log(res.data);
      })
      .catch(err => console.log(err));
    // axios.get(`http://localhost:5000/api/movies`).then(res => {
    //   this.props.setMovie(res.data);
    //   console.log("GET", res.data);
    //   this.props.history.push("/");
    // });
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={this.updateMovie}>
          Edit
        </div>
        <div className="delete-button" onClick={this.deleteItem}>
          Delete
        </div>
      </div>
    );
  }
}
