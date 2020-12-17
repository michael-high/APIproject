const baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=1118';
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');
nav.style.display = 'none';
let pageNumber = 0;
// console.log('PageNumber:', pageNumber);
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

let sum=0;
function fetchResults(e) {
    // console.log(e);
    e.preventDefault();
    fetch(baseURL)
        .then(function (result) {
            //console.log(result)
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            for(let index=0; index<json.results.length; index++){
                // while (section.firstChild) {
                //     section.removeChild(section.firstChild);
                // }
                if(searchTerm.value.charAt[0]===json.results[index].name.charAt[0]){
                    displayResults(json.results[index]);
                    console.log(json.results[index].name);
                    sum++;
                }
            }
            if (sum!=0){
                console.log(`Results: ${sum}`);
            }else console.log(`no results`);
        })
}
function displayResults(json) {
    //console.log('Display Results', json);
    // console.log(json.response.docs);

    let pokeball=document.createElement('article');
    let pokeName=document.createElement('h2');
    let pokeLink=document.createElement('a');
    let clearfix = document.createElement('div');

    pokeLink.innerText=json.name;
    pokeLink.href=json.url;

    clearfix.setAttribute('class', 'clearfix');
    pokeName.appendChild(pokeLink);
    pokeball.appendChild(pokeName);
    pokeball.appendChild(clearfix);
    section.appendChild(pokeball);
            // let article = document.createElement('article');
            // let heading = document.createElement('h2');
            // let link = document.createElement('a');
            // let img = document.createElement('img');
            // let para = document.createElement('p');
            // let clearfix = document.createElement('div');
            // let current = articles[i];
            // console.log('Current:', current);
            // link.href = current.web_url;
            // link.textContent = current.headline.main;
            // para.textContent = 'Keywords: ';
            // for (let j = 0; j < current.keywords.length; j++) {
            //     let span = document.createElement('span');
            //     span.textContent += current.keywords[j].value + ' ';
            //     para.appendChild(span);
            // }
            // if (current.multimedia.length > 0) {
            //     img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
            //     img.alt = current.headline.main;
            // }
            // clearfix.setAttribute('class', 'clearfix');
            // heading.appendChild(link);
            // article.appendChild(heading);
            // article.appendChild(img);
            // article.appendChild(para);
            // article.appendChild(clearfix);
            // section.appendChild(article);
    //     }
    // }
    // if (articles.length === 10) {
    //     nav.style.display = 'block';
    // } else {
    //     nav.style.display = 'none';
    // }
}
if(sum >= 10){
    nav.style.display='block';
}else nav.style.display='none';

function nextPage(e) {
    // console.log('Next button clicked');
    pageNumber++;
    fetchResults(e);
    console.log('Page Number:', pageNumber);
}
function previousPage(e) {
    // console.log('Previous button clicked');
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log('Page:', pageNumber);
} 