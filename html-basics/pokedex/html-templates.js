function generateHomeCardHtml(id, img, name, background) {
    return /*html*/`
    <div onclick="showPokemon('${id}')">
        <div class="card ${background}">
            <div class="card-img-container">
                <img src="${img}" class="card-img-top" alt="${name}">
            </div>
            <div class="card-body">
                <h5 class="card-title text-center text-uppercase pb-3">${name}</h5>
                <div id="home-card-types-${name}" class="types"></div>
            </div>
        </div>
    </div>`
}


function generateSearchCard(id, img, name, background) {
    return /*html*/`
        <div class="search-card-container"  onclick="showPokemon('${id}')">
            <div class="center card ${background}">
                <div class="card-img-container">
                    <img src="${img}" class="card-img-top" alt="${name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center text-uppercase pb-3">${name}</h5>
                    <div id="home-card-types-${name}" class="types"></div>
                </div>
            </div>
        </div>
        <div class="search-back-btn-container">
            <a href="/" class="search-back-btn"><i class="fas fa-arrow-left"></i> Back</a>
        </div>
    `;
}


function generateTypesHtml(type) {
    return /*html*/`
    <div class="home-card-type">${type}</div>`;
}


function generateSpinner() {
    return /*html*/`
        <div class="w-100 d-flex justify-content-center align-items-center mt-5 pt-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`
}


function generateMoreButton() {
    return /*html*/ `
    <div class="more-button-container" id="more-button">
        <button class="btn more-btn btn-lg" onclick="loadMorePokemons()">Load more</button>
    </div>`
}


function generateCardPokemonlHtml(pokemon, background) {
    let img = pokemon['sprites']['other']['official-artwork']['front_default'];
    return /*html*/`
    <div class="popUp-main-container" id="pokemon-card" >
       <div class="popUp-container" onclick="stopPropagation(event)">
            <div class="arrow" onclick="prevPokemon(${pokemon['id']})">
                <i class="fas fa-arrow-circle-left"></i>
            </div>
            <div class="popUp ${background}">
                <div class="pokemon-popUp-header">
                    <div class="d-flex justify-content-between p-3">
                        <div class="d-flex gap-3">
                            <h3>
                            ${capitalizeFirstLetter(pokemon.name)}
                            </h3>
                            <div>
                                <h3>#${pokemon.id}</h3>
                            </div>
                        </div>
                        <button type="button" class="btn-close" onclick="closePopUp()"></button>
                    </div>
                    <div>
                        <div id="pokemon-types-${pokemon.name}" class="types"></div>
                        <div class="pokemon-popUp-img-container text-center">
                            <img class="pokemon-popUp-img" src="${img}" alt="">
                        </div>
                    </div>
                </div>
                <div class="pokemon-popUp-container">
                    <div class="pokemon-popUp">
                      <div class="popUp-head">
                          <h4 class="table-head-title" onclick="showTableBody('info', '${pokemon.name}')">About</h4>
                          <h4 class="table-head-title" onclick="showTableBody('stats')">Base Stats</h4>
                          <h4 class="table-head-title" onclick="showTableBody('evolution')">Evolution</h4>
                      </div>
                      <div id="table-body-container" class="popUp-body"></div>
                    </div>
                </div>
            </div>
            <div class="arrow" onclick="nextPokemon(${pokemon['id']})">
                <i class="fas fa-arrow-circle-right"></i>
            </div>
       </div>
    </div>`;
}


function generateTableBodyInfo(specie, height, weight, habitat, experience) {
    return /*html*/`
        <div class="body-info-item">
            <b class="w-25">Species</b>
            <span>${specie}</span>
        </div>
        <div class="body-info-item">
            <b class="w-25">Height</b>
            <span>${height} m</span>
        </div>
        <div class="body-info-item">
            <b class="w-25">Weight</b>
            <span>${weight} kg</span>
        </div>
        <div class="body-info-item">
            <b class="w-25">Habitat</b>
            <span>${capitalizeFirstLetter(habitat)}</span>
        </div>
        <div class="body-info-item"> 
            <b class="w-25">Experience</b>
            <span>${experience} xp</span>
        </div>
    `;
}


function generateEvolutionHtml(id, name, img, last) {
    return /*html*/`
            <div class="pokemon-evolution-content">
                <img onclick="showPokemon(${id})" class="pokemon-evolution-img" src="${img}" alt="${name}">
                <b>${name}</b>
            </div>
            ${!last ?
            `<div class="pokemon-evolution-arrow">
                <i class="fa-solid fa-arrow-right"></i>
            </div>` : ''}   
    `;
}