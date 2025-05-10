import { getData } from '../services/getData';
import { plantAdapter } from '../services/adapterPlants';


class PlantCard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode : "open"})
        
    }

    connectedCallback(){
        this.render()
    }

    async render(){
        
        const data = await getData()
        if (this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <div>
            ${data?.map((plant: any)=>`  
                <link rel="stylesheet" href="CSS/planStyle.css">
                <div class="box">
                <h1>${plant.commonName}</h1>
                <img src="${plant.img}" alt="">
                <h3>${plant.origin}</h3>
                <h3>${plant.watering}</h3>

                </div>

                `
            ).join("")}
            </div>
            `
        }
    }
}

export default PlantCard