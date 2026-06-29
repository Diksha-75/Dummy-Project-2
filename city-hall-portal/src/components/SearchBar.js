// src/components/SearchBar.js
// LEGACY: Uses CityContext.Consumer render prop pattern.
// Migration target: replace with useContext(CityContext) hook.
import React, { Component } from "react";
import { CityContext } from "../context/CityContext";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { localQuery: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ localQuery: e.target.value });
  }

  handleSubmit(e, setSearchQuery) {
    e.preventDefault();
    setSearchQuery(this.state.localQuery);
    this.props.history.push("/services");
  }

  render() {
    return (
      <CityContext.Consumer>
        {({ setSearchQuery }) => (
          <form
            className="search-bar"
            onSubmit={(e) => this.handleSubmit(e, setSearchQuery)}
            role="search"
          >
            <input
              type="search"
              placeholder="Search services, permits, departments…"
              value={this.state.localQuery}
              onChange={this.handleChange}
              aria-label="Search city services"
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Submit search">
              Search
            </button>
            <style>{`
              .search-bar { display: flex; max-width: 520px; width: 100%; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); }
              .search-input { flex: 1; padding: 14px 18px; font-size: 15px; border: 2px solid transparent; outline: none; font-family: var(--font-body); background: var(--white); }
              .search-input:focus { border-color: var(--gold); }
              .search-btn { background: var(--gold); color: var(--navy); font-weight: 700; font-size: 14px; padding: 0 24px; letter-spacing: 0.03em; transition: background 0.15s; }
              .search-btn:hover { background: var(--gold-light); }
            `}</style>
          </form>
        )}
      </CityContext.Consumer>
    );
  }
}

// LEGACY: withRouter HOC. Migration target: useNavigate() hook in React Router v6 + React 18.
export default withRouter(SearchBar);
