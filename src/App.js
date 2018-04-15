import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Favicon from 'react-favicon';
import DayView from './Components/DayView';
import AddFoodView from './Components/AddFoodView';
import Footer from './Components/Footer';
import appFavicon from './resources/favicon.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Favicon url={appFavicon} />
        <Header />
        {/* <DayView />*/}
        <AddFoodView />
        <div className="FoodsPanel__cancel-link"><a href="#">Cancel</a></div>
        <Footer />
    	</div>
    );
  }
}

export default App;
