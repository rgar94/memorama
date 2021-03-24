import { html, LitElement, css } from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static  get styles() {
    return css`

      button {
        height: 100px;
        width: 100px;
        border: 2px solid #cbbd05;
        border-radius: 20px;
        background-color: #5e8c1a;
        font-size: 40px;
      }

      button:hover {
        box-shadow: 0 0 30px #00aeff;
      }

      #value {
        font-size: 1em;
        cursor: not-allowed;
      }

      .hide {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      symbol: {
        type: Array
      },
      isPlayed:{
        type: Boolean
      },
      valueClass: Object,
      unknownClass: Object,
      hideClass: Object
    }
  }

  __onClick() {
    this.isPlayed= true
    this.valueClass = {
      hide: !this.isPlayed
    };
    this.unknownClass = {
      hide: this.isPlayed
    };

  }

  constructor() {
    super();
    this.isPlayed= false;
    this.valueClass = {
      hide: !this.isPlayed
    };
  }

  updated() {
    this.addEventListener('incorrect', () => {
      this.isPlayed= false;
      this.valueClass = {
        hide: !this.isPlayed
      };
      this.unknownClass = {
        hide: this.isPlayed
      };
    });
    this.addEventListener('correct', () => {
      this.hideClass = {
        hide: true
      };
    });


  }

  render() {
    return html`
    <div>
      <button  @click="${this.__onClick}" class='${classMap(this.hideClass)}'>
        <div id='unknown' class='${classMap(this.unknownClass)}'>
          ❔
        </div>
        <div id="value"  class='${classMap(this.valueClass)}'>
          ${this.symbol}
        </div>
      </button>
    </div>
    <slot></slot>
      `;
  }
}
