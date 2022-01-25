const queryString = window.location.search; // "?id=243"
const searchParams = new URLSearchParams(queryString); // => id 

const photographerId = searchParams.get('id'); // ==> 243

const photographer = photographers.find(photographer => photographer.id === photographerId) // le même id que celui qui a été envoyé dans l'URL;

document.getElementById("name").innerText = photographer.name;//

async function init() {
    // Récupère les datas des photographes
    const { photographers  } = await getPhotographers();
    photographers.forEach((photographers) => {
      // Pour chaque média, on cherche l'id du photographe qui est égale a  media.photographerId 
      if(photographers.find(x => x.id === photographers.id)) {  
    }
    displayData(photographers);
};)
init();