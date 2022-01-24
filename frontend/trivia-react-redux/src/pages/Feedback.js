import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getGravatar from '../services/gravatar';
import { savePlayers } from '../redux/actions/resultsAction';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.goToRankingPage = this.goToRankingPage.bind(this);
  }

  componentDidMount() {
    const { playerName, score, userEmail, dispatchSaveRank } = this.props;
    dispatchSaveRank(playerName, score, getGravatar(userEmail));
    // const dataRanking = { name: playerName, score, picture: getGravatar(userEmail) }
    // localStorage.setItem('ranking', JSON.stringify(dataRanking));
  }

  feedbackMessage() {
    const { correctAnswers } = this.props;
    const MIN_SCORE = 3;

    if (correctAnswers.length < MIN_SCORE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  redirectToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  goToRankingPage() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { userEmail, playerName, score, correctAnswers } = this.props;
    return (
      <section id="feedback">
        <header>
          <img
            data-testid="header-profile-picture"
            src={ getGravatar(userEmail) }
            alt="avatar"
          />
          <h2 data-testid="header-player-name">{ playerName }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">{ correctAnswers.length }</h2>
        <h1 data-testid="feedback-text">{ this.feedbackMessage() }</h1>
        <button
          type="button"
          onClick={ this.redirectToLogin }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRankingPage }
        >
          Ver Ranking
        </button>
      </section>
    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  dispatchSaveRank: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.loginReducer.playerEmail,
  playerName: state.loginReducer.playerName,
  score: state.resultsReducer.score,
  correctAnswers: state.resultsReducer.correctAnswers,
  ranking: state.resultsReducer.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveRank: (name, score, picture) => dispatch(savePlayers(name, score, picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
