import React, { Component } from 'react';
import './App.css'; // Import your CSS file

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minCounter: 0,
      secCounter: 0,
      msecCounter: 0,
      laps: []
    };
    this.mins = null;
    this.secs = null;
    this.msecs = null;
  }

  toggleBtn = () => {
    const { lapBtn, resetBtn } = this.refs;
    lapBtn.classList.toggle("visibility");
    resetBtn.classList.toggle("visibility");
  };

  play = () => {
    const { playBtn } = this.refs;
    if (playBtn.innerHTML === "Play") {
      playBtn.innerHTML = "Pause";

      this.mins = setInterval(() => {
        this.setState(prevState => ({ minCounter: prevState.minCounter + 1 }));
      }, 60 * 1000);

      this.secs = setInterval(() => {
        this.setState(prevState => ({ secCounter: prevState.secCounter === 59 ? 0 : prevState.secCounter + 1 }));
      }, 1000);

      this.msecs = setInterval(() => {
        this.setState(prevState => ({ msecCounter: prevState.msecCounter === 99 ? 0 : prevState.msecCounter + 1 }));
      }, 10);
    } else {
      playBtn.innerHTML = "Play";
      clearInterval(this.mins);
      clearInterval(this.secs);
      clearInterval(this.msecs);
    }
    if (playBtn.innerHTML === "Pause") {
      this.toggleBtn();
    }
  };

  reset = () => {
    clearInterval(this.mins);
    clearInterval(this.secs);
    clearInterval(this.msecs);

    this.setState({
      minCounter: 0,
      secCounter: 0,
      msecCounter: 0,
      laps: []
    });

    this.toggleBtn();
  };

  lap = () => {
    const { minCounter, secCounter, msecCounter } = this.state;
    const lapTime = `${minCounter < 10 ? `0${minCounter}` : minCounter} : ${secCounter < 10 ? `0${secCounter}` : secCounter} : ${msecCounter < 10 ? `0${msecCounter}` : msecCounter}`;

    this.setState(prevState => ({
      laps: [...prevState.laps, lapTime]
    }));
  };

  clear = () => {
    this.setState({ laps: [] });
  };

  render() {
    const { minCounter, secCounter, msecCounter, laps } = this.state;
    return (
      <div className="container">
        <div className="watch">
          <div className="outer-box">
            <div className="inner-box">
              <span className="min">{minCounter < 10 ? `0${minCounter}` : minCounter} :</span>
              <span className="sec">{secCounter < 10 ? `0${secCounter}` : secCounter} :</span>
              <span className="msec">{msecCounter < 10 ? `0${msecCounter}` : msecCounter}</span>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button ref="resetBtn" className="resetbtn btn visibility" onClick={this.reset}>Reset</button>
          <button ref="playBtn" className="playbtn btn" onClick={this.play}>Play</button>
          <button ref="lapBtn" className="lapbtn btn visibility" onClick={this.lap}>Lap</button>
        </div>
        <ul className="laps">
          {laps.map((lap, index) => (
            <li key={index} className="lap-item">
              <span className="number">#{index + 1}</span>
              <span className="time-stamp">{lap}</span>
            </li>
          ))}
        </ul>
        <button className="clearbtn laptime" onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

export default Stopwatch;
