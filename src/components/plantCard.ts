import { Plant } from '../services/adapterPlants';
import { Actions } from '../flux/Actions';
import { store } from '../flux/Store';

export class PlantCard extends HTMLElement {
    private plant: Plant | null = null;
    private isInGarden: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['plant-data', 'in-garden'];
    }

    connectedCallback() {
        this.render();
        store.subscribe(this.handleStateChange.bind(this));
    }

    disconnectedCallback() {
        store.unsubscribe(this.handleStateChange.bind(this));
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'plant-data') {
            this.plant = JSON.parse(newValue);
        }
        if (name === 'in-garden') {
            this.isInGarden = newValue === 'true';
        }
        this.render();
    }

    private handleStateChange(state: any) {
        if (this.plant) {
            this.isInGarden = state.gardenPlants.some(
                (p: Plant) => p.commonName === this.plant?.commonName
            );
            this.render();
        }
    }

    private handleClick() {
        if (!this.plant) return;

        if (this.isInGarden) {
            Actions.removeFromGarden(this.plant);
        } else {
            Actions.addToGarden(this.plant);
        }
    }

    private handleEdit() {
        if (!this.plant) return;
        Actions.setSelectedPlant(this.plant);
        Actions.changeView('admin');
    }

    private render() {
        if (!this.shadowRoot || !this.plant) return;

        // 👇 Aplicar clase dinámica al host según si está o no en el jardín
        this.classList.toggle('not-in-garden', !this.isInGarden);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 1rem;
                    padding: 1rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    background: linear-gradient(135deg, #fefefc, #f5fff8);
                    border: 2px dashed #c0e8c2;
                    transition: all 0.3s ease;
                    font-family: 'Segoe UI', sans-serif;
                }

                :host(.not-in-garden) {
                    opacity: 0.6;
                }

                :host(:hover) {
                    transform: scale(1.02);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                }

                .plant-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 12px;
                    border: 3px solid #d4f5dc;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .plant-info {
                    margin-top: 1rem;
                    background: #ffffffaa;
                    padding: 1rem;
                    border-radius: 12px;
                }

                h3 {
                    margin: 0;
                    color: #3c5a4b;
                    font-size: 1.4rem;
                }

                .scientific-name {
                    color: #8ba79d;
                    font-style: italic;
                    margin: 0.3rem 0 1rem;
                    display: block;
                }

                p {
                    margin: 0.2rem 0;
                    color: #5e7e6e;
                    font-size: 0.95rem;
                }

                .actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1.2rem;
                }

                button {
                    padding: 0.6rem 1.2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background-color 0.3s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                button:hover {
                    transform: scale(1.05);
                }

                .garden-button.add {
                    background: #b2f2bb;
                    color: #264d36;
                }

                .garden-button.remove {
                    background: #f6c1c1;
                    color: #264d36;
                }

                .edit-button {
                    background: #d0e6ff;
                    color: #2c3e50;
                }
            </style>

            <img class="plant-image" src="${this.plant.img}" alt="${this.plant.commonName}">
            <div class="plant-info">
                <h3>${this.plant.commonName}</h3>
                <span class="scientific-name">${this.plant.scientificName}</span>
                <p><strong>Type:</strong> ${this.plant.type}</p>
                <p><strong>Origin:</strong> ${this.plant.origin}</p>
                <p><strong>Flowering Season:</strong> ${this.plant.floweringSeason}</p>
                <p><strong>Sun Exposure:</strong> ${this.plant.sunExposure}</p>
                <p><strong>Watering:</strong> ${this.plant.watering}</p>
            </div>
            <div class="actions">
                <button class="garden-button">
                    ${this.isInGarden ? 'Remove from Garden' : 'Add to Garden'}
                </button>
                <button class="edit-button">
                    Edit Plant
                </button>
            </div>
        `;

        // 🎯 Aplicar clases dinámicas a botones
        const gardenBtn = this.shadowRoot.querySelector('.garden-button');
        if (gardenBtn) {
            gardenBtn.classList.toggle('add', !this.isInGarden);
            gardenBtn.classList.toggle('remove', this.isInGarden);
            gardenBtn.addEventListener('click', () => this.handleClick());
        }

        const editBtn = this.shadowRoot.querySelector('.edit-button');
        editBtn?.addEventListener('click', () => this.handleEdit());
    }
}

customElements.define('plant-card', PlantCard);
 