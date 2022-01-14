    import {photographerFactory} from '../factories/photographer.js';
    
    async function getPhotographers() {
        const fetchData = await fetch('../data/photographers.json')
        .then((response) => {
          return response.json()
        })
        .then((data) =>{
          return data; })
        .catch((err) => {
          console.log(err)
        })
        return fetchData
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    init();
