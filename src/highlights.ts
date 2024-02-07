import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./caraousal";
import "./herosection";
import "./pop";
import { data, settings } from "./data";
import "./actionButton";
// import ThemeService from "./theme";
// const themeService = new ThemeService(settings.themes);

interface Popup extends HTMLElement {
  showModal: boolean;
}

@customElement("highlights-container")
export class HighlightsContainer extends LitElement {
  static styles = css`
    .carousel-wrapper {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 16px;
      padding: 8px;
    }

    ::-webkit-scrollbar {
      height: 1px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;
  private highlights = settings.explore.highlights;

  openPopup() {
    if (!this.shadowRoot) return;
    const popupElement = this.shadowRoot.getElementById(
      "popup"
    ) as Popup | null;
    if (popupElement) {
      popupElement.showModal = true;
    }
  }

  render() {
    return html`
      <hero-section ></hero-section>
      <div class="carousel-wrapper">
        ${this.highlights.map(
          (highlight) => html`
            <carousel-element
              .images=${highlight.stories}
              .name=${highlight.name}
            >
            </carousel-element>
          `
        )}
      </div>
     
      <popup-element id="popup" message="click me">
        <hero-section .data=${data}></hero-section>
        <hero-section .data=${data}></hero-section>
      </popup-element>
      <action-button class="open-popup-button" @click="${this.openPopup}"></action-button>
    `;
  }
}
