import { LitElement, css, html } from "lit";

import { customElement, property } from "lit/decorators.js";
	
import {when} from 'lit/directives/when.js';

@customElement("my-panel")
class MyPanel extends LitElement {
  static styles = css`
    .title {
      font-size: 20px;
      background: aquamarine;
      color: black;
      padding: 0.8rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
    .body {
      padding: 1rem;
      border: 1px solid aquamarine;
      margin-bottom: 1rem;
    }
  `;
  @property({ type: String })
  title = "hello sankla";

  @property({ type: Boolean })
  opened = false;

  render() {
    return html`
      <div>
        <div class="title" @click=${()=>this.opened = !this.opened}>${this.title} - ${this.opened}</div>
        ${when(
          this.opened,
          () => html`<div class="body"><slot></slot></div>`,
          () => html`<div>not visible</div>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-panel": MyPanel;
  }
}
