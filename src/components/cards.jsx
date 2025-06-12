const cardURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function getRandomPokemon () {
    const randomNumber = Math.floor(Math.random() * 1118) + 1
    return `${cardURL+randomNumber}.png`
}

function createNumberOfCards (number) {
    let cardList = [];
    
};

export default getRandomPokemon;