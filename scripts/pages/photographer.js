async function displayPhotographerData(photographer) {
  console.log('the ,photographer : ', photographer)
  const photographerSection = document.querySelector(".photograph-header");
  const photographerModel = getPhotographerDom(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
};

async function displayMediasData(photographer) {
  const mediaSection = document.querySelector(".photographer_info");
    photographer.medias.forEach((media) => {
      const mediaModel = getMediaDom(media, photographer.name);
      const userCardDOM = mediaModel.getUserCardDOM();
      mediaSection.appendChild(userCardDOM);
    })
};
 
function getNickname(str) {
   const strArray = str.split(" ");
   strArray.forEach(function(entry) {
    entry += " "
  }); 
  return strArray[0]
} ;

function getMediaDom (media, photographerName){
  const { date, id, image, video, likes, price, title} = media
  const picture = `Sample Photos/${getNickname(photographerName)}/${image ? image : video}`;
  function getUserCardDOM() {
    const mediaCard = document.createElement( 'div' );
    let media;
    // Différenciation du DOM si c'est une image ou une vidéo
    if(image) {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture)
      media = img
    } else if(video){
      const video = document.createElement( 'video' );
      const source = document.createElement( 'source' );
      source.setAttribute("src", picture)
      source.setAttribute("type", "video/mp4")
      // faire un onclick . Ca marche pas
      video.appendChild(source);
      video.addEventListener ('click', function(){
        source.setAttribute("play", true)
    })
      media = video
    }
    // génère les autres éléments du DOM
    const h2 = document.createElement( 'h2' );
    h2.textContent = title;
    const h3 = document.createElement( 'h3' );
    h3.textContent = likes + ' personnes ont kiffé';
    mediaCard.appendChild(media);
    mediaCard.appendChild(h2);
    mediaCard.appendChild(h3);

    return (mediaCard)
  }
  return { getUserCardDOM }

} ;

//function getPhotographerLikes(media, photographerLikes){
  //const { date, id, image, video, likes, price, title} = media
  //function getUserCardDOM(){
   // const likesCard = document.createElement( 'div' );
  //  const h3 = document.createElement( 'h3' );
   // h3.textContent = likes + ' personnes ont kiffé';
    //likesCard.appendChild(h3);

   // return (likesCard)
 // }



function getPhotographerDom (data){
  const { name, portrait, tagline, city, country, price, medias } = data;
  const picture = `Sample Photos/Photographers ID Photos/${portrait}`;
  function getUserCardDOM() {
    const theDiv = document.createElement( 'div' );
    theDiv.setAttribute("id", "theDiv");
    const myDiv1 = document.createElement( 'div' );
    myDiv1.setAttribute("class", "myDiv1");
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = city+','+' '+country;
    const my1p = document.createElement ('p');
    my1p.textContent = tagline ;
    const myDiv2 = document.createElement( 'div' );
    myDiv2.setAttribute("class", "myDiv2");
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    theDiv.appendChild(myDiv1);
    myDiv1.appendChild(h2);
    myDiv1.appendChild (h3);
    myDiv1.appendChild (my1p);
    theDiv.appendChild(myDiv2);
    myDiv2.appendChild(img);
    return (theDiv)
  }
  return { getUserCardDOM }

  
}

function init() {
  //@TODO : getParams ici , doit récupérer ce qui se trouve après le /?id=
  const queryString = window.location.search;
  const searchParams = new URLSearchParams (queryString);
  const photographers = fetch('../../data/photographers.json')
        .then(res => res.json())
        .then(data => {
          const pageId = searchParams.get ('id');
          console.log(pageId);
          const photographerDetails = data.media.filter(media => media.photographerId == pageId); 
          console.log(photographerDetails);
          const photographer = data.photographers.find(photographer => photographer.id == pageId);
          console.log(photographer);
          displayPhotographerData(photographer)
          displayMediasData(photographerDetails)
        });
        }
init()

//const queryString = window.location.search; // "?id=243"
//const searchParams = new URLSearchParams(queryString); // => id 

//const photographerId = searchParams.get('id'); // ==> 243

//const photographer = photographers.find(photographer => photographer.id