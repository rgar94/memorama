import { html, LitElement, css } from 'lit-element';

export class Scoreboard extends LitElement {

  static get styles() {
    return css `
      #score {
        height: 200px;
        display: inline;
        font-size: 20px;
      }

      .player1 {
        display: inline;
        padding: 10px;
        border: 2px solid #cbbd05;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .player2 {
        display: inline;
        padding: 10px;
        margin-left: 200px;
        border: 2px solid #cbbd05;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .score1 {
        width: 100px;
        padding: 10px;
        display: inline;
        border: 2px solid #cbbd05;
        background-color: #6e383e;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      .score2 {
        width: 100px;
        font-size: 20px;
        padding: 10px;
        display: inline;
        border: 2px solid #cbbd05;
        background-color: #6e383e;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      h2 {
        display: inline;
      }

      .turn1 .player1 {
        background-color: #5e8c1a;
        box-shadow: 0 0 30px 20px #f3db8f;
      }

      .turn2 .player2 {
        background-color: #5e8c1a;
        box-shadow: 0 0 30px 20px #f3db8f;
      }
    `;
  }

  static get properties() {
    return {
      turn: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.turn = 1;

  }

  render() {
    return html`
      <div id='score' class='turn${this.turn}'>
        <div class='player1'>
          <h2>Player 1</h2>
        </div>
        <slot name="player1" class='score1'></slot>
      </div>
      <div id='score' class='turn${this.turn}'>
        <div class='player2'>
          <h2>Player 2</h2>
        </div><slot name="player2" class='score2'></slot>
        </div>
      </div>
      `;
  }
}
