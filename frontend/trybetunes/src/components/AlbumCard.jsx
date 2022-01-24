import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <section
        className="albums-card"
      >
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          className="album-card"
          to={ `album/${album.collectionId}` }
        >
          { album.collectionName }
        </Link>
        <img
          src={ album.artworkUrl100 }
          alt={ album.collectionName }
          width="100px"
        />
      </section>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.instanceOf(Array).isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;
