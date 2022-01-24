import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      albumMaterial: [],
      favorites: [],
      isLoading: false,
    };
    this.gettingAlbum = this.gettingAlbum.bind(this);
    this.gettingFavs = this.gettingFavs.bind(this);
  }

  componentDidMount() {
    // https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react
    const urlId = window.location.pathname;
    const id = urlId.split('/')[2];
    this.gettingAlbum(id);
    this.gettingFavs();
  }

  gettingFavs = async () => {
    const { favorites } = this.state;
    this.setState({
      isLoading: true,
    });
    const favs = await getFavoriteSongs();
    this.setState({
      favorites: [...favorites, favs],
      isLoading: false,
    });
    const findingFav = favorites.find((id) => target.id === id);
    if (findingFav) {
      removeSong(target.id);
      this.setState({
        isLoading: findingFav,
      })
    }
  }

  async gettingAlbum(id) {
    const musics = await getMusics(id);
    this.setState({
      musics,
      albumMaterial: musics[0],
    });
  }

  render() {
    const { musics,
      albumMaterial,
      favorites,
      isLoading } = this.state;
    return (
      isLoading ? <Loading /> :
      <div data-testid="page-album">
        <Header />
        <section className="result">
          <h4 data-testid="artist-name">
            { albumMaterial.artistName }
          </h4>
          <h5 data-testid="album-name">
            { albumMaterial.collectionName }
          </h5>
          {/* SEMPRE FAZER MAP NO COMPONENTE PAI */}
          {
            musics.slice(1).map((music) => (
              <MusicCard
                key={ music.trackId }
                fav={ favorites }
                track={ music }
              />
            ))
          }
        </section>
      </div>
    );
  }
}

export default Album;
