import { store } from '../flux/Store';
import { Actions } from '../flux/Actions';
import { getData } from '../services/getData';
import { Plant } from '../services/adapterPlants';
import { AppState, ViewType } from '../flux/types';
import './PlantCard';
import './PlantForm';

export class AppContainer extends HTMLElement {
    private boundHandleStateChange: (state: AppState) => void;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.boundHandleStateChange = this.handleStateChange.bind(this);
    }

    async connectedCallback() {
        console.log('AppContainer connected');
        const plants = await getData(); // Cargar datos iniciales
        console.log('Initial plants loaded:', plants);
        store.subscribe(this.boundHandleStateChange);
        this.render();
    }

    disconnectedCallback() {
        store.unsubscribe(this.boundHandleStateChange);
        this.removeEventListeners();
    }

    private handleStateChange(state: AppState) {
        console.log('State changed:', state);
        this.render();
    }

    private handleNavClick(view: ViewType) {
        console.log('Navigation clicked:', view);
        Actions.changeView(view);
    }

    private removeEventListeners() {
        if (!this.shadowRoot) return;
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
    }

    private setupEventListeners() {
        if (!this.shadowRoot) return;
        
        this.removeEventListeners();
        
        const buttons = this.shadowRoot.querySelectorAll('button');
        console.log('Setting up event listeners for buttons:', buttons.length);
        buttons.forEach(button => {
            const view = button.getAttribute('data-view') as ViewType;
            button.addEventListener('click', () => {
                console.log('Button clicked:', view);
                if (view) {
                    this.handleNavClick(view);
                }
            });
        });
    }

    private renderPlants(plants: Plant[], isGardenView: boolean = false) {
        console.log(`Rendering plants for ${isGardenView ? 'garden' : 'home'} view:`, plants);
        return plants
            .sort((a, b) => a.commonName.localeCompare(b.commonName))
            .map(plant => `
                <plant-card
                    plant-data='${JSON.stringify(plant)}'
                    in-garden='${isGardenView}'
                ></plant-card>
            `).join('');
    }

    private render() {
        if (!this.shadowRoot) return;

        const state = store.getState();
        console.log('Current state in render:', state);
        const currentView = state.currentView;

        this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="CSS/gardenTheme.css">


            <nav>
                <button class="${currentView === 'home' ? 'active' : ''}"
                        data-view="home">Home</button>
                <button class="${currentView === 'garden' ? 'active' : ''}"
                        data-view="garden">Garden</button>
                <button class="${currentView === 'admin' ? 'active' : ''}"
                        data-view="admin">Admin</button>
            </nav>

            <div id="content">
                ${currentView === 'home' ? `
                    <h1>All Plants</h1>
                    <div class="plants-grid">
                        ${this.renderPlants(state.plants)}
                    </div>
                ` : currentView === 'garden' ? `
                    <h1>My Garden</h1>
                    <div class="plants-grid">
                        ${this.renderPlants(state.gardenPlants, true)}
                    </div>
                ` : currentView === 'admin' ? `
                    <h1>Edit Plant</h1>
                    <plant-form></plant-form>
                ` : ''}
            </div>
        `;

        this.setupEventListeners();
    }
}

customElements.define('app-container', AppContainer); 