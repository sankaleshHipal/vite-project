import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("h-button")
class HButton extends LitElement {
  @property({ type: String }) label = "click me!";
  @property({type: String}) width = "";

  static styles = css`
    .action-button {
      position: fixed;
      bottom: 20px;
      left: 50%; 
      transform: translateX(-50%); 
      width: var(--button-width);
      max-width: 30rem;
      background-color: var(--secondary-color);
      color: var(--primary-color);
      padding: 1rem 0;
      margin: 0 auto;
      font-size: 1rem;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  `;

  render() {
    return html`
      <button class="action-button" style="--button-width: ${this.width};">${this.label}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "action-button": HButton;
  }
}