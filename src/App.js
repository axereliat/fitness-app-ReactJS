import React, { Component } from 'react';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routes from "./Routes";
import {Jumbotron} from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
          <Jumbotron>
            <Routes/>
          </Jumbotron>
        <Footer/>
      </div>
    );
  }
}

export default App;
