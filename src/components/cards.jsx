const cardURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function createNumberOfCards(number) {
    if (number > 1025) {
        console.warn("Requested number of unique cards exceeds total available Pokémon. Returning all 1025 unique artworks.");
        number = 1025;
    }

    let uniquePokemonIds = new Set();
    let cardsWithData = [];

    while (uniquePokemonIds.size < number) {
        const randomNumber = Math.floor(Math.random() * 1025) + 1;

        if (!uniquePokemonIds.has(randomNumber)) {
            uniquePokemonIds.add(randomNumber);

            cardsWithData.push({
                id: randomNumber,
                url: `${cardURL}${randomNumber}.png`
            });
        }
    }

    return cardsWithData;
}

export default createNumberOfCards;