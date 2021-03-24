import { html, LitElement, css } from 'lit-element';

export class Scoreboard extends LitElement {

  static get styles() {
    return css `
      .score {
        height: 200px;
        display: inline;
        font-size: 20px;
      }

      .player1 {
        display: inline;
        padding: 10px;
        border: 2px solid #269f9a;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .player2 {
        display: inline;
        padding: 10px;
        margin-left: 200px;
        border: 2px solid #269f9a;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .score1 {
        width: 100px;
        padding: 10px;
        display: inline;
        border: 2px solid #269f9a;
        background-color: #fff27f;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;

      }

      .score2 {
        width: 100px;
        font-size: 20px;
        padding: 10px;
        display: inline;
        border: 2px solid #269f9a;
        background-color: #fff27f;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      h2 {
        display: inline;
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
    this.turn = 1;

  }

  render() {
    return html`
      <div class='score'>
        <div class='player1'>
          <h2>Player 1</h2>
        </div>
        <slot name="player1" class='score1'></slot>
      </div>
      <div class='score'>
        <div class='player2'>
          <h2>Player 2</h2>
        </div><slot name="player2" class='score2'></slot>
        </div>
      </div>
      `;
  }
}
