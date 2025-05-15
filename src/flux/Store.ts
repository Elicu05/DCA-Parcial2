import { AppDispatcher, Action, ActionType } from './Dispatcher';
import { Plant } from '../services/adapterPlants';

export interface State {
    plants: Plant[];
    gardenPlants: Plant[];
    selectedPlant: Plant | null;
    currentView: 'home' | 'garden' | 'admin';
}

type Listener = (state: State) => void;

class Store {
    private _state: State = {
        plants: [],
        gardenPlants: [],
        selectedPlant: null,
        currentView: 'home'
    };

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
        this._loadFromLocalStorage();
    }

    getState(): State {
        return { ...this._state };
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
    }

    unsubscribe(listener: Listener): void {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }

    private _handleActions(action: Action): void {
        let stateChanged = false;
        console.log('Store handling action:', action);

        switch (action.type) {
            case 'SET_PLANTS':
                this._state.plants = action.payload as Plant[];
                stateChanged = true;
                break;

            case 'ADD_TO_GARDEN':
                const plantToAdd = action.payload as Plant;
                if (!this._state.gardenPlants.find(p => p.commonName === plantToAdd.commonName)) {
                    this._state.gardenPlants.push(plantToAdd);
                    stateChanged = true;
                }
                break;

            case 'REMOVE_FROM_GARDEN':
                const plantToRemove = action.payload as Plant;
                this._state.gardenPlants = this._state.gardenPlants.filter(
                    p => p.commonName !== plantToRemove.commonName
                );
                stateChanged = true;
                break;

            case 'UPDATE_PLANT':
                const updatedPlant = action.payload as Plant;
                this._state.plants = this._state.plants.map(plant => 
                    plant.commonName === updatedPlant.commonName ? updatedPlant : plant
                );
                this._state.gardenPlants = this._state.gardenPlants.map(plant => 
                    plant.commonName === updatedPlant.commonName ? updatedPlant : plant
                );
                stateChanged = true;
                break;

            case 'SET_SELECTED_PLANT':
                this._state.selectedPlant = action.payload as (Plant | null);
                stateChanged = true;
                break;

            case 'CHANGE_VIEW':
                this._state.currentView = action.payload as ('home' | 'garden' | 'admin');
                stateChanged = true;
                break;
        }

        if (stateChanged) {
            console.log('State updated:', this._state);
            this._saveToLocalStorage();
            this._emitChange();
        }
    }

    private _emitChange(): void {
        for (const listener of this._listeners) {
            listener(this._state);
        }
    }

    private _saveToLocalStorage(): void {
        localStorage.setItem('gardenState', JSON.stringify({
            gardenPlants: this._state.gardenPlants,
            plants: this._state.plants
        }));
    }

    private _loadFromLocalStorage(): void {
        const savedState = localStorage.getItem('gardenState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            this._state.gardenPlants = parsed.gardenPlants || [];
            this._state.plants = parsed.plants || [];
        }
    }
}

export const store = new Store();