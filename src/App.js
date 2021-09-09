import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://boss-bus-demo.herokuapp.com/",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      items: [],
      requestState: "Send",
    };
  }

  handleChange = (event) => {
    this.setState({
      token: event.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      requestState: "Processing...",
    });

    let res = await api.post("/", { token: this.state.token });

    // console.log(res.data[0]);
    const arrData = res.data.map((item) => {
      return (
        <div className="shadow-lg h-64 p-2">
          <h2 className="font-bold text-lg mb-5">{item.summary}</h2>
          <p className="mb-2">{item.description}</p>
          <p>
            {new Date(item.start.dateTime)
              ?.toLocaleTimeString()
              ?.replace(/(.*)\D\d+/, "$1")}{" "}
            -{" "}
            {new Date(item.end.dateTime)
              ?.toLocaleTimeString()
              ?.replace(/(.*)\D\d+/, "$1")}
          </p>
        </div>
      );
    });

    this.setState({
      items: arrData,
    });

    this.setState({
      requestState: "Send",
    });
  };

  render() {
    const nothingToShow = (
      <p className="font-bold text-3xl text-center pt-10">
        Nothing to show{" "}
        <span className="block text-lg">
          may require another hit on the send button 🙂
        </span>{" "}
      </p>
    );
    const renderData = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {this.state.items}
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-10 text-gray-500">
        <div className="md:col-span-2 pt-10 p-3 bg-gray-50">
          <div className="mb-5">
            <p className="mb-3 text-red-400 font-bold">
              You must sign in first ⚠
            </p>
            <a
              href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=582696874207-vrkrb3lfritufjul5fqtt1i4htull5q8.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob"
              target="_blank"
              rel="noreferrer"
            >
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Sign in
              </button>
            </a>
          </div>

          <form>
            <input
              onChange={this.handleChange}
              className="w-full bg-gray-100 py-2"
              type="text"
              placeholder="paste your token (4/1AX4XfWjDlSKVQiI...)"
            />

            <button
              onClick={this.onSubmit}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-full mt-10"
            >
              {this.state.requestState}
            </button>
          </form>
        </div>
        <div className="md:col-span-8 p-5">
          {this.state.items.length > 0 ? renderData : nothingToShow}
        </div>
      </div>
    );
  }
}

export default App;
