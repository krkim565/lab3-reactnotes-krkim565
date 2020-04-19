// change require to es6 import style
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

// import $ from 'jquery';

const App = () => <div className="test">All the REACT are belong to us!</div>;
// const $ = require('jquery');
ReactDOM.render(<App />, document.getElementById('main'));

let num = 0;
window.setInterval(() => {
  num += 1;
  document.getElementById('main').innerHTML = `You've been on this page for ${num} seconds...`;
}, 1000);
