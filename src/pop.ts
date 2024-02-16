import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate, flyBelow } from "@lit-labs/motion";

const styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      backdrop-filter: blur(5px);
      z-index: 3;
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
      z-index: 3;
    }
    .modal {
      background-color: var(--primary-color);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 480px;
      width: 100%;
      position: relative;
      color: var(--secondary-color);
      transition: transform 3s ease-in-out;
      z-index: 4;
    }
    .modal-content {
      overflow-y: auto;
      max-height: 80vh;
      padding: 1rem;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  `;
@customElement("h-popup")
class HPopup extends LitElement {
  static styles = styles;
  @property({ type: Boolean }) showModal = false;
  @property({ type: String }) position: "end" | "mid" = "end";
  getModalPosition() {
    switch (this.position) {
      case "end":
        return "end";
      case "mid":
        return "center";
      default:
        return "end";
    }
  }
  getModalStyle() {
    return this.position === "mid"
      ? "border-radius: 1.5rem;"
      : "border-radius: 1.5rem 1.5rem 0 0;";
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  render() {
    const backdropStyle = `align-items: ${this.getModalPosition()};`;
    const modalStyle = this.getModalStyle();
    return html`
      ${this.showModal
        ? html`
            <section style="${backdropStyle}" class="backdrop">
              <article
                class="modal"
                style="${modalStyle}"
                @click="${(e: MouseEvent) => e.stopPropagation()}"
                ${animate({
                  in: flyBelow,
                  keyframeOptions: { duration: 500, easing: "ease-out" },
                })}
              >
                <div class="modal-header">
                  <button class="close-button" @click="${this.toggleModal}">
                    ✖️
                  </button>
                </div>
                <div class="modal-content">
                  <slot></slot>
                </div>
              </article>
            </section>
          `
        : ""}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "popup-element": HPopup;
  }
}
