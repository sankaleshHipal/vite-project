import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate, fadeInSlow, fadeOut } from "@lit-labs/motion";

export interface ISpecialOffer {
  image: string;
  text: string;
  link: string;
}
const styles = css`
.thumbnail-container {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 16px;
  padding: 8px;
}
.thumbnail {
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 10%;
}

.name-label {
  position: absolute;
  top: 12px;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 4px 0;
}
.name-container {
  position: absolute;
  top: 8px;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
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

@customElement("spotlight-carousel")
export class Spotlight extends LitElement {
  @property({ type: Array }) spotlightData: ISpecialOffer[] = [];
  @property({ type: String }) size: "sm" | "md" | "lg" | "xl" = "sm";
  
  static styles = styles;

getDynamicStyles() {
  switch (this.size) {
    case "sm":
      return css`width: 20rem; height: 12rem; font-size: 1.25rem; `;
    case "md":
      return css`width: 30rem; height: 18rem; font-size: 1.5rem;`;
    case "lg":
      return css`width: 40rem; height: 24rem; font-size: 2rem;`;
    case "xl":
      return css`width: 50rem; height: 30rem; font-size: 2.5rem;`;
    default:
      return css`width: 20rem; height: 12rem; font-size: 1.25rem;`;
  }
}

  render() {
    const dynamicStyles = this.getDynamicStyles();
    return html`
      <section class="thumbnail-container">
        ${this.spotlightData.map(
          (offer: ISpecialOffer) => html`
            <div>
              <img
                src="${offer.image}"
                class="thumbnail"
                style="${dynamicStyles.cssText}"
                ${animate({
                  in: fadeInSlow,
                  out: fadeOut,
                  keyframeOptions: { duration: 250 },
                })}
              />
              <div style="${dynamicStyles.cssText}" class="name-container"></div>
              <div style="${dynamicStyles.cssText}" class="name-label">${offer.text}</div>
            </div>
          `
        )}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "spotlight-carousel": Spotlight;
  }
}
