import { html, LitElement, css } from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static  get styles() {
    return css`

      button {
        margin-left: 80px;
        height: 100px;
        width: 100px;
        border: 2px solid #ff0066;
        border-radius: 20px;
        background-color: darksalmon;
        font-size: 40px;
      }

      button:hover {
        box-shadow: 0 0 15px purple;
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
      openCard: {
        type: Boolean
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
    this.addEventListener('close', () => {
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
          ?
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
