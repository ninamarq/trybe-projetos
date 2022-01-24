// implement MovieCard component here
import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <section className="movie-card" key={ movie.title }>
        <div className="movie-card-body">
          <h4 className="movie-card-title">
            { movie.title }
          </h4>
          <h5 className="movie-card-subtitle">
            { movie.subtitle }
          </h5>
          <p className="movie-card-storyline">
            { movie.storyline }
          </p>
          <img className="movie-card-image" src={ movie.imagePath } alt={ movie.title } />
          <Rating rating={ movie.rating } />
        </div>
      </section>
    );
  }
}

// organizei conforme uso no card.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    imagePath: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
