import React, { Component } from "../../node_modules/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./InputUrl.module.css";
import axios from "../../node_modules/axios";
import Spinner from "../components/Spinner";
class InputUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      loading: false,
      shortUrl: "",
      copied: false,
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      error: false,
      loading: true
    });
    event.preventDefault();
    axios
      .post("https://tinysa.herokuapp.com/", {
        url: this.state.value
      })
      .then(res => {
        this.setState({
          loading: false,
          shortUrl: `https://tinysa.herokuapp.com/${res.data}`,
          value: ""
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          loading: false,
          shortUrl: `https://tinysa.herokuapp.com/${res.data}`,
          value: ""
        });
      });
  }
  render() {
    let errorText = this.state.error ? (
      <h1>Already shortened with url 😭</h1>
    ) : null;
    let copyText = this.state.copied ? <h1>Copied &#128077;</h1> : null;
    let link =
      this.state.shortUrl !== "" ? (
        <div className={classes.copy}>
          <h4>{this.state.shortUrl}</h4>
          <CopyToClipboard
            text={this.state.shortUrl}
            onCopy={() => this.setState({ copied: true })}
          >
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      ) : null;
    let button = this.state.loading ? (
      <Spinner />
    ) : (
      <button className={classes.InputUrlButton}>Submit</button>
    );
    return (
      <div className={classes.main}>
        <form className={classes.InputUrlForm} onSubmit={this.handleSubmit}>
          <label>
            <input
              className={classes.InputUrlText}
              type="text"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          {button}
        </form>
        {link}
        {copyText}
        {errorText}
      </div>
    );
  }
}

export default InputUrl;
