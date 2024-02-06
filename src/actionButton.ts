import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("action-button")
class ActionButton extends LitElement {
  @property({ type: String }) label = "Action";

  static styles = css`
    .action-button {
      position: fixed;
      bottom: 20px;
      left: 0;
      width: 100%;
      background-color: var(--secondary-color);
      color: var(--primary-color);
      padding: 1rem;
      font-size: 1rem;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `;

  render() {
    return html`<button class="action-button">${this.label}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "action-button": ActionButton;
  }
}
