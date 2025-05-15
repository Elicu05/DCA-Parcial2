import { Plant } from '../services/adapterPlants';
import { Actions } from '../flux/Actions';
import { store } from '../flux/Store';

export class PlantForm extends HTMLElement {
    private plant: Plant | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        store.subscribe(this.handleStateChange.bind(this));
        this.render();
    }

    disconnectedCallback() {
        store.unsubscribe(this.handleStateChange.bind(this));
    }

    private handleStateChange(state: any) {
        this.plant = state.selectedPlant;
        this.render();
    }

    private handleSubmit(e: Event) {
        e.preventDefault();
        if (!this.shadowRoot || !this.plant) return;

        const form = this.shadowRoot.querySelector('form') as HTMLFormElement;
        const formData = new FormData(form);

        const updatedPlant: Plant = {
            commonName: formData.get('commonName') as string,
            scientificName: formData.get('scientificName') as string,
            img: formData.get('img') as string,
            type: formData.get('type') as string,
            origin: formData.get('origin') as string,
            floweringSeason: formData.get('floweringSeason') as string,
            sunExposure: formData.get('sunExposure') as string,
            watering: formData.get('watering') as string
        };

        Actions.updatePlant(updatedPlant);
        Actions.changeView('home');
    }

    private handleCancel() {
        Actions.setSelectedPlant(null);
        Actions.changeView('home');
    }

    private render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                label {
                    font-weight: bold;
                    color: #2c3e50;
                }

                input, select {
                    padding: 0.5rem;
                    border: 1px solid #bdc3c7;
                    border-radius: 4px;
                    font-size: 1rem;
                }

                .actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s;
                }

                .save-button {
                    background-color: #2ecc71;
                    color: white;
                }

                .cancel-button {
                    background-color: #e74c3c;
                    color: white;
                }
            </style>

            <form @submit="handleSubmit">
                <div class="form-group">
                    <label for="commonName">Common Name</label>
                    <input type="text" id="commonName" name="commonName" 
                           value="${this.plant?.commonName || ''}" required>
                </div>

                <div class="form-group">
                    <label for="scientificName">Scientific Name</label>
                    <input type="text" id="scientificName" name="scientificName" 
                           value="${this.plant?.scientificName || ''}" required>
                </div>

                <div class="form-group">
                    <label for="img">Image URL</label>
                    <input type="url" id="img" name="img" 
                           value="${this.plant?.img || ''}" required>
                </div>

                <div class="form-group">
                    <label for="type">Type</label>
                    <select id="type" name="type" required>
                        <option value="Anual" ${this.plant?.type === 'Anual' ? 'selected' : ''}>Anual</option>
                        <option value="Perenne" ${this.plant?.type === 'Perenne' ? 'selected' : ''}>Perenne</option>
                        <option value="Bienal" ${this.plant?.type === 'Bienal' ? 'selected' : ''}>Bienal</option>
                        <option value="Arbusto" ${this.plant?.type === 'Arbusto' ? 'selected' : ''}>Arbusto</option>
                        <option value="Bulbosa" ${this.plant?.type === 'Bulbosa' ? 'selected' : ''}>Bulbosa</option>
                        <option value="Epífita" ${this.plant?.type === 'Epífita' ? 'selected' : ''}>Epífita</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="origin">Origin</label>
                    <input type="text" id="origin" name="origin" 
                           value="${this.plant?.origin || ''}" required>
                </div>

                <div class="form-group">
                    <label for="floweringSeason">Flowering Season</label>
                    <select id="floweringSeason" name="floweringSeason" required>
                        <option value="Primavera" ${this.plant?.floweringSeason === 'Primavera' ? 'selected' : ''}>Primavera</option>
                        <option value="Verano" ${this.plant?.floweringSeason === 'Verano' ? 'selected' : ''}>Verano</option>
                        <option value="Otoño" ${this.plant?.floweringSeason === 'Otoño' ? 'selected' : ''}>Otoño</option>
                        <option value="Invierno" ${this.plant?.floweringSeason === 'Invierno' ? 'selected' : ''}>Invierno</option>
                        <option value="Primavera a Verano" ${this.plant?.floweringSeason === 'Primavera a Verano' ? 'selected' : ''}>Primavera a Verano</option>
                        <option value="Primavera a Otoño" ${this.plant?.floweringSeason === 'Primavera a Otoño' ? 'selected' : ''}>Primavera a Otoño</option>
                        <option value="Variable" ${this.plant?.floweringSeason === 'Variable' ? 'selected' : ''}>Variable</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="sunExposure">Sun Exposure</label>
                    <select id="sunExposure" name="sunExposure" required>
                        <option value="Sol pleno" ${this.plant?.sunExposure === 'Sol pleno' ? 'selected' : ''}>Sol pleno</option>
                        <option value="Sombra parcial" ${this.plant?.sunExposure === 'Sombra parcial' ? 'selected' : ''}>Sombra parcial</option>
                        <option value="Luz indirecta" ${this.plant?.sunExposure === 'Luz indirecta' ? 'selected' : ''}>Luz indirecta</option>
                        <option value="Sol pleno a sombra parcial" ${this.plant?.sunExposure === 'Sol pleno a sombra parcial' ? 'selected' : ''}>Sol pleno a sombra parcial</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="watering">Watering Needs</label>
                    <select id="watering" name="watering" required>
                        <option value="Bajo" ${this.plant?.watering === 'Bajo' ? 'selected' : ''}>Bajo</option>
                        <option value="Moderado" ${this.plant?.watering === 'Moderado' ? 'selected' : ''}>Moderado</option>
                        <option value="Abundante" ${this.plant?.watering === 'Abundante' ? 'selected' : ''}>Abundante</option>
                    </select>
                </div>

                <div class="actions">
                    <button type="submit" class="save-button">Save Changes</button>
                    <button type="button" class="cancel-button" @click="handleCancel">Cancel</button>
                </div>
            </form>
        `;

        this.shadowRoot.querySelector('form')?.addEventListener('submit', (e) => this.handleSubmit(e));
        this.shadowRoot.querySelector('.cancel-button')?.addEventListener('click', () => this.handleCancel());
    }
}

customElements.define('plant-form', PlantForm); 