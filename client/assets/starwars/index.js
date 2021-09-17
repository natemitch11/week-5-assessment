console.log('helloworld')

let body = document.getElementById("body")
let container = document.getElementById("planet-info")
let searchBox = document.querySelector('#search-form')
let newSearchValue = document.querySelector('#search-box')
let resourceValue = document.getElementById("swapi-endpoint")
let resourceSelector = document.getElementById('resource-selector')
let resource;

resourceSelector.addEventListener('click', (e) => {
    e.preventDefault
    resource = e.target.value
    console.log(resource)
})

searchBox.addEventListener('submit', (e) =>{
    e.preventDefault();
    clearContainer();
    let term = newSearchValue.value
    let baseURL = `https://swapi.dev/api/${resource}/?search=`
    axios.get(baseURL + term)
            .then(res => {
                newSearchValue.value = ""
                let resultArr = res.data.results
                
                if (resource === 'planets') {
                    resultArr[0].residents.map(URL => {
                    axios.get(URL)
                        .then(res =>{
                        let {name} = res.data
                        let newPerson = document.createElement('h3')
                        newPerson.textContent = name
                        container.appendChild(newPerson)
                        })
                    .catch(err => console.error(err))
                    })   
                }
                else if (resource === 'starships') {
                    let {name, model, manufacturer, starship_class} = resultArr[0]
                    let shipInfo = document.createElement('h3')
                    shipInfo.classList.add("planet-info")
                    shipInfo.innerHTML = `Name: ${name} <br> Model: ${model} <br> Manufacturer: ${manufacturer} <br> Class: ${starship_class} <br> Pilots:`
                    container.appendChild(shipInfo)
                    resultArr[0].pilots.map(URL => {
                        axios.get(URL)
                            .then(res =>{
                            let {name} = res.data
                            let newPerson = document.createElement('h3')
                            newPerson.textContent = name
                            container.appendChild(newPerson)
                            })
                            .catch(err => console.error(err))
                    })
                }
                else if (resource === 'vehicles') {
                    let {name, model, manufacturer, vehicle_class} = resultArr[0]
                    let shipInfo = document.createElement('h3')
                    shipInfo.classList.add("planet-info")
                    shipInfo.innerHTML = `Name: ${name} <br> Model: ${model} <br> Manufacturer: ${manufacturer} <br> Class: ${vehicle_class} <br> Pilots:`
                    container.appendChild(shipInfo)
                    resultArr[0].pilots.map(URL => {
                        axios.get(URL)
                            .then(res =>{
                            let {name} = res.data
                            let newPerson = document.createElement('h3')
                            newPerson.textContent = name
                            container.appendChild(newPerson)
                            })
                            .catch(err => console.error(err))
                    })
                }
                else if (resource === 'species') {
                    // axios.get(resultArr[0].homeworld)
                    //     .then(res =>{
                    //         let {name} = res.data
                    //     })
                    let {name,average_height, classification, designation, skin_colors, hair_colors, eye_colors, average_lifespan, language} = resultArr[0]
                    let speciesInfo = document.createElement('h3')
                    speciesInfo.classList.add("planet-info")
                    speciesInfo.innerHTML = `Name: ${name} <br> Classification: ${classification} <br> Designation: ${designation} <br> Average Height(cm): ${average_height} <br> Skin Colors: ${skin_colors} <br> Hair Colors: ${hair_colors} <br> Eye Colors: ${eye_colors} <br> Average Lifespan: ${average_lifespan} <br> Language: ${language}`

                    container.appendChild(speciesInfo)
                    
                    axios.get(resultArr[0].homeworld)
                        .then(res =>{
                        let {name} = res.data
                        let newPerson = document.createElement('h3')
                        newPerson.innerHTML = `Home World: ${name}`
                        container.appendChild(newPerson)
                        })
                        .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))
    
})

function clearContainer() {
    container.innerHTML = ''
}

