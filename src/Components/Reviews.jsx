import { Component } from "react";
import axios from "axios";

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchMovies();

    this.pollingInterval = setInterval(this.fetchMovies, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.pollingInterval);
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=3AnqdqcAh9BPx7gOJCbX7qsohsT8hRjO"
      );

      const data = await response.data.results;

      this.setState({ movies: data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        {movies.map((movie, index) => (
          <div key={index}>
            <p>Title: {movie.display_title}</p>
            <p>Critics Pick: {movie.critics_pick}</p>
            <p>Headline: {movie.headline}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Reviews;
