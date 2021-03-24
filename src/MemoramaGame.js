import { html, css, LitElement } from 'lit-element';

export class MemoramaGame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--memorama-game-text-color, #000);
      }

      h1 {
        text-align: center;
      }

      .board {
        height: 640px;
        width: 1024px;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: 20px;
        grid-column-gap: 100px;
        font-size: 50px;
        background-color: aquamarine;
        text-align: center;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        margin-top: 20px;
      }

      .score {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      deck: {
        type: Array,
        value: []
      },
      turn: {
        type: Number
      },
      endTurn: {
        type: Boolean
      },
      canMove: {
        type: Boolean
      },
      score: {
        type: Object
      },
      opened: {
        type: Array
      },
      namePlayer1: {
        type: String
      },
      namePlayer2: {
        type: String
      },
      cardList: {
        type: Array
      },
    }
  }

  __randomizer() {
    const deckAux = ['👻','👻','☠','☠','🐼','🐼','🐰','🐰','🦝','🦝','🐯','🐯','🦊','🦊','🦁','🦁','🐱','🐱','🐺','🐺'];
   this.deck = this.cardList.map(x => ({
      value: x,
      isOpen: false,
    }));
  }


  __startGame(){
    this.__randomizer();
    this.turn = 1;
    this.endTurn = false;
    this.canMove = true;
    this.score = { 1: 0, 2: 0 };
    this.opened = [];
  }

  __deleteCards(event) {
    setTimeout( ()=>{
      this.opened[0].target.dispatchEvent(new Event(event));
      this.opened[1].target.dispatchEvent(new Event(event));
      this.opened = [];
    }, 1000);
  }

  __validPlay() {
    if (this.opened[0].symbol === this.opened[1].symbol) {
      this.score[this.turn] += 1;
      this.__deleteCards('correct');
      if (this.score[1] + this.score[2] === this.cardList.length/2) {
        if(this.score[1] > this.score[2]){
          console.log('Player 1 wins')
        } else if (this.score[1] < this.score[2]){
          console.log('Player 2 wins')
        }
      }

    } else {
      this.__deleteCards('close');
      this.turn = this.turn === 1 ? 2 : 1;
    }
  }



  __openCard(e) {
    if (this.opened.length >= 0 && this.opened.length <= 2 && this.canMove) {
      e.target.dispatchEvent(new Event('open'));
      this.opened.push({
        symbol: e.target.symbol,
        target: e.target,
      });
      if (this.opened.length === 2) {
        this.__validPlay();
      }
    }
  }

  constructor() {
    super();
    this.cardList = ['👻','👻','☠','☠','🐼','🐼','🐰','🐰','🦝','🦝','🐯','🐯','🦊','🦊','🦁','🦁','🐱','🐱','🐺','🐺'];
    this.__startGame();
}

  render() {
    return html`
    <header>
        <h1>Ready to play memorama?</h1>
    </header>
    <div class='center'>
      <scoreboard-scs>
        <span slot="player1">${this.score[1]}</span>
        <span slot="player2">${this.score[2]}</span>
      </scoreboard-scs>
      <div class="board">
        ${this.deck.map(
          card => html`
            <card-scs
              .symbol="${card.value}"
              @click="${this.__openCard}"
            ></card-scs>
          `
        )}
      </div>
    </div>
    `;
  }
}
