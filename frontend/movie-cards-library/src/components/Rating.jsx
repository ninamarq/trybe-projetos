// implement Rating component here
import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <section className="movie-card-rating">
        <h4 className="rating">
          { rating }
        </h4>
      </section>
    );
  }
}

// Acesso https://medium.com/@henrique.weiand/react-defaultprops-proptypes-plano-de-aula-vi-2ac0f990cdd9
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
