import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchDisable: true,
      search: '',
      searchInput: this.handleSearchInput,
      clickSearch: this.gettingAlbums,
      showAlbum: false,
      albums: [],
      artist: '',
      isLoading: false,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchValidate = this.handleSearchValidate.bind(this);
    this.gettingAlbums = this.gettingAlbums.bind(this);
  }

  handleSearchInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    },
    () => this.handleSearchValidate());
  }

  handleSearchValidate = () => {
    const { search } = this.state;
    const minSearch = 2;
    if (search.length >= minSearch) {
      this.setState({
        searchDisable: false,
      });
    }
  }

  gettingAlbums = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      isLoading: true,
      artist: search,
    },
    async () => {
      const artistMaterials = await searchAlbumsAPI(search);
      this.setState({
        albums: artistMaterials,
        showAlbum: true,
        search: '',
        isLoading: false,
      });
    });
  }

  render() {
    const { search,
      searchDisable,
      searchInput,
      clickSearch,
      isLoading,
      showAlbum,
      albums,
      artist } = this.state;

    const inputArtist = (
      <div className="search-form">
        <label
          htmlFor="search"
        >
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            id="search-input"
            placeholder="Artist that you want to listen!"
            value={ search }
            onChange={ searchInput }
          />
        </label>
        <button
          type="submit"
          className="button"
          data-testid="search-artist-button"
          disabled={ searchDisable }
          onClick={ clickSearch }
        >
          Pesquisar
        </button>
      </div>
    );

    const waitingTag = (
      <div>
        <Loading />
      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            {
              isLoading
                ? waitingTag
                : inputArtist
            }
          </label>
        </form>
        <div>
          {
            showAlbum && (
              <div>
                <section
                  className="result"
                >
                  <h4>
                    Resultado de álbuns de:
                    { ' ' }
                    { artist }
                  </h4>
                </section>
                { albums.map((album) => (
                  // Foi modificado para que fosse possível passar props
                  <AlbumCard
                    key={ album }
                    album={ album }
                  />
                ))}
              </div>
            )
          }
          {
            albums.length === 0 && <p>Nenhum álbum foi encontrado</p>
          }
        </div>
      </div>
    );
  }
}

export default Search;
