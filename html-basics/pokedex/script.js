let pokemonsCount = 1017;
let pokemons = [];
let pokemonNum = 12;
let pokemon = {};
let background;
let species;
let specie;
let habitat;
let labels = [];
let dataChart = [];
let pokemonEvolution;
let evolutionUrls = [];


function init() {
    loadAllPokemons();
}


async function loadAllPokemons() {
    let pokemonsContainer = document.getElementById('pokemon-card-container');
    pokemonsContainer.innerHTML = generateSpinner();
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokemonNum}`;
    let resAsJson = await inJson(url);
    await takeUrl(resAsJson.results);
    showAllPokemons();
}


function loadMorePokemons() {
    pokemonNum += 12;
    pokemons = []
    loadAllPokemons();
}


async function takeUrl(results) {
    await Promise.all(results.map(el => loadCustomPokemon(el.url)))
}


async function loadCustomPokemon(link) {
    let resAsJson = await inJson(link);
    pokemons.push(resAsJson);
}


async function loadPokemonSpecies(id) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    let resAsJson = await inJson(url);
    return resAsJson;
}


async function loadEvolution(url) {
    try {
        pokemonEvolution = await inJson(url);
    } catch (error) {
        console.error(`Error fetching or parsing JSON: ${error.message}`);
    }
}


async function inJson(link) {
    try {
        let res = await fetch(link);
        if (!res.ok)
            return;
        let resAsJson = await res.json();
        return resAsJson;
    } catch (error) {
        console.log(error);
        return;
    }
}


async function searchPokemon(event) {
    event.preventDefault(event);
    let pokemonToShow;
    let searchTerm = document.getElementById('searchInputId').value;
    if (searchTerm) {
        let pokemonsContainer = prepareEl();
        pokemonToShow = await preparePokemonToShow(searchTerm, pokemonToShow);
        document.getElementById('searchInputId').value = '';
        if (pokemonToShow) {
            let { img, name, background, types } = setAllData(pokemonToShow);
            pokemonsContainer.innerHTML += generateSearchCard(pokemonToShow['id'], img, name, background);
            displayTypes(`home-card-types-${name}`, types);
        }
    }
}


function prepareEl() {
    let pokemonsContainer = document.getElementById('pokemon-card-container');
    pokemonsContainer.innerHTML = '';
    pokemonsContainer.classList.remove('row', 'row-cols-1', 'row-cols-md-2', 'g-4');
    pokemonsContainer.classList.add('center-search-element');
    return pokemonsContainer;
}


async function preparePokemonToShow(searchTerm, pokemonToShow) {
    if (!isNaN(searchTerm)) {
        let exist = pokemons.some(p => p.id === Number(searchTerm));
        await existOrNot(exist, searchTerm);
        pokemonToShow = pokemons.find(p => p.id === Number(searchTerm));
    } else {
        pokemonToShow = pokemons.find(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (!pokemonToShow)
            await existOrNot(pokemonToShow, searchTerm);   //!!!!!!!!!!!!!!!!!!!!!!
        pokemonToShow = pokemons.find(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return pokemonToShow;
}


async function existOrNot(exist, searchTerm) {
    if (!exist) {
        await loadCustomPokemon(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
    }
}


function showAllPokemons() {
    let pokemonsContainer = document.getElementById('pokemon-card-container');
    pokemonsContainer.innerHTML = '';
    if (pokemons) {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            let { img, name, background, types } = setAllData(pokemon);
            pokemonsContainer.innerHTML += generateHomeCardHtml(pokemon['id'], img, name, background);
            displayTypes(`home-card-types-${name}`, types);
        }
        pokemonsContainer.innerHTML += generateMoreButton();
    }
}


function setAllData(pokemon) {
    let name = pokemon['species']['name'];
    let img = pokemon['sprites']['other']['official-artwork']['front_default'];
    let types = pokemon['types'];
    let background = generateBackground(types);
    return { img, name, background, types };
}


async function showPokemon(id) {
    let exist = pokemons.some(p => p.id === Number(id));
    await existOrNot(exist, id);
    pokemon = pokemons.find(p => p.id === Number(id));
    let pokemonEl = document.getElementById('current-pokemon');
    background = generateBackground(pokemon['types']);
    species = await loadPokemonSpecies(pokemon.id);
    if (species) {
        specie = species['genera'][7]['genus'];
        habitat = species['habitat']['name'];
        let urlEvolution = species["evolution_chain"]["url"];
        loadEvolution(urlEvolution);
    }
    pokemonEl.innerHTML = generateCardPokemonlHtml(pokemon, background);
    displayTypes(`pokemon-types-${pokemon.name}`, pokemon['types']);
    showTableBody('')
}


function closePopUp() {
    let pokemonEl = document.getElementById('current-pokemon');
    pokemonEl.innerHTML = '';
}


function showTableBody(str) {
    switch (str) {
        case 'info':
            showTableBodyInfo();
            break;
        case 'stats':
            showStats();
            break;
        case 'evolution':
            showEvolutions();
            break;
        default:
            showTableBodyInfo();
            break;
    }
}


function showTableBodyInfo() {
    let el = clearDivContainer('table-body-container');
    el.innerHTML = generateTableBodyInfo(specie, pokemon['height'] / 10, pokemon['weight'], habitat,
        pokemon['base_experience']);
}


function showStats() {
    labels = [];
    dataChart = [];
    loadStats();
    let el = clearDivContainer('table-body-container');
    let divEl = document.createElement('div');
    divEl.innerHTML += /*html*/`
        <canvas id="myChart"></canvas>
    `;
    let canvas = divEl.children[0];
    createNewChart(canvas);
    el.appendChild(divEl);
}


function createNewChart(canvas) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: dataChart,
                backgroundColor: [
                    'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255,155,56)', 'rgb(72,207,177)',
                    'rgb(153,102,255)',
                    'rgb(255, 205, 86)',
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            indexAxis: "y",
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function loadStats() {
    for (let i = 0; i < pokemon['stats'].length; i++) {
        labels.push(pokemon['stats'][i]["stat"]["name"]);
        dataChart.push(pokemon['stats'][i]["base_stat"]);
    }
}


async function showEvolutions() {
    evolutionUrls = [];
    let el = clearDivContainer('table-body-container');
    let divEl = document.createElement('div');
    divEl.classList.add('pokemon-evolution-container')
    if (pokemonEvolution["chain"]["evolves_to"]["0"]) {
        evolutionUrls.push(pokemonEvolution["chain"]["species"]["url"], pokemonEvolution["chain"]["evolves_to"]["0"]["species"]["url"]);
        if (pokemonEvolution["chain"]["evolves_to"]["0"]["evolves_to"]["0"]) {
            evolutionUrls.push(pokemonEvolution["chain"]["evolves_to"]["0"]["evolves_to"]["0"]["species"]["url"])
        }
        for (let i = 0; i < evolutionUrls.length; i++) {
            let last = false;
            if (i === evolutionUrls.length - 1) {
                last = true;
            }
            divEl.innerHTML += await showEv(evolutionUrls[i], last);
        }
    }
    el.appendChild(divEl);
}


async function showEv(url, last) {
    let pokemonEv = await inJson(url);
    let existId = pokemons.some(p => p.id === Number(pokemonEv['id']));
    if (!existId) {
        await loadCustomPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonEv['id']}`);
    }
    let currEvPokemon = pokemons.find(p => p.id === Number(pokemonEv['id']));
    let evImg = currEvPokemon['sprites']['other']['official-artwork']['front_default'];
    let objName = pokemonEv['names'].filter(n => n.language.name === 'en');
    let evName = objName[0]['name'];
    return generateEvolutionHtml(pokemonEv['id'], evName, evImg, last);
}


function clearDivContainer(id) {
    let el = document.getElementById(id);
    el.innerHTML = '';
    return el;
}


function generateBackground(types) {
    switch (types[0]['type']['name']) {
        case "grass":
            return "grass"
        case "fire":
            return "fire"
        case "water":
            return "water"
        case "electric":
            return "electric"
        case "ground":
            return "ground"
        case "bug":
            return "bug"
        case "normal":
            return "normal"
        case "poison":
            return "poison"
        case "fairy":
            return "fairy"
        case "fighting":
            return "fighting"
        case "psychic":
            return "psychic"
        case "rock":
            return "rock"
        default:
            return "normal";
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function displayTypes(elemment, types) {
    let typeDiv = document.getElementById(elemment);
    typeDiv.innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        const element = types[i];
        let type = element['type']['name'];
        typeDiv.innerHTML += generateTypesHtml(type);
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}


function nextPokemon(id) {
    let pokemonId = id + 1;
    if (pokemonId <= pokemonsCount) {
        showPokemon(pokemonId)
    }
}


function prevPokemon(id) {
    let pokemonId = id - 1;
    if (pokemonId >= 1) {
        showPokemon(pokemonId)
    }
}