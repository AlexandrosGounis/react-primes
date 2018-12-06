import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: [],
      alg: false,
      time: 0
    };
  }

  handleClick = e => {
    this.setState({ alg: !this.state.alg });
    document.querySelector(".input").placeholder = document.querySelector(
      ".input"
    ).value;
    document.querySelector(".input").value = "";
  };

  handleChange = e => {
    let time = performance.now();
    let number = e.target.value;
    let primes = [];
    var p;
    let initialTable = [];

    for (let point = 0; point < primes.length; point++) {
      primes[point] = initialTable[point] = false;
    }

    if (this.state.alg) {
      // Sieve of Eratosthenes

      for (p = 2; p <= Math.sqrt(number); ++p) {
        if (initialTable[p] !== false) {
          let k = 3;
          let j = 2 * p;
          while (j <= number) {
            initialTable[j] = false;
            j = p * k;
            k++;
          }
        }
      }

      for (let out = 2; out <= number; out++) {
        if (initialTable[out] !== false) {
          primes.push(out + ",   ");
        }
      }

      this.setState({ text: primes, time: performance.now() - time });
    } else {
      // Sieve of Atkin

      let primes = ["2, ", "3, ", "5, "];
      let n;

      let max = Math.sqrt(number);
      for (let x = 1; x <= max; x++) {
        for (let y = 1; y <= max; y++) {
          // Condition 1
          n = 4 * Math.pow(x, 2) + Math.pow(y, 2);
          if (n <= number && (n % 12 === 1 || n % 12 === 5)) {
            initialTable[n] = !initialTable[n];
          }
          // Condition 12
          n = 3 * Math.pow(x, 2) + Math.pow(y, 2);
          if (n <= number && n % 12 === 7) {
            initialTable[n] = !initialTable[n];
          }
          // Condition 3
          if (x > y) {
            n = 3 * Math.pow(x, 2) - Math.pow(y, 2);
            if (n <= number && n % 12 === 11) {
              initialTable[n] = !initialTable[n];
            }
          }
        }
      }

      for (let i = 5; i <= max; i++) {
        if (initialTable[i] === true) {
          for (let j = Math.pow(i, 2); j <= number; j += Math.pow(i, 2)) {
            initialTable[j] = false;
          }
        }
      }

      for (let out = 7; out < number; out++) {
        if (initialTable[out]) {
          primes.push(out + ",  ");
        }
      }
      this.setState({ text: primes, time: performance.now() - time });
    }
  };

  render() {
    return (
      <div className="App">
        <h2>
          PRIME <b style={{ fontWeight: 600 }}>FINDER</b>
        </h2>
        <center>
          <div>{this.state.time.toString().substr(0, 4) + "ms"}</div>
          <input
            className="input"
            type="number"
            placeholder="enter number"
            onChange={this.handleChange}
          />
          <div>
            <select onChange={this.handleClick}>
              <option onMouseDown={this.handleClick}>Sieve of Atkin</option>
              <option>Sieve of Ερατοσθένης</option>
            </select>
          </div>
          <div className="numbers">
            {this.state.text}
            {this.state.alg}
          </div>
        </center>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
