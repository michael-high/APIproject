const baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=1118';
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
//const nav = document.querySelector('nav');
const section = document.querySelector('section');
// nav.style.display = 'none';
//let pageNumber = 0;
// console.log('PageNumber:', pageNumber);
searchForm.addEventListener('submit', fetchResults);
//nextBtn.addEventListener('click', nextPage);
//previousBtn.addEventListener('click', previousPage);


let sum=0;
let resultsArray=[];
function fetchResults(e) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    
    // console.log(e);
    e.preventDefault();
    fetch(baseURL)
        .then(function (result) {
            console.log(result)
            return result.json();
        })
        .then(function (json) {
            // console.log('lookhere');
            // console.log(json);
            // console.log(json.results);

            console.log('------JSON above, search results below-------')
            for(let index=0; index<json.results.length; index++){
                // while (section.firstChild) {
                //     section.removeChild(section.firstChild);
                // }
                //console.log('searchTerm.value '+searchTerm.value.charAt(0));
                if(searchTerm.value.charAt(0)===json.results[index].name.charAt(0) && searchTerm.value.charAt(1)===json.results[index].name.charAt(1)){
                    //displayResults(json.results[index]);
                    //console.log('json.results.[index] '+json.results[index].name);
                    // if(resultsArray.length>1){
                    //     for(let result=0; result<resultsArray.length; result++){
                    //         if(resultsArray[result].name!==json.results[index].name){
                    //            resultsArray[sum]=json.results[index];  
                    //         }
                    //         else{
                    //            console.log('repeated pokemon');
                    //         }
                    //     }
                    // }
                    // else{
                    resultsArray[sum]=json.results[index];
                    //}
                    sum++;
                    
                }
            }
            // for(let i=0; i<resultsArray.length; i++){
            //     console.log(resultsArray[i]);
            // }
            
            displayResults(resultsArray);
            if (sum!=0){
                console.log(`Results: ${sum}`);
            }else console.log(`no results`);
        })
}
function displayResults(resArray) {
    //Had trouble removing previous searches, opted for removing the search page and using a button to refresh the page
    //Remove Search Bar
    searchForm.style.display='none';
    //Create button at top of search results
    let refreshButton=document.createElement('button');
    refreshButton.textContent='Search Again';
    refreshButton.style.textAlign='center';
    section.appendChild(refreshButton);
    refreshButton.addEventListener('click', refreshPage);
    refreshButton.setAttribute('id', 'refreshButton');
    
    //console.log('Display Results', json);
    // console.log(json.response.docs);

    let infoBox=document.createElement('article');
    infoBox.setAttribute('id', 'infoBox');
    let infoText=document.createElement('p');
    let emptyInfo=document.createElement('p');
    infoText.textContent=`Your search turned up ${sum} results`;
    infoText.style.color='white';
    emptyInfo.style.color='white';
    infoBox.appendChild(infoText);
    if (sum==0){
        emptyInfo.textContent='Try again with some normal letters, or use the name of the pokemon';
        infoBox.appendChild(emptyInfo);
    }
    section.appendChild(infoBox);
    
    for(let i=0; i<resArray.length; i++){
        console.log(resArray[i]);

        fetch(resArray[i].url)
            .then(function (result) {
                //console.log(result)
                return result.json();
            })
            .then(function (json) {
                console.log(json);
                displayPokemon(json);
            })
    }
}
function displayPokemon(pokeInfo){
            // while (section.firstChild) {
            //     section.removeChild(section.firstChild);
            // }
    let pokeball=document.createElement('article');
    let pokeName=document.createElement('h2');
    // let pokeLink=document.createElement('a');
    let img=document.createElement('img');
    let clearfix = document.createElement('div');
    let flavorText=document.createElement('p');
    let pokeHeight=document.createElement('p');
    let pokeWeight=document.createElement('p');
    let happiness=document.createElement('p');
    let captureRate=document.createElement('p');

    pokeName.innerText=pokeInfo.name;
    pokeName.setAttribute('id', 'pokeName');
    //pokeName.value.charAt[0].toUpperCase();
    //species info
    fetch(pokeInfo.species.url)
        .then(function (result) {
            //console.log(result)
            return result.json();
        })
        .then(function (jsonSpecies) {
            console.log(jsonSpecies);
            //DISPLAYS ENGLISH FLAVOR TEXT
            if (jsonSpecies.flavor_text_entries.length>0){
                let textcounter=0;
                while(textcounter<jsonSpecies.flavor_text_entries.length){
                    //console.log(jsonSpecies.flavor_text_entries[textcounter].language.name)
                    if(jsonSpecies.flavor_text_entries[textcounter].language.name==='en'){
                        flavorText.textContent=jsonSpecies.flavor_text_entries[textcounter].flavor_text;
                        textcounter=(jsonSpecies.flavor_text_entries.length+69);
                    }else{textcounter++}
                }
                if(flavorText.length==0){
                    flavorText.textContent='No English Flavor Text';
                }
            }
            //Happiness
            happiness.textContent=`Base Happiness: ${jsonSpecies.base_happiness}`;
            //Capture Rate
            captureRate.textContent=`Capture Rate: ${jsonSpecies.capture_rate}`;
            
        })
    //DISPLAYS IMAGE
    if (pokeInfo.sprites.front_default!=null){
        img.src=pokeInfo.sprites.front_default;
    }
    //Height and Weight
    pokeHeight.textContent=`Height: ${pokeInfo.height}`
    pokeWeight.textContent=`Weight: ${pokeInfo.weight}`

    clearfix.setAttribute('class', 'clearfix');
    //pokeName.appendChild(pokeLink);
    
    pokeball.appendChild(pokeName);
    pokeball.appendChild(img);
    pokeball.appendChild(flavorText);
    pokeball.appendChild(pokeHeight);
    pokeball.appendChild(pokeWeight);
    pokeball.appendChild(happiness);
    pokeball.appendChild(captureRate);
    pokeball.appendChild(clearfix);
    section.appendChild(pokeball);

}
function refreshPage(){
    location.reload();
}
// function nextPage(e) {
//     // console.log('Next button clicked');
//     pageNumber++;
//     fetchResults(e);
//     console.log('Page Number:', pageNumber);
// }
// function previousPage(e) {
//     // console.log('Previous button clicked');
//     if (pageNumber > 0) {
//         pageNumber--;
//     } else {
//         return;
//     }
//     fetchResults(e);
//     console.log('Page:', pageNumber);
// } 