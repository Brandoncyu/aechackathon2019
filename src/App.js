import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="time">Time</label>
          <input type="number" name="time" id="time" value="time" />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Pace</label>
          <select>
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </fieldset>
      </form>
    );
  }
}

export default App;
