import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Favicon from 'react-favicon';
import DayView from './Components/DayView';
import AddFoodViewContainer from './Components/AddFoodViewContainer';
import CreateFoodView from './Components/CreateFoodView';
import StatisticsView from './Components/StatisticsView';
import MyAccountView from './Components/MyAccountView';
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
            component={AddFoodViewContainer}
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

          <Route
            exact path="/me"
            component={() => (
                <MyAccountView />
              )}
          />
        </Switch>
        <Footer />
    	</div>
    );
  }
}

export default App;
