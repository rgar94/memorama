import { html, LitElement, css } from 'lit-element';

export class Board extends LitElement {
  static  get styles() {
    return css`
      ul {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-row-gap: 20px;
        font-size: 50px;
        align-content: center;
        justify-content: center;
        background-color: aquamarine;
      }
    `;
  }

  static get properties() {
    return {
      playerTurn: {
        type: Boolean
      },
      firstCard: {
        type: String
      },
      secondCard: {
        type: String
      },
      cardList: {
        type: Array
      }
    }
  }

  constructor() {
    super();
    this.playerTurn = true;
    this.firstCard = '';
    this.secondCard = '';
    this.cardList = ['👻','👻','☠','☠','🐼','🐼','🐰','🐰','🦝','🦝','🐯','🐯','🦊','🦊','🦁','🦁','🐱','🐱','🐺','🐺'];
  }

  render() {
    return html`
    <div id="board">
      <ul>
        ${this.cardList.map(i => html`<li>${i}</li>`)}
      </ul>
    </div>
      `;
  }
}
