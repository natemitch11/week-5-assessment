console.log('helloworld')

let container = document.getElementById("container")
let searchBox = document.querySelector('#pokemon-search')
let newSearchValue = document.querySelector('#pokemon-search-box')

searchBox.addEventListener('submit', (e) =>{
    e.preventDefault();
    let term = newSearchValue.value
    console.log(term)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${term}`)
    .then(res => {
        clearContainer()
        console.log(res.data)
        pokemonInfo(res.data)
        newSearchValue.value = ""
    })
    .catch(err => console.error(err));
})

function clearContainer() {
    container.innerHTML =''
}

function pokemonInfo(res) {
    let pokeInfo = document.createElement('div')
    let {name, id, sprites, stats} = res
    let pokeStats = document.createElement('div')
    for (let i = 0; i < res.stats.length; i++) {
        let pStat = document.createElement('p')
        pStat.textContent = `${stats[i].stat.name}: ${stats[i].base_stat}`
        pokeStats.appendChild(pStat)
    }
    pokeInfo.innerHTML = 
    `<div>
        <p id="pokemon-name">#${id}: ${name}</p>
        <img id="front-sprite" src="${sprites.front_default}" alt="Default sprite front"/>
        <img id="back-sprite" src="${sprites.back_default}" alt="Default sprite back"/>    
    </div>`

    container.appendChild(pokeInfo)
    container.appendChild(pokeStats)
}

