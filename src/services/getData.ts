import { plantAdapter, plantsAdapter, Plant, RawPlant } from "./adapterPlants"
import { Actions } from "../flux/Actions"

const API_URL = "/data.json"

export async function getData(): Promise<Plant[]> {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()
        const plants = jsonData.plants // Accedemos al array de plantas dentro del objeto
        Actions.setPlants(plants) // Despachamos la acción con las plantas
        return plants
    } catch (error) {
        console.error("Error fetching plants:", error)
        return []
    }
}



