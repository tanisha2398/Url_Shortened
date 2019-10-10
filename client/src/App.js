import React, { Component } from "../node_modules/react";
import InputUrl from "./container/InputUrl";
import Spinner from "./components/Spinner";
import "./App.css";

class App extends Component {
  state = { isLoading: true };

  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    let display = <Spinner />;
    if (!this.state.isLoading) {
      display = (
        <header className="App-header">
          <h1>Write Url below to get Shortened-Url</h1>

          <InputUrl />
        </header>
      );
    }
    return <div className="App">{display}</div>;
  }
}

export default App;
