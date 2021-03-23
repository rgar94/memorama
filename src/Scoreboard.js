import { html, LitElement, css } from 'lit-element';

export class Scoreboard extends LitElement {

  static get styles() {
    return css `
      :host {
        background: #7f7f7f;
        color: black;
        border-radius: 30px;
        text-align: center;
        width: 200px;
        box-shadow: 0 5px 30px #f3ecec;
      }

      #score-board {
        display: flex;
        justify-content: space-around;
      }

      #score1 {
        display: inline;
        background: #009688;
        color: white;
        border: 2px solid #e91e63;
      }

      #score2 {
        display: inline;
        background: #00bcd4;
        color: white;
        border: 2px solid #673ab7;
      }
      `;
  }

  static get properties() {
    return {
      scoreP1: {
        type: Number
      },
      scoreP2: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    
  }

  render() {
    return html`
    <div id="score-board">
      <div id="score1">
      <p>P1</p>
        ${this.scoreP1}
      </div>
      <div id="score2">
      <p>P2</p>
      ${this.scoreP2}
      </div>
    </div>
      `;
  }
}
