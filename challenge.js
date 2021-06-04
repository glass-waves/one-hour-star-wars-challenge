const fetch = require('node-fetch');

const getCrewSize = async (id) => {
    //input: person id
    //output: total crew || 0

    //make fetch call to get single person data
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const character = await response.json();

    // check to see if character has any startships, if not, return 0
    if(character.starships.length === 0) return 0;

    // if the character does have startships, return them as an array
    const starships = character.starships;

    // interate through array and make a call to each startship url, saving promises in an array
    const responseArr = await Promise.all(starships.map(starship => fetch(starship)));
    const starShipList = await Promise.all(responseArr.map(starship => starship.json()))

    //use reduce to add up crew of each startship, ifd there is no crew available, return 1 for that starship
    const totalCrew = starShipList.reduce((acc, item) => {
        if(!item.crew) return acc + 1
        else return acc + Number(item.crew)
    }, 0)
    
    //return total crew needed
    console.log(totalCrew)
}


getCrewSize(10);