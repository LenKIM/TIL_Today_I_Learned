import React, { Component } from 'react';

import './index.css';

/*
Code for these components was copied verbatim from Friendly Chat starter and has
not been "componentized" optimally to suit react practices
Rather, the goal was to quickly adapt the existing codebase to run within the
react-fire scaffold, and then iterate and refactor for efficiency
*/

class App extends Component {

  render() {
    console.log("옙 탐")
    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <AppHeader />
        <AppMain />
      </div>
    );
  }
}

class AppHeader extends Component {
  render(){
    return (
      <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <h3><i className="material-icons"> chat_bubble_outline </i> ReactFire Chat </h3>
          </div>
          <div id="user-container">
            <div hidden id="user-pic"></div>
            <div hidden id="user-name"></div>
            <button hidden id="sign-out" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
              Sign-out
            </button>
            <button id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
              <i className="material-icons">account_circle</i>Sign-in with Google
            </button>
          </div>
        </div>
      </header>
    );
  }
}

class AppMain extends Component {
  render(){
    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

          {/* <!-- Messages container --> */}
          <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              <div id="messages">
                <span id="message-filler"></span>
              </div>
              <form id="message-form" action="#">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="message" />
                  <label className="mdl-textfield__label" htmlFor="message"> Message...</label>
                </div>
                <button id="submit" disabled type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                  Send
                </button>
              </form>
              <form id="image-form" action="#">
                <input id="mediaCapture" type="file" accept="image/*,capture=camera" />
                <button id="submitImage" title="Add an image" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
                  <i className="material-icons">image</i>
                </button>
              </form>
            </div>
          </div>

          <div id="must-signin-snackbar" className="mdl-js-snackbar mdl-snackbar">
            <div className="mdl-snackbar__text"></div>
            <button className="mdl-snackbar__action" type="button"></button>
          </div>

        </div>
      </main>
    );
  }
}

export default App;
