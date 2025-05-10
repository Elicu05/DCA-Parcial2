import { plantAdapter } from "./adapterPlants"

export async function getData() {
    try {
        const response = await fetch ("http://192.168.131.101:8080/dca/api/plants")
        const data = await response.json()
        console.log(data)

        const adapted = plantAdapter(data)
        console.log(adapted)

        return data

    } catch (error) {
        
    }
}



