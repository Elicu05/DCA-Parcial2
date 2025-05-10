import { AppDispatcher } from './Dispatcher';
import { Plant } from '../services/adapterPlants';

export const plantActionTypes = {
    CREATE_PLANT : "CREATE_PLANT"
}
export const planttActions = {
    createPlant: (plant: Plant) => {
        AppDispatcher.dispatch({
            type: plantActionTypes.CREATE_PLANT,
            payload: plant
        })
    },

};

