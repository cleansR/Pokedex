const apiURL = "https://pokeapi.co/api/v2/pokemon/";
const pkdxURL = "https://pokeapi.co/api/v2/pokedex/";
const pkmnName = document.getElementById("pokemon_name");
const pkmnDimensions = document.getElementById("pokemon_dimensions");
const pkmnImage = document.getElementById("pokemon_img");
const pkmnDesc = document.getElementById("description");
const pkmnTypes = document.getElementById("types");
const pkmnList = document.getElementById("pkmn_list");
const genSelectButton = document.getElementById("gen_button");
const genMenu = document.getElementById("gen_menu");
const latestGen = 9;

const typeImages = {
    "bug": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/120px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
    "dark": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/120px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
    "dragon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/120px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
    "electric": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
    "fairy": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/120px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
    "fighting": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/120px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",
    "fire": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/120px-Pok%C3%A9mon_Fire_Type_Icon.svg.png",
    "flying": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/120px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",
    "ghost": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/120px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",
    "grass": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/120px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",
    "ground": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/120px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",
    "ice": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/120px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
    "normal": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/120px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
    "poison": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/120px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
    "psychic": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/120px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
    "rock": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/120px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
    "steel": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/120px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
    "water": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/120px-Pok%C3%A9mon_Water_Type_Icon.svg.png",
};

const gameID = new Map(
    [
        ["red", 2],
        ["blue", 2],
        ["yellow", 2],

        ["gold", 3],
        ["silver", 3],
        ["crystal", 3],

        ["ruby", 4],
        ["sapphire", 4],
        ["emerald", 4],

        ["diamond", 5],
        ["pearl", 5],
        ["platinum", 6],
        ["heartgold", 7],
        ["soulsilver", 7],

        ["black", 8],
        ["white", 8],
        ["black-2", 9],
        ["white-2", 9], 
    ]
);

const gameGen = new Map(
    [
        ["red", 1],
        ["blue", 1],
        ["yellow", 1],

        ["gold", 2],
        ["silver", 2],
        ["crystal", 2],

        ["ruby", 3],
        ["sapphire", 3],
        ["emerald", 3],

        ["diamond", 4],
        ["pearl", 4],
        ["platinum", 4],
        ["heartgold", 4],
        ["soulsilver", 4],

        ["black", 5],
        ["white", 5],
        ["black-2", 5],
        ["white-2", 5], 
    ]
);

const typeMap = new Map(
    [
        ["Normal", "white"],
        ["Fire", "orangered"],
        ["Water", "deepskyblue"],
        ["Grass", "limegreen"],
        ["Electric", "yellow"],
        ["Ice", "cyan"],
        ["Fighting", "brown"],
        ["Poison", "blueviolet"],
        ["Ground", "burlywood"],
        ["Flying", "paleturquoise"],
        ["Psychic", "hotpink"],
        ["Bug", "yellowgreen"],
        ["Rock", "peru"],
        ["Ghost", "rebeccapurple"],
        ["Dark", "darkslategray"],
        ["Dragon", "mediumslateblue"],
        ["Steel", "gainsboro"],
        ["Fairy", "pink"],
    ]
);

const pokemonMap = new Map();

/**
 * A class which contains the necessary information to display the Pokemon in the Pokedex
 */
class Pokemon{
    constructor(name, types, imagesrc, description, height, weight)
    {
        this.name = name;
        this.types = types;
        this.imgsrc = imagesrc;
        this.description = description;
        this.height = height;
        this.weight = weight;
    }
}

var currentGame = "red";
var currentGen = 1;
var loading = true;
var currentSelectedPokemonButton = null;

window.onload = initialize;

/**
 * Initializes the Pokedex when the window loads
 */
function initialize()
{
    loadPokedexEntries();
    loadGenMenu();
    genSelectButton.onclick = changeGen;
}

/**
 * Initializes the menu to change the game of the current Pokedex
 */
function loadGenMenu()
{
    let allGames = Array.from(gameID.keys());
    for(let i = 0; i < allGames.length; i++){
        let gameName = allGames[i].charAt(0).toUpperCase() + allGames[i].slice(1);
        let op = document.createElement("option");
        op.textContent = gameName;
        genMenu.appendChild(op);
    }
}

/**
 * Redraws the Pokedex to a different game's Pokedex
 */
function changeGen()
{
    if(!loading){

        loading = true;

        let game = genMenu.options[genMenu.selectedIndex].text;
        currentGame = game.charAt(0).toLowerCase() + game.slice(1);

        currentGen = gameGen.get(currentGame);

        while(pkmnList.hasChildNodes()){
            pkmnList.removeChild(pkmnList.firstElementChild);
        }

        while(pkmnTypes.hasChildNodes()){
            pkmnTypes.removeChild(pkmnTypes.firstElementChild);
        }

        pkmnImage.src = "https://wallpapercave.com/wp/wp6494463.jpg";

        pkmnDesc.innerText = "";

        pkmnName.innerText = "";

        pkmnDimensions.innerText = "";

        currentSelectedPokemonButton = null;

        loadPokedexEntries();
    }
    else{
        alert("Wait until Pokedex finishes loading.");
    }
}

/**
 * Uses the PokeAPI API in order to obtain the necessary JSON files to parse
 * Will not call the API for Pokemon which have already been found prior
 */
async function loadPokedexEntries()
{
    let src = pkdxURL + (gameID.get(currentGame)) + "/";
    let response = await fetch(src);
    let jsonObject = await response.json();

    let urlList = jsonObject["pokemon_entries"].map(entry => entry["pokemon_species"]["url"]);
    let nameList = jsonObject["pokemon_entries"].map(entry => entry["pokemon_species"]["name"]);

    let pokemonList = [];

    for(let i in urlList){
        if(!pokemonMap.has(nameList[i])){
            let res1 = await fetch(urlList[i]);
            let js1 = await res1.json();
    
            let id = js1["id"];
            let res3 = await fetch(apiURL + id.toString());
            let js3 = await res3.json();
    
            let res2 = await fetch(js3["species"]["url"]);
            let js2 = await res2.json();
    
            pokemonList.push([js3, js2]);
        }
    }
    
    pokemonList = Promise.all(pokemonList);

    pokemonList.then(res => {
        parseInformation(res);
        drawPokedexEntries(nameList);
        loading = !loading;
    }
    );
}

/**
 * Extracts information from JSON objects and converts to a Pokemon object, which contains the necessary information
 * @param {List} pkmnList a list of pairs of JSON objects containing information to extract
 */
function parseInformation(pkmnList)
{
    for(let i in pkmnList){
        let name = pkmnList[i][0]["species"]["name"];

        let typelist = []
        let types = pkmnList[i][0]["types"].map(type => (type["type"]["name"]).charAt(0).toUpperCase() + type["type"]["name"].slice(1));
        let temp = [latestGen].concat(types);
        typelist.push(temp);

        for(let j in pkmnList[i][0]["past_types"]){
            let genURL = pkmnList[i][0]["past_types"][j]["generation"]["url"];
            let tempArray = genURL.split('/');
            let generation = parseInt(tempArray[tempArray.length - 2]);
            let typeArray = pkmnList[i][0]["past_types"][j]["types"].map(
                type => (type["type"]["name"]).charAt(0).toUpperCase() + type["type"]["name"].slice(1)
                );
            typeArray = [generation].concat(typeArray);
            typelist.push(typeArray); 
        }

        let description = getFlavorText(pkmnList[i][1]);
        let imageSrc = pkmnList[i][0]["sprites"]["front_default"];
        let height = pkmnList[i][0]["height"]/10;
        let weight = pkmnList[i][0]["weight"]/10;
        let pkmnObj = new Pokemon(name, typelist, imageSrc, description, height, weight);
        pokemonMap.set(name, pkmnObj);
    }
}

/**
 * Returns a Map containing the flavor text of a Pokemon from various games
 * @param {JSON Object} speciesJSON 
 * @returns a Map object containing the names of games as keys and the corresponding flavor text as values 
 */
function getFlavorText(speciesJSON)
{
    let descMap = new Map();
    for(let idx in speciesJSON["flavor_text_entries"]){
        let lang = speciesJSON["flavor_text_entries"][idx]["language"]["name"];
        let game = speciesJSON["flavor_text_entries"][idx]["version"]["name"];
        if(lang == "en"){
            descMap.set(game, speciesJSON["flavor_text_entries"][idx]["flavor_text"]);
        }
    }
    return descMap;
}

/**
 * Writes the names of all Pokemon in the current generation's Pokedex
 * @param {List} nameList the list of Pokemon names to write
 */
function drawPokedexEntries(nameList)
{
    let currentPokemon = nameList[0];
    for(let i in nameList){
        let newDiv = document.createElement("div");
        let number = parseInt(i) + parseInt( (gameID.get(currentGame)==8 || gameID.get(currentGame)== 9) ? 0: 1);
        let text = "\t" + number.toString() + ". " + nameList[i].toUpperCase();
        newDiv.innerText = text;
        newDiv.id = nameList[i];
        newDiv.classList.add("pokemonEntries");
        newDiv.addEventListener("click", updatePkmn);
        pkmnList.appendChild(newDiv);
    }

    drawPokemonInfo(currentPokemon);
}

/**
 * Updates the Pokedex with the selected Pokemon's information
 * Is called whenever a Pokemon is clicked from the list
 */
function updatePkmn()
{
    let pokemonName = this.id;
    drawPokemonInfo(pokemonName);
}

/**
 * Edits the image, types, and description to match the selected Pokemon
 * @param {String} name the name of the specific Pokemon to draw
 */
function drawPokemonInfo(name)
{
    if(pokemonMap.has(name)){
        let currentPokemon = pokemonMap.get(name);
        pkmnImage.src = currentPokemon.imgsrc;
        pkmnDesc.innerText = currentPokemon.description.get(currentGame);
        
        pkmnName.innerText = currentPokemon.name.toUpperCase();

        pkmnDimensions.innerText = "Height: " + currentPokemon.height + "m | Weight: "  + currentPokemon.weight + "kg";

        while(pkmnTypes.hasChildNodes()){
            pkmnTypes.removeChild(pkmnTypes.firstElementChild);
        }
        
        let currentTypes = [];
        let chosenGen = latestGen;

        for(let i = 0; i < currentPokemon.types.length; i++){
            let thisGenTypes = currentPokemon.types[i];
            let thisGen = thisGenTypes[0];
            thisGenTypes = thisGenTypes.slice(1);
            if(currentGen <= thisGen && thisGen <= chosenGen){
                currentTypes = thisGenTypes;
                chosenGen = thisGen;
            }
        }

        for(let i = 0; i < currentTypes.length; i++){
            let typeDiv = document.createElement("div");
            typeDiv.classList.add("typeItem");
            typeDiv.style.backgroundColor = typeMap.get(currentTypes[i]);
            typeDiv.innerText = currentTypes[i].toUpperCase();
            pkmnTypes.appendChild(typeDiv);
        }

        if(currentSelectedPokemonButton != null){
            currentSelectedPokemonButton.style.backgroundColor = "white";
        }

        document.getElementById(name).style.backgroundColor = "aquamarine";
        currentSelectedPokemonButton = document.getElementById(name);
    }
    else{
        alert("Something went wrong!");
    }
}