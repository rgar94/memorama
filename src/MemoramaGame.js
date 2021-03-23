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
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <header>
        <h1>Ready to play memorama?</h1>
      </header>
      <div>
        <scoreboard-scs></scoreboard-scs>
        <board-scs></board-scs>
      </div>
    `;
  }
}
