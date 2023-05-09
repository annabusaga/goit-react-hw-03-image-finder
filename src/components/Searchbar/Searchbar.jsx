import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  onChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
