import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate, flyAbove } from "@lit-labs/motion";

export interface IHighlight {
  stories: string[];
  name: string;
}

@customElement("carousel-element")
export class Carousel extends LitElement {
  @property({ type: Array }) highlights: IHighlight[] = [];
  @property({ type: Number }) selectedImageIndex = -1;
  @property({ type: Number }) currentStoryImageIndex = 0;
  timeoutId: number | null = null;

  static styles = css`
    .thumbnail-container {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 12px;
      padding: 8px;
    }
    .thumbnail {
      width: 128px;
      height: 168px;
      object-fit: cover;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
      border-radius: 10%;
    }
    .name-label {
      position: absolute;
      bottom: 12px;
      z-index: 1;
      white-space: nowrap;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      color: white;
      text-align: center;
      padding: 8px 16px;
    }
    .name-container {
      position: absolute;
      bottom: 10px;
      width: 128px;
      border-bottom-left-radius: 20%;
      border-bottom-right-radius: 20%;
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      height: 4rem;
    }
    img {
      width: 128px;
      height: 168px;
      object-fit: cover;
      cursor: pointer;
    }
    .fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      object-fit: contain;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 1);
    }
    .close-button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1001;
      cursor: pointer;
      font-size: 30px;
      color: white;
    }
    .progress-bar-container {
      position: fixed;
      top: 4px;
      left: 0;
      width: 85%;
      height: 1px;
      background-color: #000;
      z-index: 1002;
    }

    .progress-bar {
      height: 100%;
      background-color: #f5f5f5;
      width: 0%;
      transition: width 5s linear;
    }
    ::-webkit-scrollbar {
      height: 0;
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

  render() {
    return html`
      <section class="thumbnail-container">
        ${this.highlights.map(
          (highlight, index) => html`
            <div @click="${() => this.selectImage(index)}">
              <img src="${highlight.stories[0]}" class="thumbnail" />
              <div class="name-container"></div>
              <div class="name-label">${highlight.name}</div>
            </div>
          `
        )}
      </section>
      ${this.selectedImageIndex !== -1
        ? html`
            <section class="progress-bar-container">
              <div class="progress-bar" id="progressBar"></div>
            </section>
            <img
              src="${this.highlights[this.selectedImageIndex].stories[
                this.currentStoryImageIndex
              ]}"
              class="fullscreen"
              ${animate({
                in: flyAbove,
                keyframeOptions: {
                  duration: 250,
                  fill: "both",
                  easing: "ease-out",
                },
              })}
              ${animate({
                out: flyAbove,
                keyframeOptions: {
                  duration: 250,
                  fill: "both",
                  easing: "ease-out",
                },
              })}
            />
            <div @click="${this.closeFullscreen}" class="close-button">
              &times;
            </div>
          `
        : ""}
    `;
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.currentStoryImageIndex = 0;
    this.resetAndStartProgressBar();
    this.showNextImage();
  }

  showNextImage() {
    const highlight = this.highlights[this.selectedImageIndex];
    if (!highlight || !highlight.stories.length) return;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (this.currentStoryImageIndex < highlight.stories.length - 1) {
        this.currentStoryImageIndex++;
        this.resetAndStartProgressBar();
        this.showNextImage();
      } else {
        this.closeFullscreen();
      }
    }, 5000);
  }

  resetAndStartProgressBar() {
    if (!this.shadowRoot) return;
    const progressBar = this.shadowRoot.getElementById(
      "progressBar"
    ) as HTMLElement | null;
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      progressBar.offsetHeight;
      progressBar.style.transition = "width 5s linear";
      setTimeout(() => (progressBar.style.width = "100%"), 0);
    }
  }

  closeFullscreen() {
    this.selectedImageIndex = -1;
    this.currentStoryImageIndex = 0;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.resetProgressBar();
  }
  resetProgressBar() {
    if (!this.shadowRoot) return;
    const progressBar = this.shadowRoot.getElementById(
      "progressBar"
    ) as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = "0%";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carousel-element": Carousel;
  }
}
