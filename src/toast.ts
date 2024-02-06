import { LitElement, html } from "lit";

import { customElement } from "lit/decorators.js";

@customElement('toast-button')
class ToastButtonElement extends LitElement {
    activeToasts: number;
    constructor() {
        super();
        this.activeToasts = 0;
    }

    showSuccessToast() {
        this.showToast('You clicked on Success', 'green');
    }

    showErrorToast() {
        this.showToast('You clicked on Error', 'red');
    }

    showToast(message: string, bgColor: string) {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'fixed';
        toast.style.top = `${this.activeToasts * 60 + 10}px`;
        toast.style.right = '10px';
        toast.style.padding = '10px';
        toast.style.minWidth = '200px';
        toast.style.background = bgColor;
        toast.style.color = 'white';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        toast.style.zIndex = (1000 + this.activeToasts).toString();
        document.body.appendChild(toast);
        this.activeToasts++;

        setTimeout(() => {
            toast.remove();
            this.activeToasts--;
        }, 5000);
    }

    render() {
        return html`
            <button @click=${this.showSuccessToast}>Success</button>
            <button @click=${this.showErrorToast}>Error</button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "toast-button": ToastButtonElement;
    }
  }
