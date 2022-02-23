const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const section = document.querySelector('.initial-bg');
const container = document.querySelector('.container');
const inputEl = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
let searchQuerry = '';
const APP_ID = '72ed4ab0';
const APP_KEY = '8bb4397e8f14ae0859cc50c5d1a7b6af';

searchForm.focus();

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    searchQuerry = e.target.querySelector('input').value;
    if(searchQuerry.length > 0) {
        fetchAPI();
        setTimeout(() => {
            inputEl.value='';
        }, 1550);
    }
    else {
        document.getElementById('search-btn').disabled = false;
    }
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuerry}&app_id=${APP_ID}&app_key=${APP_KEY}&to=21`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data.hits);
    if(data.hits.length === 0)
    {
        section.innerHTML = `<h2 class="new-head">OOPS! Please Search for valid Recipie
                             <button onclick="location.reload()" class="refresh-btn">Refresh</button>`;
    }
    else
        generateHTML(data.hits);
}

function generateHTML(results) {
    section.classList.remove('initial-bg');
    container.classList.remove('initial');
    section.classList.add('new-bg');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" alt=""></a>
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View recipe</a>
            </div>
            <p class="item-data">Calories - ${Math.floor(result.recipe.calories)}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
