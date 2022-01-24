import React from 'react';
import Expense from './components/Expense';
import Header from './components/Header';
import Table from './components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense />
        <Table />
      </div>
    );
  }
}

export default Wallet;
