import { AppDispatcher, ActionType } from './Dispatcher';
import { Plant } from '../services/adapterPlants';

export const ActionTypes: { [key: string]: ActionType } = {
    SET_PLANTS: 'SET_PLANTS',
    ADD_TO_GARDEN: 'ADD_TO_GARDEN',
    REMOVE_FROM_GARDEN: 'REMOVE_FROM_GARDEN',
    UPDATE_PLANT: 'UPDATE_PLANT',
    SET_SELECTED_PLANT: 'SET_SELECTED_PLANT',
    CHANGE_VIEW: 'CHANGE_VIEW'
} as const;

export const Actions = {
    setPlants: (plants: Plant[]) => {
        AppDispatcher.dispatch({
            type: ActionTypes.SET_PLANTS,
            payload: plants
        });
    },

    addToGarden: (plant: Plant) => {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_TO_GARDEN,
            payload: plant
        });
    },

    removeFromGarden: (plant: Plant) => {
        AppDispatcher.dispatch({
            type: ActionTypes.REMOVE_FROM_GARDEN,
            payload: plant
        });
    },

    updatePlant: (plant: Plant) => {
        AppDispatcher.dispatch({
            type: ActionTypes.UPDATE_PLANT,
            payload: plant
        });
    },

    setSelectedPlant: (plant: Plant | null) => {
        AppDispatcher.dispatch({
            type: ActionTypes.SET_SELECTED_PLANT,
            payload: plant
        });
    },

    changeView: (view: 'home' | 'garden' | 'admin') => {
        AppDispatcher.dispatch({
            type: ActionTypes.CHANGE_VIEW,
            payload: view
        });
    }
};

