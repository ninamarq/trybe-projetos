import React from 'react';
import Card from './components/Card';
import Deck from './components/Deck';
import Form from './components/Form';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      onInputChange: this.handleInputChange,
      onSaveButtonClick: this.handleSaveButton,
      cardSaved: [],
    };
    this.handleValidate = this.handleValidate.bind(this);
  }

  // aula ao vivo do cestari salvou!!!
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    },
    () => this.handleValidate());
  }

  handleValidate = () => {
    const state = { ...this.state };
    const max = 90;
    const sum = Number(state.cardAttr1)
    + Number(state.cardAttr2)
    + Number(state.cardAttr3);
    const total = 210;

    if (
      state.cardName !== ''
      && state.cardImage !== ''
      && state.cardRare !== ''
      && state.cardDescription !== ''
      && sum <= total
      && Number(state.cardAttr1) <= max && Number(state.cardAttr1) >= 0
      && Number(state.cardAttr2) <= max && Number(state.cardAttr2) >= 0
      && Number(state.cardAttr3) <= max && Number(state.cardAttr3) >= 0
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  handleSaveButton = (event) => {
    event.preventDefault();
    const { cardName, cardDescription,
      cardAttr1, cardAttr2,
      cardAttr3, cardImage,
      cardRare, cardTrunfo,
      cardSaved } = this.state;
    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    cardSaved.push(card);

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      onInputChange: this.handleInputChange,
      onSaveButtonClick: this.handleSaveButton,
    }, this.handleTrunfo());
  }

  handleTrunfo = () => {
    const { cardSaved } = this.state;
    const verifyTrunfo = cardSaved.some((card) => card.cardTrunfo);
    this.setState({
      hasTrunfo: verifyTrunfo,
    });
  }

  render() {
    // essa parte de 'spread' para o estado, foi visto durante mentoria tecnica com isaac
    const state = { ...this.state };
    return (
      <div className="app">
        <h1 id="title">Tryunfo</h1>
        <Form
          { ...state }
        />
        <Card
          { ...state }
        />
        <Deck
          cards={ state.cardSaved }
        />
      </div>
    );
  }
}

export default App;
