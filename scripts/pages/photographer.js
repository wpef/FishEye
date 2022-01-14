
function getPhotographerDom (){

  const currentPhotographer = JSON.parse (window.localStorage.getItem('currentPhotographer'))
  console.log(currentPhotographer)
  const { name, portrait, tagline, city, country, price } = currentPhotographer;

  const picture = `Sample Photos/Photographers ID Photos/${portrait}`;

  const article = document.createElement( 'article' );
  const img = document.createElement( 'img' );
  img.setAttribute("src", picture)
  const h2 = document.createElement( 'h2' );
  h2.textContent = name;
  const h3 = document.createElement('h3');
  h3.textContent = city+','+' '+country;
  const my1p = document.createElement ('p');
  my1p.textContent = tagline ;
  const my2p = document.createElement ('p');
  my2p.textContent = price+'€/jour' ;
  article.appendChild(img);
  article.appendChild(h2);
  article.appendChild (h3);
  article.appendChild (my1p);
  article.appendChild (my2p);
  
}

getPhotographerDom();

