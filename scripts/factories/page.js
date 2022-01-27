const queryString = window.location.search; // "?id=243"
const searchParams = new URLSearchParams(queryString); // => id 

const photographerId = searchParams.get('id'); // ==> 243

const photographer = photographers.find(photographer => photographer.id === photographerId) // le même id que celui qui a été envoyé dans l'URL;

document.getElementById("name").innerText = photographer.name;//

