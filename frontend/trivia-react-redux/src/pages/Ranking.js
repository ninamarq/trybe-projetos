import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();
    this.goHome = this.goHome.bind(this);
    this.renderRanking = this.renderRanking.bind(this);
  }

  goHome() {
    const { history } = this.props;
    history.push('/');
  }

  renderRanking() {
    const { ranking } = this.props;
    // organiza ranking de forma decrescente
    return ranking.sort((a, b) => b.score - a.score)
      .map((player, index) => (
        <div
          key={ index }
        >
          <h5
            data-testid={ `player-name-${index}` }
          >
            { player.name }
          </h5>
          <p
            data-testid={ `player-score-${index}` }
          >
            { player.score }
          </p>
        </div>
      ));
  }

  render() {
    return (
      <div>
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
        <section>
          { this.renderRanking() }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Início
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.resultsReducer.ranking,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  ranking: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
