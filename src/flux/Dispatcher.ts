import { Plant } from '../services/adapterPlants';

export type ActionType = 
    | 'SET_PLANTS'
    | 'ADD_TO_GARDEN'
    | 'REMOVE_FROM_GARDEN'
    | 'UPDATE_PLANT'
    | 'SET_SELECTED_PLANT'
    | 'CHANGE_VIEW';

export type ActionPayload = 
    | Plant[]
    | Plant
    | Plant | null
    | 'home' | 'garden' | 'admin';

export interface Action {
    type: ActionType;
    payload: ActionPayload;
}

export class Dispatcher {
    private _listeners: Array<(action: Action) => void>;

    constructor() {
        this._listeners = [];
    }

    register(callback: (action: Action) => void): void {
        this._listeners.push(callback);
    }

    dispatch(action: Action): void {
        console.log('Dispatching action:', action);
        for (const listener of this._listeners) {
            listener(action);
        }
        console.log('Action dispatched, current listeners:', this._listeners.length);
    }
}

export const AppDispatcher = new Dispatcher();