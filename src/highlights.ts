import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./caraousal";
import "./herosection";
import "./pop";
import { data, settings } from "./data";
import "./button.element"
import "./spotlight";
// import ThemeService from "./theme";
// const themeService = new ThemeService(settings.themes);

interface Popup extends HTMLElement {
  showModal: boolean;
}


@customElement("highlights-container")
export class HighlightsContainer extends LitElement {
  private highlights = settings.explore.highlights;

  openPopup() {
    if (!this.shadowRoot) return;
    const popupElement = this.shadowRoot.querySelector(
      "h-popup"
    ) as Popup | null;
    if (popupElement) {
      popupElement.showModal = true;
    }
  }

  render() {
    return html`
      <hero-section></hero-section>
      <carousel-element .highlights=${this.highlights}></carousel-element>
      <spotlight-carousel size="sm"></spotlight-carousel>
      <h-popup .showModal=true position="end" .showModal=${false}>
        <hero-section .data=${data}></hero-section>
        <hero-section .data=${data}></hero-section>
        <carousel-element .highlights=${this.highlights}></carousel-element>
      </h-popup>
      <h-button
        width="90%"
        label="Open Popup"
        class="open-popup-button"
        @click="${this.openPopup}"
      ></h-button>
    `;
  }
}
