export type Plant = {
    commonName : string,
    img: string,
    origin : string,
    watering : string

};

export const plantAdapter = (plant : Plant) => {
    return {
        commonName : plant.commonName,
        img : plant.img,
        origin : plant.origin,
        watering : plant.watering
    }
    
    }
    export const plantsAdapter = (plant : Plant[]) => {
        return plant.map(plant=> plantAdapter(plant))


};