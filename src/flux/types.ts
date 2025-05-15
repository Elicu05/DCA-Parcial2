import { Plant } from '../services/adapterPlants';

export type ViewType = 'home' | 'garden' | 'admin';

export interface AppState {
    plants: Plant[];
    gardenPlants: Plant[];
    currentView: ViewType;
}

export interface Action {
    type: string;
    payload?: any;
} 