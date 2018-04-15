import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Favicon from 'react-favicon';
import DayView from './Components/DayView';
import AddFoodView from './Components/AddFoodView';
import CreateFoodView from './Components/CreateFoodView';
import StatisticsView from './Components/StatisticsView';
import Footer from './Components/Footer';
import appFavicon from './resources/favicon.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Favicon url={appFavicon} />
        <Header />
        <Switch>
          <Route
            exact path="/"
            component={() => (
                <DayView />
              )}
          />

          <Route
            exact path="/add"
            component={() => (
                <div>
                  <AddFoodView />
                  <div className="FoodsPanel__cancel-link"><Link to="/">Cancel</Link></div>
                </div>
              )}
          />

          <Route
            exact path="/createfood"
            component={() => (
                <CreateFoodView />
              )}
          />

          <Route
            exact path="/stats"
            component={() => (
                <StatisticsView />
              )}
          />
        </Switch>
        <Footer />
    	</div>
    );
  }
}

export default App;
