import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("popup-element")
class Popup extends LitElement {
  @property({ type: Boolean }) showModal = false;

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: end;
      justify-content: center;
      backdrop-filter: blur(5px);
      z-index: 1001;
    }

    .modal-header {
      position: absolute;
      top: -1.5rem;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .close-button {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 50px;
      cursor: pointer;
      z-index: 1001;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal {
      background-color: var(--primary-color);
      padding: 1rem;
      border-radius: 1.5rem 1.5rem 0 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 420px;
      width: 100%;
      position: relative;
      color: var(--secondary-color);
      transition: transform 3s ease-in-out;
      z-index: 1001;
    }
    .modal.show {
      transform: translateY(0);
    }

    .modal-content {
      margin-top: 16px;
      overflow-y: auto;
      max-height: 80vh;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  `;

  toggleModal() {
    this.showModal = !this.showModal;
  }
  render() {
    return html`
      ${this.showModal
        ? html`
            <div class="backdrop">
              <div
                class="modal"
                @click="${(e: MouseEvent) => e.stopPropagation()}"
              >
                <div class="modal-header">
                  <button class="close-button" @click="${this.toggleModal}">
                    ✖️
                  </button>
                </div>
                <div class="modal-content">
                  <slot></slot>
                </div>
              </div>
            </div>
          `
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "popup-element": Popup;
  }
}
