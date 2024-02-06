import { LitElement, html,css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface HeroSectionData {
    businessName?: string;
    registeredName?: string;
    logo?: string;
    address?: string;
    ownerPhone?: number;
}

@customElement('hero-section')
export class HeroSection extends LitElement {
    @property({ type: Object }) data: HeroSectionData = {};
    // @property({ type: String }) businessName = '';

  static styles = css`
    .hero-section-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        /* */
    }

    .hero-section-top {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 16px; 
    }

    .logo-container {
        flex-basis: 100px; 
    }

    .business-logo, .placeholder-logo {
        display: block;
        width: 100px; 
        height: 100px; 
        object-fit: cover;
        border-radius: 8px; 
    }

    .business-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 16px; 
    }

    .business-name {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .business-description {
        font-size: 1rem; 
        opacity: 0.6;
        margin-top: -8px;
    }

    .additional-info {
        font-size: 0.825rem; 
        color: #666; 
        margin-top: -16px;
    }
`;
connectedCallback() {
  super.connectedCallback();
}

  render() {
    return html`
      <div class='hero-section-container'>
        <div class='hero-section-top'>
          ${this.data?.logo ? html`
            <img
              src="${this.data.logo}"
              height="100"
              width="100"
              alt='logo-business'
              class='business-logo'
            />
          ` : html`<span>business-logo</span>`}

          <div class='business-info'>
            ${this.data?.businessName ? html`
              <h1 class='business-name'>${this.data.businessName}</h1>
            ` : ''}
            <h3 class='business-description'>
            Pet Friendly | Cafe | Community
            </h3>
          </div>
        </div>
        <div class='hero-section-bottom'>
          <p class='additional-info'>
          The ambience of a childhood home, the company of a furry friend and the comfort of delicious food.
          </p>
        </div>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'hero-section': HeroSection;
  }
}
