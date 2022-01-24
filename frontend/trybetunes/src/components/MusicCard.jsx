import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      isLoading: false,
      favorites: [],
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  // handleFavChecked = () => {
  //   const { fav, track } = this.props;
  //   // verificando se o target se encontra em favoritos.
  //   fav.forEach((idFav) => {
  //     track.some((song) => {
  //       if(song.trackId === idFav) {
  //         this.setState({
  //           [idFav.checked]: true,
  //         })
  //       }
  //     })
  // })}

  handleCheck = async ({ target }) => {
    const { track } = this.props;
    const stateFav = target.checked;
    // setando state inicial
    this.setState({
      active: stateFav,
      isLoading: stateFav,
    });

    await addSong(track.id);

    if (stateFav) {
      this.setState({
        isLoading: !stateFav,
      });
    }
  }

  render() {
    const { track } = this.props;
    const { active, isLoading } = this.state;
    return (
      // retira map, e passa este para o Album.jsx
      <section
        key={ track.trackId }
        className="music-card"
      >
        <div>
          <h5>{ track.trackName }</h5>
          <img
            src={ track.artworkUrl60 }
            alt={ track.trackName }
          />
          <audio
            data-testid="audio-component"
            src={ track.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <section>
            <label htmlFor={ track.trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${track.trackId}` }
                id={ track.trackId }
                type="checkbox"
                checked={ active }
                onChange={ this.handleCheck }
              />
              { isLoading && <Loading /> }
            </label>
          </section>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.instanceOf(Array).isRequired,
};

export default MusicCard;
