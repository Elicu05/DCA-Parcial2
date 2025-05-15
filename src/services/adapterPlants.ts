export interface RawPlant {
    common_name: string;
    scientific_name: string;
    img: string;
    type: string;
    origin: string;
    flowering_season: string;
    sun_exposure: string;
    watering: string;
}

export interface Plant {
    commonName: string;
    scientificName: string;
    img: string;
    type: string;
    origin: string;
    floweringSeason: string;
    sunExposure: string;
    watering: string;
}

export const plantAdapter = (plant: RawPlant): Plant => {
    return {
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
        img: plant.img,
        type: plant.type,
        origin: plant.origin,
        floweringSeason: plant.flowering_season,
        sunExposure: plant.sun_exposure,
        watering: plant.watering
    };
};

export const plantsAdapter = (plants: Plant[]): Plant[] => {
    return plants;
};