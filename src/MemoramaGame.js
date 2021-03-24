import { html, css, LitElement } from 'lit-element';

export class MemoramaGame extends LitElement {
  static get styles() {
    return css`
      :host {
        color: #f5f5f5;
      }

      h1 {
        text-align: center;

      }

      .board {
        height: fit-content;
        min-height: 500px;
        width: 900px;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px 160px;
        font-size: 50px;
        background-image: url("https://i.ebayimg.com/00/s/Njg5WDEwMjQ=/z/RoYAAOSwPK5Zga-X/$_57.JPG?set_id=8800005007");
        background-size: cover;
        padding: 30px;
        border-radius: 20px;
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
      cardArray: {
        type: Array,
        value: []
      },
      turn: {
        type: Number
      },
      score: {
        type: Object
      },
      opened: {
        type: Array
      },
      cardList: {
        type: Array
      },
    }
  }

  __randomizer() {
    this.__sortCards();
   this.cardArray = this.cardList.map(x => ({
      value: x,
      isOpen: false,
    }));
  }

  __sortCards() {
    let currentIndex = this.cardList.length,
      temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.cardList[currentIndex];
      this.cardList[currentIndex] = this.cardList[randomIndex];
      this.cardList[randomIndex] = temporaryValue;
    }
    return this.cardList;
  }

  __startGame(){
    this.__randomizer();
    this.turn = 1;
    this.score = { 1: 0, 2: 0 };
    this.opened = [];
  }

  __deleteCards(event) {
      setTimeout(() => {
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
          alert('Player 1 wins');
          this.winner = 'P1 Wins';
        } else if (this.score[1] < this.score[2]){
          alert('Player 2 wins');
          this.winner = 'P2 wins';
        } else {
          alert('Empate');
          this.winner = 'Draw'
        }
      }
    } else {
      this.__deleteCards('incorrect');
      setTimeout(() => {
        this.turn = this.turn === 1 ? 2 : 1;
      }, 1000);
    }
  }



  __openCard(e) {
    if (this.opened.length >= 0 && this.opened.length <= 2) {
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

  __difficulty(option) {
  if(option === 'easy'){
    this.cardList = ['🐲','🐲','🐔','🐔','🐼','🐼','🐰','🐰'];
  } else   if(option === 'medium'){
    this.cardList = ['🐲','🐲','🐔','🐔','🐼','🐼','🐰','🐰','🦝','🦝','🐯','🐯','🦊','🦊','🦁','🦁','🐱','🐱','🐺','🐺'];
  } else  if(option === 'hard'){
    this.cardList = ['🐲','🐲','🐔','🐔','🐼','🐼','🐰','🐰','🦝','🦝','🐯','🐯','🦊','🦊','🦁','🦁','🐱','🐱','🐺','🐺','🐧','🐧','🦋','🦋','🐞','🐞','🐌','🐌'];
  }


  }

  constructor() {
    super();
    this.__difficulty('medium');
    this.__startGame();
    this.winner= '';
}

  render() {
    return html`
    <header>
        <h1>Ready to play memorama?</h1>
    </header>
    <div class='center'>
      <scoreboard-scs turn=${this.turn}>
        <span slot="player1">${this.score[1]}</span>
        <span slot="player2">${this.score[2]}</span>
      </scoreboard-scs>
      <div class="board">
        ${this.cardArray.map(
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
