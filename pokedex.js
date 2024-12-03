const listaPokemon = document.querySelector("#lista-pokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

async function cargarPokemon() {
    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();
        mostrarPokemon(data); // Mostrar Pokémon de manera secuencial
    }
}

    // Diccionario para traducir los tipos al español
    const traduccionesTipos = {
        normal: "normal",
        fire: "fuego",
        water: "agua",
        grass: "planta",
        electric: "electrico",
        ice: "hielo",
        fighting: "lucha",
        poison: "veneno",
        ground: "tierra",
        flying: "volador",
        psychic: "psiquico",
        bug: "bicho",
        rock: "roca",
        ghost: "fantasma",
        dragon: "dragon",
        dark: "siniestro",
        steel: "acero",
        fairy: "hada"
    };

    const traduccionesTiposInverso = Object.fromEntries(
        Object.entries(traduccionesTipos).map(([key, value]) => [value, key])
    );

function mostrarPokemon(poke) {

    // Mapear los tipos y traducirlos al español
    let tipos = poke.types.map((type) => {
        const tipoEnEspanol = traduccionesTipos[type.type.name] || type.type.name;
        return `<p class="${tipoEnEspanol} tipo">${tipoEnEspanol}</p>`;
    });
    tipos = tipos.join("");

    
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if ( pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                    <div class="pokemon">
                    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-imagen">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${poke.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                        ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}ft</p>
                            <p class="stat">${poke.weight}lbs</p>
                        </div>
                    </div>
                </div>`;

    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;
    const tipoEnIngles = traduccionesTiposInverso[botonId];

    listaPokemon.innerHTML = ""

    for (let i = 1; i <= 151; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();

        if (botonId === "ver-todos") {
            mostrarPokemon(data); // Muestra todos los Pokémon
        } else {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.includes(tipoEnIngles)) {
                mostrarPokemon(data); // Muestra los Pokémon que coinciden con el tipo seleccionado
            }
        }
    }
}));

cargarPokemon()
