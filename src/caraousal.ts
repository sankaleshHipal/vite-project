import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("carousel-element")
export class Carousel extends LitElement {
  @property({ type: Array }) images: string[] = [];
  @property({ type: String }) name = "";
  @property({ type: Number }) selectedImageIndex = -1;
  cycleIntervalId: number | null = null;

  static styles = css`
    .thumbnail-container {
      align-items: center;
      cursor: pointer;
    }

    .thumbnail {
      width: 100px;
      height: 140px;
      object-fit: cover;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
      border-radius: 10%;
    }
    .name-label {
      margin-top: 8px;
      margin-right: 8px;
      cursor: pointer;
      text-align: center;
    }
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
    }
    .fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
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
    .progress-container {
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 5px;
      background-color: #000;
      z-index: 1002;
    }
    .progress-bar {
      height: 20%;
      background-color: #ccc;
      width: 0%;
      transition: width 5s linear;
      border-radius: 5px;
    }
  `;

   render() {
    return html`
      <div
        class="thumbnail-container"
        @click="${() => {
          this.selectImage(0);
        }}"
      >
        <img src="${this.images[0]}" class="thumbnail" />
        <div class="name-label">${this.name}</div>
      </div>
      ${this.selectedImageIndex !== -1
        ? html`
            <div class="progress-container">
              <div class="progress-bar" id="progressBar"></div>
            </div>
            ${this.images.map(
              (image, index) => html`
                <img
                  src="${image}"
                  class="${index === this.selectedImageIndex
                    ? "fullscreen"
                    : "hidden"}"
                  @click="${(e:MouseEvent) => this.handleImageClick(e, index)}"
                />
              `
            )}
            <div class="close-button" @click="${this.closeFullscreen}">
              &times;
            </div>
          `
        : ""}
    `;
  }
  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.startProgressBar();
    this.resetAndStartCycle();
  }

  cycleToNextImage() {
    if (this.selectedImageIndex < this.images.length - 1) {
      this.selectedImageIndex++;
      this.startProgressBar();
    } else {
      this.closeFullscreen();
    }
  }
  

  resetAndStartCycle() {
    if (this.cycleIntervalId !== null) {
      clearInterval(this.cycleIntervalId);
    }
    this.cycleIntervalId = window.setInterval(() => {
      this.cycleToNextImage();
    }, 5000);
  }

  closeFullscreen() {
    if (this.cycleIntervalId !== null) {
      clearInterval(this.cycleIntervalId);
      this.cycleIntervalId = null;
    }
    this.selectedImageIndex = -1;
    this.resetProgressBar();
  }

  handleImageClick(event: MouseEvent, index: number) {
    const imageElement = event.target as HTMLImageElement | null;
    if (imageElement) {
      const clickX = event.clientX; 
      const imageWidth = imageElement.width; 
  
      if (clickX > imageWidth / 2) {
        if (index < this.images.length - 1) {
          this.selectImage(index + 1);
          this.resetProgressBar()
        } else {
          this.closeFullscreen(); 
        }
      }
      else {
        if (index > 0) {
          this.selectImage(index - 1); 
        }
      }
    }
  }
  
  startProgressBar() {
    console.log('called');
    if (!this.shadowRoot) return;
    const progressBar = this.shadowRoot.getElementById(
      "progressBar"
    ) as HTMLElement | null;
    if (progressBar) {
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.width = "100%";
      }, 100);
    }
  }

  resetProgressBar() {
    if (!this.shadowRoot) {
      return;
    }
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
