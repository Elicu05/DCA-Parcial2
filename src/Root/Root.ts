import { store } from '../flux/Store';
import { getData } from '../services/getData';

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `<plant-card></plant-card>`;
    }
}

export default Root;