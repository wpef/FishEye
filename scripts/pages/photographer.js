async function displayPhotographerData(photographer) {
  console.log('the ,photographer : ', photographer)
  const photographerSection = document.querySelector(".photograph-header");
  const photographerModel = getPhotographerDom(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographerSection.appendChild(userCardDOM);
};

async function displayMediasData(photographerDetails, photographer) {
  console.log('shouf', photographerDetails)
  const mediaSection = document.querySelector(".photographer_info");
      const mediaModel = getMediaDom(photographerDetails, photographer);
      const userCardDOM = mediaModel.getUserCardDOM();
      mediaSection.appendChild(userCardDOM);
};
 
function getNickname(str) {
   const strArray = str.split(" ");
   strArray.forEach(function(entry) {
    entry += " "
  }); 
  return strArray[0]
} ;

function getMediaDom (photographerMedia, photographer){
    
  function getUserCardDOM() {
    const mediaCardContainer = document.createElement( 'div' );
    mediaCardContainer.setAttribute("class", "container");
    console.log('photographer details =',photographer);

    for(var i = 0; i <= photographerMedia.length - 1; i++) {  
      const elmt = photographerMedia[i]
      const {name, likes, title, photographerId} = elmt
      console.log('one photographer media', photographerMedia[i]);

      const picture = `Sample Photos/${getNickname(photographer.name)}/${elmt.image ? elmt.image : elmt.video}`;

      const mediaCard = document.createElement( 'div' );
      let media;
      // Différenciation du DOM si c'est une image ou une vidéo
      console.log('before',elmt )
      if(elmt.image) {              
        console.log('1')
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        media = img
      } else if(elmt.video){
        console.log('2')
        const video = document.createElement( 'video' );
        const source = document.createElement( 'source' );
        source.setAttribute("src", picture)
        source.setAttribute("type", "video/mp4")
        console.log('source value is', source)
        media = video

        video.appendChild(source);
        video.addEventListener ('click', function(){
          source.setAttribute("play", true)
      })
      }
      // Generate other DOM elements
      const divDetails = document.createElement ('div');
      divDetails.setAttribute("class", "divDetails");
      const h2 = document.createElement( 'h2' );
      h2.textContent = title;
      const h3 = document.createElement( 'h3' );
      h3.textContent = likes ;
      const button = document.createElement ('button');
      button.setAttribute("class", "fas fa-heart fav fav__select");
      
      // Need to create a button for the heart and make an iteration inside it
      mediaCardContainer.appendChild(mediaCard);
      mediaCard.appendChild(media);     
      mediaCard.appendChild(divDetails);
      divDetails.appendChild(h2);
      divDetails.appendChild(h3);
      divDetails.appendChild(button);

    }

    return (mediaCardContainer)
  }
  return { getUserCardDOM }

} ;

//document.getElementById("name").innerText = photographer.name


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
  const queryString = window.location.search;
  const searchParams = new URLSearchParams (queryString);
  const photographers = fetch('../../data/photographers.json')
        .then(res => res.json())
        .then(data => {
          const pageId = searchParams.get ('id');
          console.log(pageId);
          const photographerDetails = data.media.filter(media => media.photographerId == pageId); 
          console.log('r',photographerDetails);
          const photographer = data.photographers.find(photographer => photographer.id == pageId);
          console.log(photographer);
          displayPhotographerData(photographer)
          displayMediasData(photographerDetails, photographer)
        });
      }
  init();